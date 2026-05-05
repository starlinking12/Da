'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const AnimatedInput = ({ label, type = "text", placeholder, options }: { label: string, type?: string, placeholder?: string, options?: string[] }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  const inputId = label.toLowerCase().replace(/\s/g, '-');

  return (
    <div className="space-y-2 relative">
      <label 
        htmlFor={inputId}
        className={`text-[10px] uppercase font-bold tracking-[0.2em] ml-1 transition-all duration-300 ${isFocused || value ? 'text-gold' : 'text-white/60'}`}
      >
        {label}
      </label>
      <div className="relative overflow-hidden rounded-xl">
        {type === "select" ? (
          <select 
            id={inputId}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-white/5 border border-white/10 p-4 focus:outline-none transition-all text-white font-medium appearance-none cursor-pointer"
          >
            {options?.map(opt => <option key={opt} className="bg-charcoal text-white">{opt}</option>)}
          </select>
        ) : type === "textarea" ? (
          <textarea 
            id={inputId}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setValue(e.target.value)}
            rows={4} 
            className="w-full bg-white/5 border border-white/10 p-4 focus:outline-none transition-all text-white font-medium resize-none" 
            placeholder={placeholder} 
          />
        ) : (
          <input 
            id={inputId}
            type={type}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-white/5 border border-white/10 p-4 focus:outline-none transition-all text-white font-medium" 
            placeholder={placeholder} 
          />
        )}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold origin-left z-10"
        />
      </div>
    </div>
  );
};
