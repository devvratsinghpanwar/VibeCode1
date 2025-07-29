import type { CSSProperties } from 'react';

export interface ReportTemplate {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ReportsGalleryProps {
  templates: ReportTemplate[];
  onSelect: (id: string) => void;
  style?: CSSProperties;
}

export function ReportsGallery({ templates, onSelect, style }: ReportsGalleryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" style={style}>
      {templates.map((tpl) => (
        <button
          key={tpl.id}
          className="bg-white dark:bg-neutral-900 rounded-xl shadow hover:shadow-lg transition-shadow duration-200 p-4 flex flex-col items-start group"
          onClick={() => onSelect(tpl.id)}
        >
          <img src={tpl.image} alt={tpl.title} className="w-full h-32 object-cover rounded mb-3 group-hover:scale-105 transition-transform duration-200" />
          <div className="font-semibold text-lg mb-1 text-left">{tpl.title}</div>
          <div className="text-sm text-neutral-500 dark:text-neutral-400 text-left">{tpl.description}</div>
        </button>
      ))}
    </div>
  );
} 