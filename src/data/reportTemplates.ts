import type { ReportTemplate } from '../components/dashboard/ReportsGallery';

export const reportTemplates: ReportTemplate[] = [
  {
    id: 'sales-summary',
    title: 'Sales Summary',
    description: 'Overview of sales performance, trends, and key metrics.',
    image: 'https://placehold.co/400x200/6366f1/fff?text=Sales+Summary',
  },
  {
    id: 'customer-cohort',
    title: 'Customer Cohort Analysis',
    description: 'Analyze customer retention and churn by cohort.',
    image: 'https://placehold.co/400x200/a21caf/fff?text=Cohort+Analysis',
  },
  {
    id: 'regional-performance',
    title: 'Regional Performance',
    description: 'Compare performance across different regions.',
    image: 'https://placehold.co/400x200/22d3ee/fff?text=Regional+Performance',
  },
  {
    id: 'product-insights',
    title: 'Product Insights',
    description: 'Deep dive into product usage and engagement.',
    image: 'https://placehold.co/400x200/f472b6/fff?text=Product+Insights',
  },
  {
    id: 'marketing-roi',
    title: 'Marketing ROI',
    description: 'Evaluate marketing campaign effectiveness and ROI.',
    image: 'https://placehold.co/400x200/fb923c/fff?text=Marketing+ROI',
  },
  {
    id: 'custom',
    title: 'Custom Report',
    description: 'Start from scratch and build your own report.',
    image: 'https://placehold.co/400x200/4f46e5/fff?text=Custom+Report',
  },
]; 