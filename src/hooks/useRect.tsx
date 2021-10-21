// source: https://gist.github.com/morajabi/523d7a642d8c0a2f71fcfa0d8b3d2846
import { RefObject, useLayoutEffect, useState, useRef } from "react";
import { useDebouncedCallback } from "../../node_modules/use-debounce/lib";

type RectResult = {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
};

function getRect<T extends HTMLElement>(element?: T): RectResult {
  let rect: RectResult = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0
  };
  if (element) rect = element.getBoundingClientRect();
  return rect;
}

export function useRect<T extends HTMLElement>(): [RefObject<T>, RectResult] {
  const ref = useRef<T>(null);
  const [rect, setRect] = useState<RectResult>(
    ref.current ? getRect(ref.current) : getRect()
  );

  const handleResize = () => {
    if (!ref.current) return;
    setRect(getRect(ref.current)); // Update client rect
  };

  const debouncedHandleResize = useDebouncedCallback(handleResize, 200);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    debouncedHandleResize();

    if (typeof ResizeObserver === "function") {
      let resizeObserver: ResizeObserver|null = new ResizeObserver(() => debouncedHandleResize());
      resizeObserver.observe(element);
      return () => {
        if (!resizeObserver) return;
        resizeObserver.disconnect();
        resizeObserver = null;
      };
    } else {
      window.addEventListener("resize", debouncedHandleResize); // Browser support, remove freely
      return () => window.removeEventListener("resize", debouncedHandleResize);
    }
  }, [ref]);

  return [ref, rect];
}
