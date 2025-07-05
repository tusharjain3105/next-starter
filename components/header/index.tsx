import NavItems from "./nav-items";

export default function Header() {
  return (
    <header className="bg-background sticky top-0 left-0 right-0 z-50 p-2 border-b shadow">
      <NavItems />
    </header>
  );
}
