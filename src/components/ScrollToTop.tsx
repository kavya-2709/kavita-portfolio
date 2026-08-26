import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll on route change.
 *
 * A per-page `useEffect` wasn't enough — it fires before layout settles and
 * the browser then restores the previous offset, landing you mid-page.
 * useLayoutEffect runs before paint, and disabling the browser's own scroll
 * restoration stops it fighting us back.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // `behavior: instant` is required: the stylesheet sets
    // `html { scroll-behavior: smooth }`, which turns this into an animation.
    // The incoming route then changes the page height mid-flight and cancels
    // it, leaving you stranded at the old offset.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
