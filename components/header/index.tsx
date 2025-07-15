"use client";
import { Button } from "../ui/button";
import NavItems from "./nav-items";
import useAuth from "@/lib/stores/auth.store";

export default function Header() {
  const { logout } = useAuth();
  return (
    <header className="bg-background sticky top-0 left-0 right-0 z-50 p-2 border-b shadow flex justify-between items-center">
      <NavItems />
      <Button onClick={logout}>Logout</Button>
    </header>
  );
}
