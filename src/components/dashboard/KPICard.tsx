import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import type { CSSProperties } from 'react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/solid';

export interface KPICardProps {
  label: string;
  value: number;
  trend: 'up' | 'down' | 'neutral';
  trendValue?: number;
  data: { value: number }[];
  loading?: boolean;
  style?: CSSProperties;
}

export function KPICard({ label, value, trend, trendValue, data, loading, style }: KPICardProps) {
  const ref = useRef<HTMLDivElement>(null);
  useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6 flex flex-col gap-2 min-w-[200px] min-h-[140px] group hover:shadow-lg transition-shadow duration-200"
      whileHover={{ scale: 1.02 }}
      style={style}
    >
      <span className="text-sm text-neutral-500 dark:text-neutral-400 font-medium mb-1">{label}</span>
      <span className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
        {loading ? (
          <span className="inline-block w-16 h-8 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
        ) : (
          <AnimatedNumber value={value} />
        )}
        {trend !== 'neutral' && !loading && (
          <span className={trend === 'up' ? 'text-green-500' : 'text-red-500'}>
            {trend === 'up' ? <ArrowTrendingUpIcon className="w-5 h-5 inline" /> : <ArrowTrendingDownIcon className="w-5 h-5 inline" />}
            {trendValue !== undefined && (
              <span className="ml-1 text-xs font-semibold">{trendValue > 0 ? '+' : ''}{trendValue}%</span>
            )}
          </span>
        )}
      </span>
      <div className="h-8 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--color-primary)"
              strokeWidth={2}
              dot={false}
              isAnimationActive
              animationDuration={600}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

function AnimatedNumber({ value }: { value: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!nodeRef.current) return;
    let frame: number;
    let start = 0;
    const duration = 1000;
    const startTime = performance.now();
    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.round(start + (value - start) * progress);
      nodeRef.current!.textContent = current.toLocaleString();
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return <span ref={nodeRef}>{value}</span>;
} 