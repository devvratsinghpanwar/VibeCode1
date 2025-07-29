import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate as fmAnimate } from 'framer-motion';
import type { CSSProperties } from 'react';

export interface ProgressRingProps {
  value: number; // 0-100
  label?: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
  loading?: boolean;
  style?: CSSProperties;
}

export function ProgressRing({ value, label, size = 80, strokeWidth = 8, color = 'var(--color-primary)', loading, style }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const percent = useMotionValue(0);
  const dashOffset = useTransform(percent, (v) => circumference * (1 - v / 100));

  useEffect(() => {
    if (inView && !loading) {
      percent.set(0);
      fmAnimate(0, value, {
        duration: 1,
        ease: [0.4, 0, 0.2, 1],
        onUpdate: (v) => percent.set(v),
      });
    }
  }, [value, inView, loading, percent]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center justify-center bg-white dark:bg-neutral-900 rounded-xl shadow p-4 min-w-[120px] min-h-[120px] group hover:shadow-lg transition-shadow duration-200"
      whileHover={{ scale: 1.04 }}
      style={style}
    >
      <svg width={size} height={size} className="block mb-2" style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: dashOffset, strokeLinecap: 'round' }}
        />
      </svg>
      <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        {loading ? (
          <span className="inline-block w-10 h-6 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
        ) : (
          <AnimatedNumber value={value} percent={percent} />
        )}
        <span className="text-base font-medium ml-1">%</span>
      </span>
      {label && <span className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{label}</span>}
    </motion.div>
  );
}

function AnimatedNumber({ value, percent }: { value: number; percent: any }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!nodeRef.current) return;
    const unsubscribe = percent.on('change', (v: number) => {
      nodeRef.current!.textContent = Math.round(v).toLocaleString();
    });
    return () => unsubscribe();
  }, [percent]);
  return <span ref={nodeRef}>{value}</span>;
} 