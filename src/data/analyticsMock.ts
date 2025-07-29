// Time series data for line/area charts
export const timeSeriesData = Array.from({ length: 30 }, (_, i) => ({
  date: `2024-07-${(i + 1).toString().padStart(2, '0')}`,
  value: Math.round(1000 + Math.sin(i / 3) * 200 + Math.random() * 100),
  cohortA: Math.round(500 + Math.cos(i / 4) * 100 + Math.random() * 50),
  cohortB: Math.round(400 + Math.sin(i / 5) * 80 + Math.random() * 40),
}));

// Bar chart data for categories
export const categoryData = [
  { name: 'Marketing', value: 1200 },
  { name: 'Sales', value: 980 },
  { name: 'Product', value: 1500 },
  { name: 'Support', value: 700 },
  { name: 'HR', value: 400 },
];

// Pie/Donut chart data for regions
export const regionData = [
  { name: 'North America', value: 1200 },
  { name: 'Europe', value: 900 },
  { name: 'Asia', value: 700 },
  { name: 'South America', value: 300 },
  { name: 'Africa', value: 200 },
];

// Heatmap data for intensity by region and category
export const heatmapData = [
  { x: 'Marketing', y: 'North America', value: 80 },
  { x: 'Marketing', y: 'Europe', value: 60 },
  { x: 'Marketing', y: 'Asia', value: 40 },
  { x: 'Sales', y: 'North America', value: 70 },
  { x: 'Sales', y: 'Europe', value: 50 },
  { x: 'Sales', y: 'Asia', value: 30 },
  { x: 'Product', y: 'North America', value: 90 },
  { x: 'Product', y: 'Europe', value: 80 },
  { x: 'Product', y: 'Asia', value: 60 },
  { x: 'Support', y: 'North America', value: 50 },
  { x: 'Support', y: 'Europe', value: 40 },
  { x: 'Support', y: 'Asia', value: 20 },
  { x: 'HR', y: 'North America', value: 30 },
  { x: 'HR', y: 'Europe', value: 20 },
  { x: 'HR', y: 'Asia', value: 10 },
];

export const xLabels = ['Marketing', 'Sales', 'Product', 'Support', 'HR'];
export const yLabels = ['North America', 'Europe', 'Asia'];

// Cohort analysis data
export const cohortData = [
  { cohort: '2023 Q1', retained: 80, churned: 20 },
  { cohort: '2023 Q2', retained: 75, churned: 25 },
  { cohort: '2023 Q3', retained: 70, churned: 30 },
  { cohort: '2023 Q4', retained: 65, churned: 35 },
  { cohort: '2024 Q1', retained: 60, churned: 40 },
];

export const popData = [
  { period: 'Current', value: 1500 },
  { period: 'Previous', value: 1200 },
]; 