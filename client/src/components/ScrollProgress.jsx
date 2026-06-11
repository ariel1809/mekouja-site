import { useEffect, useRef } from "react";

// Fine barre dégradée en haut de page indiquant la progression du défilement.
export default function ScrollProgress() {
  const barre = useRef(null);

  useEffect(() => {
    let raf = 0;
    const maj = () => {
      raf = 0;
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const p = total > 0 ? (h.scrollTop / total) * 100 : 0;
      if (barre.current) barre.current.style.transform = `scaleX(${p / 100})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(maj);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    maj();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div className="scroll-progress" ref={barre} aria-hidden="true"></div>;
}