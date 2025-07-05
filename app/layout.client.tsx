"use client";
import SplashScreen from "@/components/splash";
import { Toaster } from "@/components/ui/sonner";
import useSplash from "@/lib/hooks/useSplash";
import { setRouter } from "@/lib/router";
import services from "@/lib/services";
import useAuth from "@/lib/stores/auth.store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import {
  lazy,
  startTransition,
  Suspense,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { ToasterProps } from "sonner";

const queryClient = new QueryClient();

const ReactQueryDevtoolsProduction = lazy(() =>
  import("@tanstack/react-query-devtools/production").then((d) => ({
    default: d.ReactQueryDevtools,
  })),
);

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  const { stage, showSplash } = useSplash(1000, 1000);
  const { startLoading, setUser } = useAuth();
  const router = useRouter();
  const [showDevtools, setShowDevtools] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);

  useEffect(() => {
    services.track.trackEvent("pageview");
  }, [pathname]);

  useLayoutEffect(() => {
    setRouter(router);
    startLoading();
    startTransition(async () => {
      const user = await services.auth.getCurrentUser();
      setUser(user);
    });
  }, [startLoading, setUser, router]);

  if (showSplash) {
    return <SplashScreen stage={stage} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <ReactQueryDevtools />
        <Toaster
          position="top-right"
          closeButton
          theme={theme as ToasterProps["theme"]}
        />
        {children}
        {showDevtools && (
          <Suspense>
            <ReactQueryDevtoolsProduction />
          </Suspense>
        )}
      </NuqsAdapter>
    </QueryClientProvider>
  );
};

export default ClientLayout;
