'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

export const TiltGalleryItem = ({ src, alt, title, subtitle, delay }: { src: string, alt: string, title: string, subtitle: string, delay: number }) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [0, 1], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [0, 1], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 1, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0.5); y.set(0.5); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative aspect-video group overflow-hidden rounded-3xl cursor-pointer bg-charcoal"
    >
      <motion.div className="absolute inset-0" style={{ transform: "translateZ(30px)" }}>
        <Image 
          src={src} 
          alt={alt} 
          fill 
          className="object-cover transition-transform duration-1000 group-hover:scale-110" 
          referrerPolicy="no-referrer"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-rich-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8">
        <div style={{ transform: "translateZ(60px)" }}>
          <h4 className="text-gold font-display font-bold text-xl mb-1">{title}</h4>
          <p className="text-white/60 text-xs font-bold uppercase tracking-widest">{subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
};
