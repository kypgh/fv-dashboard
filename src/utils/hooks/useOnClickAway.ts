import { useEffect, RefObject } from "react";

// Hook
function useOnClickAway(
  ref: RefObject<HTMLElement>,
  handler: (event: Event) => void,
  extraRefs: RefObject<HTMLElement>[] = []
) {
  useEffect(() => {
    const listener = (event: Event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      if (
        extraRefs.some(
          (eRef) => !eRef.current || eRef.current.contains(event.target as Node)
        )
      ) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, extraRefs]);
}

export default useOnClickAway;
