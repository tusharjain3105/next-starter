import NavLink from "../nav-link";
import config from "@/lib/config";

export default function NavItems() {
  return (
    <div className="flex gap-2 items-center">
      {config.navigation.main.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          className="data-active:font-bold"
          exact={item.exact}
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
}
