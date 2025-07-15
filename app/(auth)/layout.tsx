"use client";

import { router } from "@/lib/router";
import useAuth from "@/lib/stores/auth.store";
import { getCookie } from "cookies-next";
import { useLayoutEffect } from "react";
import LoadingPage from "../(main)/loading";

const AuthPage = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isAuthenticated } = useAuth();
  const shouldRedirectToRedirectUrl = !isLoading && isAuthenticated;

  useLayoutEffect(() => {
    if (shouldRedirectToRedirectUrl) {
      const redirectUrl = getCookie("redirect-url");
      router.replace((redirectUrl as string) ?? "/");
    }
  }, [shouldRedirectToRedirectUrl]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <main className="h-screen w-screen grid place-items-end-safe md:place-items-center bg-secondary">
      <div className="p-5 shadow-lg rounded-t-2xl md:rounded-2xl w-full md:w-sm bg-background">
        {children}
      </div>
    </main>
  );
};

export default AuthPage;
