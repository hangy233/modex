import { RefObject, useEffect, useRef, useState } from 'react'
import 'intersection-observer';

function useIntersectionObserver<T extends HTMLElement>(
  options?: IntersectionObserverInit,
): [RefObject<T>, boolean, IntersectionObserverEntry | undefined] {
  const ref = useRef(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const updateEntry = ([entry]: IntersectionObserverEntry[]) => {
    setEntry(entry);
  };

  useEffect(() => {
    const element = ref.current;

    if (!window.IntersectionObserver || !element) return;

    const observer = new IntersectionObserver(updateEntry, options);

    observer.observe(element);

    return observer.disconnect;
  }, [ref, options?.threshold, options?.root, options?.rootMargin]);

  return [ref, !!entry?.isIntersecting, entry];
}

export default useIntersectionObserver;
