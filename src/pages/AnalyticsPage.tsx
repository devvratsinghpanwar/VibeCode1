import { useState } from 'react';
import { KPICard } from '../components/dashboard/KPICard';
import { ProgressRing } from '../components/dashboard/ProgressRing';

const analyticsData = [
  { value: 65 }, { value: 72 }, { value: 58 }, { value: 81 }, { value: 75 }, { value: 89 }, { value: 94 }
];

const trafficData = [
  { value: 45 }, { value: 52 }, { value: 48 }, { value: 61 }, { value: 55 }, { value: 67 }, { value: 73 }
];

export function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <select 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white dark:bg-neutral-800"
        >
          <option value="24h">Last 24 hours</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          label="Page Views"
          value={245680}
          trend="up"
          trendValue={15.3}
          data={analyticsData}
        />
        <KPICard
          label="Unique Visitors"
          value={18420}
          trend="up"
          trendValue={8.7}
          data={trafficData}
        />
        <KPICard
          label="Bounce Rate"
          value={32.4}
          trend="down"
          trendValue={-4.2}
          data={analyticsData}
        />
        <KPICard
          label="Avg. Session Duration"
          value={245}
          trend="up"
          trendValue={12.1}
          data={trafficData}
        />
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Conversion Funnel</h3>
          <div className="space-y-4">
            <ProgressRing value={100} label="Visitors" size={120} />
            <ProgressRing value={75} label="Engaged Users" size={120} color="var(--color-accent-green)" />
            <ProgressRing value={45} label="Conversions" size={120} color="var(--color-accent-pink)" />
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Organic Search</span>
              <span className="font-semibold">45.2%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{width: '45.2%'}}></div>
            </div>
            <div className="flex justify-between items-center">
              <span>Direct</span>
              <span className="font-semibold">28.7%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{width: '28.7%'}}></div>
            </div>
            <div className="flex justify-between items-center">
              <span>Social Media</span>
              <span className="font-semibold">16.3%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{width: '16.3%'}}></div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="truncate">/dashboard</span>
              <span className="font-semibold">12.4k</span>
            </div>
            <div className="flex justify-between">
              <span className="truncate">/analytics</span>
              <span className="font-semibold">8.7k</span>
            </div>
            <div className="flex justify-between">
              <span className="truncate">/reports</span>
              <span className="font-semibold">6.2k</span>
            </div>
            <div className="flex justify-between">
              <span className="truncate">/settings</span>
              <span className="font-semibold">3.1k</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
