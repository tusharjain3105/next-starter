import { Loader2 } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="h-screen grid place-items-center">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default LoadingPage;
