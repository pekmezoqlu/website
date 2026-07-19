"use client";

import { useEffect, useRef, useState } from "react";

type Direction = "up" | "left" | "right";

interface Props {
  children: React.ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
}

export default function FadeIn({ children, delay = 0, direction = "up", className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const animClass = visible
    ? direction === "left"
      ? "anim-slide-left"
      : direction === "right"
      ? "anim-slide-right"
      : "anim-fade-up"
    : "opacity-0";

  return (
    <div
      ref={ref}
      className={`${animClass} ${className}`}
      style={visible && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
