import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export function AnimatedCounter({ 
  value, 
  duration = 2, 
  decimals = 0,
  suffix = '',
  prefix = ''
}: AnimatedCounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    return decimals > 0 
      ? latest.toFixed(decimals)
      : Math.round(latest).toString();
  });

  useEffect(() => {
    const controls = animate(count, value, { duration });
    return controls.stop;
  }, [value, duration]);

  return (
    <motion.span>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  );
}
