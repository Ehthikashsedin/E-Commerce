import { useEffect, useRef } from "react";

const useInfiniteScroll = (callback, offset = 200, delay = 500) => {
  const callbackRef = useRef(callback);
  const lastCallTimeRef = useRef(0);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();

      if (now - lastCallTimeRef.current < delay) return;

      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= pageHeight - offset) {
        lastCallTimeRef.current = now;
        callbackRef.current();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [offset, delay]);

};

export default useInfiniteScroll;
