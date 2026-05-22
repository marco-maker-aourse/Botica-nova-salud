import { getClients } from "./clientService";
import { getProducts } from "./productService";
import { getSales } from "./salesService";

export async function getDashboardMetrics() {
  const [products, sales, clients] = await Promise.all([getProducts(), getSales(), getClients()]);

  const now = new Date();
  const todayKey = now.toDateString();
  const lowStock = products.filter((item) => Number(item.stock) <= Number(item.stockMinimo));
  const expiring = products.filter((item) => {
    if (!item.fechaVencimiento) return false;
    const expiry = new Date(item.fechaVencimiento);
    const diffDays = (expiry - now) / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= 30;
  });

  const todaySales = sales.filter((item) => {
    const date = item.fechaVenta?.toDate ? item.fechaVenta.toDate() : new Date(item.fechaVenta);
    return date.toDateString() === todayKey;
  });

  const totalIncome = sales.reduce((sum, item) => sum + Number(item.total || 0), 0);

  return {
    totals: {
      productos: products.length,
      clientes: clients.length,
      stockBajo: lowStock.length,
      porVencer: expiring.length,
      ventasHoy: todaySales.length,
      ingresos: totalIncome,
    },
    lowStock,
    expiring,
    sales,
  };
}
