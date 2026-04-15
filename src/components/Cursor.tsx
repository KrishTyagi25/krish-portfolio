"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        const size = isHover ? 56 : 36;
        ringRef.current.style.transform = `translate(${ringX - size / 2}px, ${ringY - size / 2}px)`;
      }
      animId = requestAnimationFrame(loop);
    };

    const onEnter = () => setIsHover(true);
    const onLeave = () => setIsHover(false);

    document.addEventListener("mousemove", onMove);
    const interactibles = document.querySelectorAll("a,button,[data-cursor]");
    interactibles.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    loop();

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("mousemove", onMove);
      interactibles.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [isHover]);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className={`cursor-ring ${isHover ? "hover" : ""}`} />
    </>
  );
}
