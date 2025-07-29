import { useState } from 'react';
import clsx from 'clsx';

const chartTypes = [
  { value: 'line', label: 'Line Chart' },
  { value: 'bar', label: 'Bar Chart' },
  { value: 'pie', label: 'Pie/Donut Chart' },
  { value: 'area', label: 'Area Chart' },
  { value: 'heatmap', label: 'Heatmap' },
];

export interface ReportBuilderProps {
  onSubmit: (report: ReportBuilderState) => void;
}

export interface ReportBuilderState {
  title: string;
  description: string;
  chartType: string;
  dataSource: string;
}

export function ReportBuilder({ onSubmit }: ReportBuilderProps) {
  const [state, setState] = useState<ReportBuilderState>({
    title: '',
    description: '',
    chartType: chartTypes[0].value,
    dataSource: '',
  });
  const [touched, setTouched] = useState<{ [k: string]: boolean }>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  }
  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  }
  function validate() {
    return {
      title: !state.title ? 'Title is required' : '',
      description: !state.description ? 'Description is required' : '',
      dataSource: !state.dataSource ? 'Data source is required' : '',
    };
  }
  const errors = validate();
  const isValid = !Object.values(errors).some(Boolean);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ title: true, description: true, dataSource: true });
    setSubmitted(true);
    if (isValid) {
      onSubmit(state);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6 flex flex-col gap-4 max-w-xl mx-auto">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          name="title"
          value={state.title}
          onChange={handleChange}
          onBlur={handleBlur}
          className={clsx("border rounded px-3 py-2 w-full", touched.title && errors.title && 'border-red-500')}
        />
        {touched.title && errors.title && <div className="text-xs text-red-500 mt-1">{errors.title}</div>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={state.description}
          onChange={handleChange}
          onBlur={handleBlur}
          className={clsx("border rounded px-3 py-2 w-full min-h-[60px]", touched.description && errors.description && 'border-red-500')}
        />
        {touched.description && errors.description && <div className="text-xs text-red-500 mt-1">{errors.description}</div>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Chart Type</label>
        <select
          name="chartType"
          value={state.chartType}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        >
          {chartTypes.map((ct) => (
            <option key={ct.value} value={ct.value}>{ct.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Data Source</label>
        <input
          name="dataSource"
          value={state.dataSource}
          onChange={handleChange}
          onBlur={handleBlur}
          className={clsx("border rounded px-3 py-2 w-full", touched.dataSource && errors.dataSource && 'border-red-500')}
        />
        {touched.dataSource && errors.dataSource && <div className="text-xs text-red-500 mt-1">{errors.dataSource}</div>}
      </div>
      <button
        type="submit"
        className="mt-2 px-4 py-2 rounded bg-primary text-white font-semibold hover:bg-primary-dark transition-colors disabled:opacity-60"
        disabled={!isValid && submitted}
      >
        Create Report
      </button>
    </form>
  );
} 