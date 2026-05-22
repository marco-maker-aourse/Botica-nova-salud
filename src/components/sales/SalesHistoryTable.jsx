import { formatCurrency, formatDate } from "../../utils/formatters";
import EmptyState from "../common/EmptyState";

function SalesHistoryTable({ sales }) {
  if (!sales.length) {
    return <EmptyState title="Sin ventas registradas" description="Las operaciones del dia apareceran aqui." />;
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
      <div className="soft-scrollbar overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-5 py-4">Fecha</th>
              <th className="px-5 py-4">Cliente</th>
              <th className="px-5 py-4">Items</th>
              <th className="px-5 py-4">Metodo</th>
              <th className="px-5 py-4">Total</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="border-t border-slate-100">
                <td className="px-5 py-4">{formatDate(sale.fechaVenta, "dd/MM/yyyy HH:mm")}</td>
                <td className="px-5 py-4">{sale.clienteNombre}</td>
                <td className="px-5 py-4">{sale.productos?.length || 0}</td>
                <td className="px-5 py-4">{sale.metodoPago}</td>
                <td className="px-5 py-4 font-semibold text-slate-900">{formatCurrency(sale.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalesHistoryTable;
