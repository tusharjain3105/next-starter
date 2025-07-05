"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

interface NavLinkProps extends ComponentProps<typeof Link> {
  exact?: boolean;
  href: string;
}

const NavLink = ({ exact, href, ...props }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      {...props}
      href={href}
      data-active={isActive ? true : undefined}
      data-exact={exact ? true : undefined}
    />
  );
};

export default NavLink;
