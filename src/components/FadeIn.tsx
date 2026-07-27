'use client';

import { motion, useReducedMotion } from 'motion/react';

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Scroll-reveal wrapper: fades and rises content into view once.
 * Respects prefers-reduced-motion.
 */
export default function FadeIn({ children, className, delay = 0 }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
