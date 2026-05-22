import { useEffect, useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import PageHeader from "../../components/common/PageHeader";
import { getDashboardMetrics } from "../../services/dashboardService";
import { buildSalesByDay, buildTopProducts } from "../../services/reportService";
import { formatCurrency } from "../../utils/formatters";

function ReportsPage() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    getDashboardMetrics().then(setMetrics);
  }, []);

  const salesByDay = useMemo(() => buildSalesByDay(metrics?.sales || []), [metrics]);
  const topProducts = useMemo(() => buildTopProducts(metrics?.sales || []), [metrics]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reportes administrativos"
        description="Analiza ingresos, comportamiento de ventas, productos mas vendidos y riesgos operativos."
      />
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="glass-panel rounded-3xl p-5 shadow-soft">
          <h3 className="section-title">Ventas diarias</h3>
          <div className="mt-5 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesByDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Bar dataKey="total" fill="#0f6cbd" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass-panel rounded-3xl p-5 shadow-soft">
          <h3 className="section-title">Productos mas vendidos</h3>
          <div className="mt-5 space-y-4">
            {topProducts.map((item) => (
              <div key={item.nombre} className="rounded-2xl bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-900">{item.nombre}</p>
                  <p className="text-sm text-slate-500">{item.cantidad} unidades</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="glass-panel rounded-3xl p-5 shadow-soft">
        <h3 className="section-title">Stock critico y vencimientos</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {metrics?.lowStock?.map((item) => (
            <div key={item.id} className="rounded-2xl border border-rose-100 bg-rose-50 p-4">
              <p className="font-semibold text-rose-700">{item.nombre}</p>
              <p className="text-sm text-rose-600">Stock actual: {item.stock} | Minimo: {item.stockMinimo}</p>
            </div>
          ))}
          {metrics?.expiring?.map((item) => (
            <div key={item.id} className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
              <p className="font-semibold text-amber-700">{item.nombre}</p>
              <p className="text-sm text-amber-600">Vence pronto: {item.fechaVencimiento}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
