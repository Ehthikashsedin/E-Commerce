import { useEffect, useRef} from "react";

const useInfiniteScroll = (callback) => {
  const observerRef =useRef();
  const lastElementRef =useRef();
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries)=> {
      if (entries[0].isIntersecting) {
        callback();
      }
    });
    const current =lastElementRef.current;

    if (current) {
      observerRef.current.observe(current);
    }
    return () =>{
      if (current) {
        observerRef.current.unobserve(current);
      }
    };
    }, [callback]);

  return lastElementRef;
};
export default useInfiniteScroll;