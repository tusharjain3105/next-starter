"use client";

import useAuth from "@/lib/stores/auth.store";
import LoadingPage from "../(main)/loading";
import router from "next/router";
import { useEffect } from "react";
import { getCookie } from "cookies-next";

const AuthPage = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isAuthenticated } = useAuth();
  const shouldRedirectToRedirectUrl = !isLoading && isAuthenticated;

  useEffect(() => {
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
