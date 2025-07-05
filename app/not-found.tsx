import { Button } from "@/components/ui/button";
import Link from "next/link";

const config = {
  title: "Page not found",
  description: "Sorry, we couldn't find the page you're looking for.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="space-y-2">
        <h1 className="text-6xl font-bold tracking-tight text-foreground sm:text-7xl">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-muted-foreground">
          {config.title}
        </h2>
        <p className="mx-auto max-w-md text-muted-foreground">
          {config.description}
        </p>
      </div>
      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
}
