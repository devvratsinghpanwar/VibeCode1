import { useState } from 'react';
import { ReportsGallery } from '../components/dashboard/ReportsGallery';

const reportTemplates = [
  {
    id: '1',
    title: 'Sales Performance Report',
    description: 'Comprehensive analysis of sales metrics and trends',
    image: 'https://via.placeholder.com/300x200/6366f1/ffffff?text=Sales+Report'
  },
  {
    id: '2',
    title: 'User Engagement Analytics',
    description: 'Deep dive into user behavior and engagement patterns',
    image: 'https://via.placeholder.com/300x200/8b5cf6/ffffff?text=User+Analytics'
  },
  {
    id: '3',
    title: 'Financial Summary',
    description: 'Monthly financial overview with key metrics',
    image: 'https://via.placeholder.com/300x200/06b6d4/ffffff?text=Financial+Report'
  },
  {
    id: '4',
    title: 'Marketing Campaign Analysis',
    description: 'ROI and performance metrics for marketing campaigns',
    image: 'https://via.placeholder.com/300x200/10b981/ffffff?text=Marketing+Report'
  },
  {
    id: '5',
    title: 'Customer Satisfaction Survey',
    description: 'Customer feedback and satisfaction metrics',
    image: 'https://via.placeholder.com/300x200/f59e0b/ffffff?text=Customer+Survey'
  },
  {
    id: '6',
    title: 'Inventory Management Report',
    description: 'Stock levels, turnover rates, and inventory insights',
    image: 'https://via.placeholder.com/300x200/ef4444/ffffff?text=Inventory+Report'
  }
];

const recentReports = [
  { id: '1', name: 'Q4 Sales Report', date: '2024-01-15', status: 'completed' },
  { id: '2', name: 'User Analytics - December', date: '2024-01-10', status: 'completed' },
  { id: '3', name: 'Marketing ROI Analysis', date: '2024-01-08', status: 'processing' },
  { id: '4', name: 'Financial Summary - Q4', date: '2024-01-05', status: 'completed' }
];

export function ReportsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleReportSelect = (reportId: string) => {
    console.log('Generating report:', reportId);
    // Here you would typically navigate to report generation or show a modal
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reports</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Create Custom Report
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-4">
        {['all', 'sales', 'analytics', 'financial', 'marketing'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg capitalize transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Report Templates */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Report Templates</h2>
        <ReportsGallery 
          templates={reportTemplates}
          onSelect={handleReportSelect}
        />
      </div>

      {/* Recent Reports */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-neutral-700">
                <th className="text-left py-3 px-4">Report Name</th>
                <th className="text-left py-3 px-4">Date Generated</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map((report) => (
                <tr key={report.id} className="border-b border-gray-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-medium">{report.name}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{report.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      report.status === 'completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">Download</button>
                    <button className="text-gray-600 hover:text-gray-800">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
