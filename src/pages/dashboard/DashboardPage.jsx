import { useEffect, useMemo, useState } from "react";
import { FaBoxOpen, FaCoins, FaTriangleExclamation, FaUserGroup } from "react-icons/fa6";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import SkeletonCard from "../../components/ui/SkeletonCard";
import SalesOverviewChart from "../../components/dashboard/SalesOverviewChart";
import AlertsPanel from "../../components/alerts/AlertsPanel";
import { getDashboardMetrics } from "../../services/dashboardService";
import { getAlerts } from "../../services/alertService";
import { buildSalesByDay } from "../../services/reportService";

function DashboardPage() {
  const [metrics, setMetrics] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    setLoading(true);
    const [dashboard, alertData] = await Promise.all([getDashboardMetrics(), getAlerts()]);
    setMetrics(dashboard);
    setAlerts(alertData.filter((item) => !item.leido));
    setLoading(false);
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const chartData = useMemo(() => buildSalesByDay(metrics?.sales || []), [metrics]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard ejecutivo"
        description="Supervisa indicadores clave, alertas de stock y comportamiento comercial de la botica."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <StatCard label="Productos" value={metrics?.totals.productos} icon={FaBoxOpen} />
            <StatCard label="Ventas del dia" value={metrics?.totals.ventasHoy} icon={FaCoins} color="accent" />
            <StatCard label="Stock bajo" value={metrics?.totals.stockBajo} icon={FaTriangleExclamation} color="rose" />
            <StatCard label="Clientes" value={metrics?.totals.clientes} icon={FaUserGroup} color="amber" />
          </>
        )}
      </div>
      {!loading && (
        <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
          <SalesOverviewChart data={chartData} />
          <AlertsPanel alerts={alerts} onRefresh={loadDashboard} />
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
