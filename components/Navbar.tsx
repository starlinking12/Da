'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

export const Navbar = ({ onScrollTo }: { onScrollTo: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['home', 'services', 'gallery', 'about', 'contact'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-rich-black/95 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" onClick={(e) => onScrollTo(e, 'home')} className="flex flex-col group relative z-[60]">
          <span className="text-2xl font-display font-black tracking-tighter text-gold group-hover:text-white transition-colors duration-500">DAMIZ</span>
          <span className="text-[10px] tracking-[0.3em] font-medium text-white/50 group-hover:text-gold transition-colors duration-500 uppercase">Auto Care</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a 
              key={item} 
              href={`#${item}`} 
              onClick={(e) => onScrollTo(e, item)}
              className="text-[10px] font-bold text-white/60 hover:text-gold transition-all duration-300 uppercase tracking-[0.2em] relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
          <a 
            href="tel:+13802237472" 
            className="px-6 py-2.5 bg-gold text-rich-black font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-lg flex items-center gap-2"
          >
            <Phone size={14} />
            GET FREE ESTIMATE
          </a>
        </div>

        {/* Mobile Header Action */}
        <div className="flex items-center gap-4 md:hidden z-[60]">
          <a 
            href="tel:+13802237472" 
            className="px-4 py-2 bg-gold text-rich-black font-black text-[9px] uppercase tracking-widest flex items-center gap-2"
          >
            <Phone size={12} />
            ESTIMATE
          </a>
          <button className="text-gold p-1" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-0 bg-rich-black z-50 flex flex-col items-center justify-center gap-8 md:hidden p-6"
          >
            {navLinks.map((item) => (
              <a 
                key={item} 
                href={`#${item}`} 
                onClick={(e) => { onScrollTo(e, item); setIsOpen(false); }}
                className="text-4xl font-display font-black text-white hover:text-gold transition-colors uppercase italic tracking-tighter"
              >
                {item}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={(e) => { onScrollTo(e, 'contact'); setIsOpen(false); }}
              className="mt-8 px-12 py-5 bg-gold text-rich-black font-black uppercase text-sm tracking-widest"
            >
              Book Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
