'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TRANSITIONS } from '@/lib/motion';

export default function Template({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : TRANSITIONS.base}
      className="flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
}
