import { RefObject, useEffect, useRef, useState } from 'react'
import 'intersection-observer';

function useIntersectionObserver<T extends HTMLElement>(
  options?: IntersectionObserverInit,
): [RefObject<T>, boolean] {
  const ref = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const updateEntry = ([entry]: IntersectionObserverEntry[]) => {
    setIsIntersecting(!!entry?.isIntersecting);
  };

  useEffect(() => {
    const element = ref.current;

    if (!window.IntersectionObserver || !element) return;

    const observer = new IntersectionObserver(updateEntry, options);

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, options, options?.threshold, options?.root, options?.rootMargin]);

  return [ref, isIntersecting];
}

export default useIntersectionObserver;
