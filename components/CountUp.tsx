'use client';

import React, { useState, useEffect, useRef } from 'react';

export const CountUp = ({ to, label }: { to: string, label: string }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const targetValue = parseInt(to.replace(/\D/g, ''));
  const suffix = to.replace(/[0-9]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const duration = 2500;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            if (progress >= 1) {
              setCount(targetValue);
              return;
            }

            const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(easedProgress * targetValue));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [targetValue]);

  return (
    <div ref={nodeRef} className="text-center group">
      <div className="text-4xl md:text-6xl font-display font-black text-gold mb-2 transition-transform duration-500 group-hover:scale-110">
        {count}{suffix}
      </div>
      <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-bold">{label}</div>
    </div>
  );
};
