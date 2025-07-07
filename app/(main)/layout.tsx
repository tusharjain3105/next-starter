"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import useAuth from "@/lib/stores/auth.store";
import LoadingPage from "./loading";
import { useEffect } from "react";
import { router } from "@/lib/router";
import { setCookie } from "cookies-next";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isAuthenticated } = useAuth();
  const shouldRedirectToLogin = !isLoading && !isAuthenticated;

  useEffect(() => {
    if (shouldRedirectToLogin) {
      setCookie("redirect-url", location.href);
      router.replace("/login");
    }
  }, [shouldRedirectToLogin]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
