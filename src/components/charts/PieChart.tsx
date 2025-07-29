import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useRef } from 'react';
import type { CSSProperties } from 'react';

export interface PieChartData {
  name: string;
  value: number;
  color?: string;
}

export interface PieChartProps {
  data: PieChartData[];
  innerRadius?: number | string;
  loading?: boolean;
  emptyMessage?: string;
  style?: CSSProperties;
}

const defaultColors = [
  'var(--color-primary)',
  'var(--color-accent-green)',
  'var(--color-accent-orange)',
  'var(--color-accent-pink)',
  '#6366f1',
  '#a21caf',
  '#f472b6',
];

export function PieChart({ data, innerRadius = '60%', loading, emptyMessage = 'No data available', style }: PieChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  const handleExport = () => {
    if (!chartRef.current) return;
    const svg = chartRef.current.querySelector('svg');
    if (!svg) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'piechart.svg';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 animate-pulse bg-neutral-100 dark:bg-neutral-800 rounded">
        <div className="w-32 h-6 bg-neutral-300 dark:bg-neutral-700 rounded mb-4" />
        <div className="w-48 h-4 bg-neutral-200 dark:bg-neutral-700 rounded" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-neutral-100 dark:bg-neutral-800 rounded">
        <svg width="64" height="64" fill="none" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="32" fill="#e5e7eb" />
          <path d="M32 16a16 16 0 1 1-16 16" stroke="#6366f1" strokeWidth="3" fill="none" />
        </svg>
        <span className="mt-4 text-neutral-500 dark:text-neutral-400">{emptyMessage}</span>
      </div>
    );
  }

  return (
    <div ref={chartRef} className="bg-white dark:bg-neutral-900 rounded shadow p-4 w-full" style={style}>
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-lg">Distribution</span>
        <button
          onClick={handleExport}
          className="px-2 py-1 text-xs rounded bg-primary text-white hover:bg-primary-dark transition-colors"
        >
          Export
        </button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <RePieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="90%"
            innerRadius={innerRadius}
            isAnimationActive
            animationDuration={600}
            label
          >
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={entry.color || defaultColors[idx % defaultColors.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb' }} />
          <Legend />
        </RePieChart>
      </ResponsiveContainer>
    </div>
  );
} 