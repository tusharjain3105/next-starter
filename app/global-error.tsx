"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import Link from "next/link";

const config = {
  title: "Something went wrong!",
  description:
    "We've encountered an unexpected error. Our team has been notified and we're working to fix it.",
};

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold tracking-tight text-destructive sm:text-7xl">
              Oops!
            </h1>
            <h2 className="text-2xl font-semibold text-foreground">
              {config.title}
            </h2>
            <p className="mx-auto max-w-md text-muted-foreground">
              {config.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                variant="outline"
                onClick={() => reset()}
                className="w-full sm:w-auto"
              >
                Try Again
              </Button>
              <Button asChild className="w-full sm:w-auto">
                <Link href="/">Go to Homepage</Link>
              </Button>
            </div>
            <div className="pt-8 text-sm text-muted-foreground">
              <p>Error: {error.message || "Unknown error occurred"}</p>
              {error.digest && (
                <p className="text-xs opacity-75 mt-1">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
