import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  className?: string;
  format?: (value: number) => string;
}

export default function AnimatedCounter({ 
  target, 
  duration = 2000, 
  suffix = '', 
  className = '',
  format = (value) => value.toLocaleString()
}: AnimatedCounterProps) {
  const [current, setCurrent] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const increment = target / (duration / 16); // 60fps
    let value = 0;
    
    const timer = setInterval(() => {
      value += increment;
      if (value >= target) {
        setCurrent(target);
        clearInterval(timer);
      } else {
        setCurrent(Math.floor(value));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      {format(current)}{suffix}
    </motion.span>
  );
}
