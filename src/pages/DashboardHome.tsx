import { KPICard } from "../components/dashboard/KPICard";
import { ProgressRing } from "../components/dashboard/ProgressRing";
import { ReportsGallery } from "../components/dashboard/ReportsGallery";

const sampleKPIData = [
  { value: 45 },
  { value: 52 },
  { value: 48 },
  { value: 61 },
  { value: 55 },
  { value: 67 },
  { value: 73 },
];

const sampleReports = [
  {
    id: "1",
    title: "Sales Report",
    description: "Monthly sales performance analysis",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: "2",
    title: "User Analytics",
    description: "User engagement and behavior metrics",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "3",
    title: "Financial Overview",
    description: "Revenue and expense breakdown",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150",
  },
];

export function DashboardHome() {
  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          label="Total Revenue"
          value={125000}
          trend="up"
          trendValue={12.5}
          data={sampleKPIData}
        />
        <KPICard
          label="Active Users"
          value={8420}
          trend="up"
          trendValue={8.2}
          data={sampleKPIData}
        />
        <KPICard
          label="Conversion Rate"
          value={3.4}
          trend="down"
          trendValue={-2.1}
          data={sampleKPIData}
        />
        <KPICard
          label="Support Tickets"
          value={42}
          trend="neutral"
          data={sampleKPIData}
        />
      </div>

      {/* Progress Rings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6 text-center">
          <ProgressRing value={65} label="Project Progress" />
        </div>
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6 text-center">
          <ProgressRing
            value={60}
            label="Goal Achievement"
            color="var(--color-accent-green)"
          />
        </div>
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6 text-center">
          <ProgressRing
            value={85}
            label="Customer Satisfaction"
            color="var(--color-accent-pink)"
          />
        </div>
      </div>

      {/* Reports Gallery */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Reports</h2>
        <ReportsGallery
          templates={sampleReports}
          onSelect={(id) => console.log("Selected report:", id)}
        />
      </div>
    </div>
  );
}
