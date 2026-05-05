'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/13802237472"
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
    className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[90] w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_35px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.6)] transition-shadow"
    title="Chat on WhatsApp"
  >
    <MessageCircle size={28} fill="currentColor" className="md:w-8 md:h-8" />
  </motion.a>
);
