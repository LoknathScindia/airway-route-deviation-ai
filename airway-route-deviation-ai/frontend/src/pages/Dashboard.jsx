import DashboardHero from "@/components/dashboard/DashboardHero";
import KpiSection from "@/components/dashboard/KpiSection";
import ChartsSection from "@/components/dashboard/ChartsSection";

import { useDashboard } from "@/hooks/useDashboard";

function Dashboard() {
  const { stats, loading, error } = useDashboard();

  if (loading) {
    return <div className="p-10">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className="p-10 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <DashboardHero />

      <KpiSection stats={stats} />

      <ChartsSection />
    </div>
  );
}

export default Dashboard;