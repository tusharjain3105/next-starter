import { cn } from "@/lib/utils";

const config = {
  title: "Next.js Starter Kit",
  description:
    "Preconfigured Next.js starter kit to build web applications quickly.",
};

const SplashScreen = ({ stage = 1 }: { stage?: number }) => {
  return (
    <div className={cn("text-center [&>*]:duration-1000")}>
      <div
        className={cn(
          "text-2xl mt-[48vh] -translate-y-1/2 fixed w-full font-bold top-0 left-0 px-10",
          stage === 2 && "mt-0 -translate-y-full opacity-0",
        )}
      >
        {config.title}
      </div>
      <p
        className={cn(
          "text-primary/60 mt-[53vh] -translate-y-1/2 fixed w-full top-0 left-0 px-10",
          stage >= 2 && "opacity-0",
        )}
      >
        {config.description}
      </p>
    </div>
  );
};

export default SplashScreen;
