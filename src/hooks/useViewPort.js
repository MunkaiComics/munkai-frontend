import { useEffect, useState } from "react";

// This hook calculates the size of device used to visit the website
const useViewport = () => {
  const [viewport, setViewport] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [viewport]);

  const handleResize = () => {
    setViewport(window.innerWidth);
  };

  return viewport;
};

export default useViewport;
