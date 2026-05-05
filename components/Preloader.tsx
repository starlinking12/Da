'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const Preloader = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] bg-rich-black flex items-center justify-center"
  >
    <div className="text-center">
      <motion.div
        initial={{ y: 20, opacity: 0, letterSpacing: "1em" }}
        animate={{ y: 0, opacity: 1, letterSpacing: "0.5em" }}
        transition={{ duration: 1, ease: "circOut" }}
        className="text-5xl font-display font-black text-gold mb-6"
      >
        DAMIZ
      </motion.div>
      <div className="w-48 h-[1px] bg-white/10 mx-auto relative overflow-hidden">
        <motion.div
          animate={{ left: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gold/50 w-full"
        />
      </div>
    </div>
  </motion.div>
);
