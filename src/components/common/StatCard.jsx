import { formatCompactNumber, formatCurrency } from "../../utils/formatters";

function StatCard({ label, value, icon: Icon, color = "brand", money = false }) {
  const palette = {
    brand: "from-brand-500 to-brand-700",
    accent: "from-accent-500 to-emerald-700",
    rose: "from-rose-500 to-rose-700",
    amber: "from-amber-500 to-orange-600",
  };

  return (
    <div className="glass-panel rounded-3xl p-5 shadow-soft">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">
            {money ? formatCurrency(value) : formatCompactNumber(value)}
          </p>
        </div>
        <div className={`rounded-2xl bg-gradient-to-br p-3 text-white ${palette[color]}`}>
          <Icon className="text-xl" />
        </div>
      </div>
    </div>
  );
}

export default StatCard;
