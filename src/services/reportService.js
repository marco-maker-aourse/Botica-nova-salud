export function buildSalesByDay(sales) {
  const map = new Map();

  sales.forEach((sale) => {
    const date = sale.fechaVenta?.toDate ? sale.fechaVenta.toDate() : new Date(sale.fechaVenta);
    const key = `${date.getDate()}/${date.getMonth() + 1}`;
    map.set(key, (map.get(key) || 0) + Number(sale.total || 0));
  });

  return [...map.entries()].map(([fecha, total]) => ({ fecha, total }));
}

export function buildTopProducts(sales) {
  const map = new Map();

  sales.forEach((sale) => {
    (sale.productos || []).forEach((item) => {
      map.set(item.nombre, (map.get(item.nombre) || 0) + Number(item.cantidad || 0));
    });
  });

  return [...map.entries()]
    .map(([nombre, cantidad]) => ({ nombre, cantidad }))
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 5);
}
