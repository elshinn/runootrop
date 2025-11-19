import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeProps {
  text: string;
  direction?: 'left' | 'right';
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ text, direction = 'left', className = '' }) => {
  return (
    <div className={`flex overflow-hidden whitespace-nowrap border-y-4 border-neo-black bg-neo-black text-neo-white py-3 ${className}`}>
      <motion.div
        className="flex shrink-0"
        initial={{ x: direction === 'left' ? "0%" : "-100%" }}
        animate={{ x: direction === 'left' ? "-100%" : "0%" }}
        transition={{
          ease: "linear",
          duration: 40,
          repeat: Infinity,
        }}
      >
        <span className="mx-4 font-mono font-black text-2xl tracking-wider">{text}</span>
        <span className="mx-4 font-mono font-black text-2xl tracking-wider">{text}</span>
        <span className="mx-4 font-mono font-black text-2xl tracking-wider">{text}</span>
        <span className="mx-4 font-mono font-black text-2xl tracking-wider">{text}</span>
      </motion.div>
      <motion.div
        className="flex shrink-0"
        initial={{ x: direction === 'left' ? "0%" : "-100%" }}
        animate={{ x: direction === 'left' ? "-100%" : "0%" }}
        transition={{
          ease: "linear",
          duration: 40,
          repeat: Infinity,
        }}
      >
        <span className="mx-4 font-mono font-black text-2xl tracking-wider">{text}</span>
        <span className="mx-4 font-mono font-black text-2xl tracking-wider">{text}</span>
        <span className="mx-4 font-mono font-black text-2xl tracking-wider">{text}</span>
        <span className="mx-4 font-mono font-black text-2xl tracking-wider">{text}</span>
      </motion.div>
    </div>
  );
};

export default Marquee;