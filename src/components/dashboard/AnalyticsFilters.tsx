import { useState } from 'react';
import { motion } from 'framer-motion';
import { categoryData, regionData } from '../../data/analyticsMock';

export interface AnalyticsFiltersProps {
  onChange: (filters: AnalyticsFiltersState) => void;
}

export interface AnalyticsFiltersState {
  dateRange: [string, string];
  categories: string[];
  regions: string[];
}

const presets = [
  { label: 'Last 7 days', range: [getDate(-6), getDate(0)] },
  { label: 'Last 30 days', range: [getDate(-29), getDate(0)] },
  { label: 'This Month', range: [getMonthStart(), getDate(0)] },
];

function getDate(offset: number) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}
function getMonthStart() {
  const d = new Date();
  d.setDate(1);
  return d.toISOString().slice(0, 10);
}

export function AnalyticsFilters({ onChange }: AnalyticsFiltersProps) {
  const [dateRange, setDateRange] = useState<[string, string]>([presets[1].range[0], presets[1].range[1]]);
  const [categories, setCategories] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);

  function updateFilters(next: Partial<AnalyticsFiltersState>) {
    const newFilters = { dateRange, categories, regions, ...next };
    onChange(newFilters);
  }

  return (
    <motion.div
      className="bg-white dark:bg-neutral-900 rounded-xl shadow p-4 flex flex-col gap-4 mb-6"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-wrap gap-4 items-end">
        {/* Date Range Picker */}
        <div>
          <label className="block text-sm font-medium mb-1">Date Range</label>
          <div className="flex gap-2">
            <input
              type="date"
              value={dateRange[0]}
              onChange={e => { setDateRange([e.target.value, dateRange[1]]); updateFilters({ dateRange: [e.target.value, dateRange[1]] }); }}
              className="border rounded px-2 py-1 text-sm"
            />
            <span className="mx-1">-</span>
            <input
              type="date"
              value={dateRange[1]}
              onChange={e => { setDateRange([dateRange[0], e.target.value]); updateFilters({ dateRange: [dateRange[0], e.target.value] }); }}
              className="border rounded px-2 py-1 text-sm"
            />
          </div>
          <div className="flex gap-2 mt-1">
            {presets.map(preset => (
              <button
                key={preset.label}
                className="text-xs px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-primary/10"
                onClick={() => { setDateRange(preset.range as [string, string]); updateFilters({ dateRange: preset.range as [string, string] }); }}
                type="button"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
        {/* Category Multi-select */}
        <div>
          <label className="block text-sm font-medium mb-1">Categories</label>
          <select
            multiple
            value={categories}
            onChange={e => {
              const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
              setCategories(selected); updateFilters({ categories: selected });
            }}
            className="border rounded px-2 py-1 text-sm min-w-[120px]"
          >
            {categoryData.map(cat => (
              <option key={cat.name} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        {/* Region Multi-select */}
        <div>
          <label className="block text-sm font-medium mb-1">Regions</label>
          <select
            multiple
            value={regions}
            onChange={e => {
              const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
              setRegions(selected); updateFilters({ regions: selected });
            }}
            className="border rounded px-2 py-1 text-sm min-w-[120px]"
          >
            {regionData.map(region => (
              <option key={region.name} value={region.name}>{region.name}</option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  );
} 