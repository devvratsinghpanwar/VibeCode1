import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Rectangle,
  Bar,
} from 'recharts';
import { useRef } from 'react';
import type { CSSProperties } from 'react';

export interface HeatmapData {
  x: string;
  y: string;
  value: number;
}

export interface HeatmapProps {
  data: HeatmapData[];
  xLabels: string[];
  yLabels: string[];
  colorRange?: [string, string];
  loading?: boolean;
  emptyMessage?: string;
  style?: CSSProperties;
}

function getColor(value: number, min: number, max: number, colorRange: [string, string]) {
  // Simple linear interpolation between two colors
  const [start, end] = colorRange;
  const percent = (value - min) / (max - min || 1);
  // Interpolate RGB
  const hexToRgb = (hex: string) => hex.match(/\w\w/g)?.map((x) => parseInt(x, 16)) || [0,0,0];
  const rgbToHex = (r: number, g: number, b: number) => `#${[r,g,b].map(x=>x.toString(16).padStart(2,'0')).join('')}`;
  const s = hexToRgb(start.replace('#',''));
  const e = hexToRgb(end.replace('#',''));
  const rgb = s.map((v, i) => Math.round(v + (e[i] - v) * percent));
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
}

export function Heatmap({ data, xLabels, yLabels, colorRange = ['#e0e7ff', '#6366f1'], loading, emptyMessage = 'No data available', style }: HeatmapProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const min = Math.min(...data.map(d => d.value));
  const max = Math.max(...data.map(d => d.value));

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
    link.download = 'heatmap.svg';
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
          <rect x="20" y="20" width="24" height="24" rx="4" fill="#6366f1" />
        </svg>
        <span className="mt-4 text-neutral-500 dark:text-neutral-400">{emptyMessage}</span>
      </div>
    );
  }

  // Transform data for recharts
  const chartData = yLabels.map((y) => {
    const row: Record<string, any> = { y };
    xLabels.forEach((x) => {
      const found = data.find((d) => d.x === x && d.y === y);
      row[x] = found ? found.value : 0;
    });
    return row;
  });

  return (
    <div ref={chartRef} className="bg-white dark:bg-neutral-900 rounded shadow p-4 w-full" style={style}>
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-lg">Intensity Heatmap</span>
        <button
          onClick={handleExport}
          className="px-2 py-1 text-xs rounded bg-primary text-white hover:bg-primary-dark transition-colors"
        >
          Export
        </button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={chartData} layout="vertical" margin={{ top: 16, right: 24, left: 0, bottom: 0 }}>
          <XAxis type="category" dataKey="y" hide />
          <YAxis type="category" dataKey="y" width={80} />
          <Tooltip contentStyle={{ background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb' }} />
          <Legend />
          {xLabels.map((x) => (
            <Bar
              key={x}
              dataKey={x}
              barSize={24}
              shape={(props: any) => {
                const { x: px, y: py, width, height, payload } = props;
                const value = payload[x];
                return (
                  <Rectangle
                    x={px}
                    y={py}
                    width={width}
                    height={height}
                    fill={getColor(value, min, max, colorRange)}
                    radius={4}
                  />
                );
              }}
              isAnimationActive
              animationDuration={600}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
} 