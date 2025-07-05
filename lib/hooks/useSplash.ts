import { useLayoutEffect, useState } from "react";

export default function useSplash(...timestamps: number[]) {
  const [stage, setStages] = useState(1);

  useLayoutEffect(() => {
    const timer = setTimeout(
      () => {
        setStages((prev) => prev + 1);
      },
      timestamps[timestamps.length - 1],
    );
    return () => clearTimeout(timer);
  }, [timestamps]);

  return { stage, showSplash: stage <= timestamps.length };
}
