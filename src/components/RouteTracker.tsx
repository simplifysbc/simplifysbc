import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = "G-60XRV8QKG5";

const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== "function") return;
    const path = location.pathname + location.search;
    window.gtag("config", GA_ID, {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location]);

  return null;
};

export default RouteTracker;
