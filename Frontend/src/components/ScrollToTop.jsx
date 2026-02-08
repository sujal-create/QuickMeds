import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // slight delay ensures it works after render
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 0);
  }, [pathname]);

  console.log("Path changed to:", pathname);

  return null;
};

export default ScrollToTop;
