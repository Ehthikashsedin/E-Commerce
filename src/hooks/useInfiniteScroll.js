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
      
      if (now - lastCallTimeRef.current < THROTTLE_DELAY) {
        return;
      }

      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= pageHeight - 200) {
        lastCallTimeRef.current = now;
        callbackRef.current();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return useRef();
};

export default useInfiniteScroll;