import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', animate = true }) {
  const Comp = animate ? motion.div : 'div';
  const props = animate
    ? { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } }
    : {};

  return (
    <Comp {...props} className={`glass-card p-6 ${className}`}>
      {children}
    </Comp>
  );
}
