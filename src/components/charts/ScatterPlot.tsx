import {
  ScatterChart as ReScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ZAxis,
} from 'recharts';
import { useRef } from 'react';
import type { CSSProperties } from 'react';

export interface ScatterPlotData {
  x: number;
  y: number;
  z?: number;
  name?: string;
  color?: string;
}

export interface ScatterPlotProps {
  data: ScatterPlotData[];
  loading?: boolean;
  emptyMessage?: string;
  style?: CSSProperties;
}

export function ScatterPlot({ data, loading, emptyMessage = 'No data available', style }: ScatterPlotProps) {
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
    link.download = 'scatterplot.svg';
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
          <circle cx="32" cy="32" r="12" fill="#6366f1" />
        </svg>
        <span className="mt-4 text-neutral-500 dark:text-neutral-400">{emptyMessage}</span>
      </div>
    );
  }

  return (
    <div ref={chartRef} className="bg-white dark:bg-neutral-900 rounded shadow p-4 w-full" style={style}>
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-lg">Correlations</span>
        <button
          onClick={handleExport}
          className="px-2 py-1 text-xs rounded bg-primary text-white hover:bg-primary-dark transition-colors"
        >
          Export
        </button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <ReScatterChart margin={{ top: 16, right: 24, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="x" stroke="#6b7280" type="number" />
          <YAxis dataKey="y" stroke="#6b7280" type="number" />
          <ZAxis dataKey="z" range={[60, 400]} />
          <Tooltip contentStyle={{ background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb' }} />
          <Legend />
          <Scatter
            name="Data"
            data={data}
            fill="var(--color-primary)"
            animationDuration={600}
            isAnimationActive
          />
        </ReScatterChart>
      </ResponsiveContainer>
    </div>
  );
} 