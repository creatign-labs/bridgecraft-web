"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

interface StatsCounterProps {
  stats: Stat[];
}

function CountUpNumber({
  target,
  suffix,
  inView,
}: {
  target: number;
  suffix?: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let frame: number;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);

  return (
    <span>
      {count}
      {suffix ?? ""}
    </span>
  );
}

export default function StatsCounter({ stats }: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4"
    >
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="font-heading text-4xl font-bold text-primary-dark sm:text-5xl">
            <CountUpNumber
              target={stat.value}
              suffix={stat.suffix}
              inView={inView}
            />
          </p>
          <p className="mt-2 text-sm font-medium text-charcoal/70">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
