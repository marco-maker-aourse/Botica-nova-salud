import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCurrency } from "../../utils/formatters";

function SalesOverviewChart({ data }) {
  return (
    <div className="glass-panel rounded-3xl p-5 shadow-soft">
      <h3 className="section-title">Ventas diarias</h3>
      <div className="mt-5 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0f6cbd" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#0f6cbd" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
            <XAxis dataKey="fecha" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Area type="monotone" dataKey="total" stroke="#0f6cbd" fill="url(#salesFill)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SalesOverviewChart;
