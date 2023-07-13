import { useEffect, useState } from "react";

const useQueryDevTool = (applicationEnvironment: "production" | "test" | "development" | "storybook") => {
  const [showReactQueryDevTool, setShowReactQueryDevTool] = useState(false);

  useEffect(() => {
    if (applicationEnvironment === "development") {
      setShowReactQueryDevTool(true);
    }
  }, [applicationEnvironment]);

  return showReactQueryDevTool;
};

export default useQueryDevTool;
