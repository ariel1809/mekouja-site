import { useEffect } from "react";

// Fait apparaître les éléments .reveal au défilement (respecte prefers-reduced-motion).
export default function useReveal(dependances = []) {
  useEffect(() => {
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = document.querySelectorAll(".reveal:not(.vu)");
    if (reduit || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("vu"));
      return;
    }
    const obs = new IntersectionObserver(
      (entrees) => {
        entrees.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("vu");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependances);
}
