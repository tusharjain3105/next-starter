interface NavItem {
  label: string;
  href: string;
  exact?: boolean;
}

const navigationConfig = {
  main: [
    {
      label: "Home",
      href: "/",
      exact: true,
    },
    {
      label: "About",
      href: "/about",
    },
  ] satisfies NavItem[],
} as const;

export default navigationConfig;
