import { useEffect, useRef } from "react";

const useInfiniteScroll = (callback) => {
  const callbackRef = useRef(callback);
  const lastCallTimeRef = useRef(0);
  const THROTTLE_DELAY = 500; // milliseconds

  // Update callback ref
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      
      // Throttle - only check every 500ms
      if (now - lastCallTimeRef.current < THROTTLE_DELAY) {
        return;
      }

      // Check if user has scrolled to near bottom
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;
      
      // Trigger when 200px from bottom
      if (scrollPosition >= pageHeight - 200) {
        lastCallTimeRef.current = now;
        callbackRef.current();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Return a dummy ref since we're using scroll events instead
  return useRef();
};

export default useInfiniteScroll;