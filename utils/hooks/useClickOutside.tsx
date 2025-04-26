import { useEffect, RefObject } from "react";

export default function useClickOutside(target:RefObject<HTMLElement>, callback: () => void) {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const el = target.current;
      if (el && !el.contains(e.target as Node)) {
        callback();
      }
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [target, callback]);
}
