import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';

interface GaugeProps {
  value: number;
  label: string;
  size?: number;
}

export const Gauge: React.FC<GaugeProps> = ({ value, label, size = 192 }) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const [displayValue, setDisplayValue] = useState(0);

  // Animate the text number
  useEffect(() => {
    let start = displayValue;
    const end = value;
    const duration = 1500;
    const startTime = performance.now();

    const animateNum = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);

      const currentVal = Math.round(start + (end - start) * easeProgress);
      setDisplayValue(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animateNum);
      }
    };
    requestAnimationFrame(animateNum);
  }, [value]);

  return (
    <div className="relative flex items-center justify-center p-4">
      <svg width={size} height={size} className="-rotate-90 drop-shadow-[0_0_15px_rgba(25,230,94,0.3)]">
        <circle
          className="radial-progress-bg text-neutral-800"
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          r={radius}
          strokeWidth="12"
          stroke="currentColor"
        />
        <motion.circle
          className="radial-progress-value text-primary"
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          r={radius}
          strokeWidth="12"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
          stroke="currentColor"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <motion.span
          key={value}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="text-5xl font-black text-white"
        >
          {displayValue}
        </motion.span>
        <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">{label}</span>
      </div>
    </div>
  );
};
