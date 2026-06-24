import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isPointer, setIsPointer] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      setHidden(true);
      document.documentElement.style.cursor = "auto";
      return;
    }

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x, ry = y;

    const onMove = (e) => {
      x = e.clientX; y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`;
      }
      const target = e.target;
      const pointer =
        target &&
        (target.closest("a, button, [role='button'], [data-cursor='pointer'], input, textarea, select, label"));
      setIsPointer(!!pointer);
    };

    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    let raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-9 w-9 rounded-full transition-[width,height,opacity] duration-200"
        style={{
          border: "1px solid rgba(0,255,136,0.55)",
          background:
            "radial-gradient(circle at center, rgba(0,255,136,0.15), rgba(0,255,136,0) 70%)",
          width: isPointer ? "56px" : "36px",
          height: isPointer ? "56px" : "36px",
          marginLeft: isPointer ? "-10px" : "0px",
          marginTop: isPointer ? "-10px" : "0px",
          boxShadow: "0 0 24px rgba(0,255,136,0.25)",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[101] h-2 w-2 rounded-full bg-[#00FF88]"
        style={{ boxShadow: "0 0 12px rgba(0,255,136,0.9)" }}
      />
    </>
  );
}
