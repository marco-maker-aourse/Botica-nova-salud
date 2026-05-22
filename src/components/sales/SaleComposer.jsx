import { useMemo, useState } from "react";
import Button from "../ui/Button";
import { formatCurrency } from "../../utils/formatters";

function SaleComposer({ products, clients, onSubmit, submitting }) {
  const [selectedProductId, setSelectedProductId] = useState("");
  const [cart, setCart] = useState([]);
  const [clientId, setClientId] = useState("");

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.cantidad * item.precioVenta, 0);
    const igv = subtotal * 0.18;
    return {
      subtotal,
      igv,
      descuento: 0,
      total: subtotal + igv,
    };
  }, [cart]);

  const addProduct = () => {
    const product = products.find((item) => item.id === selectedProductId);
    if (!product) return;

    setCart((current) => {
      const exists = current.find((item) => item.productoId === product.id);
      if (exists) {
        return current.map((item) =>
          item.productoId === product.id ? { ...item, cantidad: item.cantidad + 1 } : item,
        );
      }

      return [
        ...current,
        {
          productoId: product.id,
          nombre: product.nombre,
          cantidad: 1,
          precioVenta: Number(product.precioVenta),
        },
      ];
    });
  };

  const selectedClient = clients.find((item) => item.id === clientId);

  return (
    <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
      <div className="glass-panel rounded-3xl p-5 shadow-soft">
        <h3 className="section-title">Nueva venta</h3>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          <select
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
            value={clientId}
            onChange={(event) => setClientId(event.target.value)}
          >
            <option value="">Selecciona cliente</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.nombre}
              </option>
            ))}
          </select>
          <select
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
            value={selectedProductId}
            onChange={(event) => setSelectedProductId(event.target.value)}
          >
            <option value="">Selecciona producto</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.nombre} | Stock: {product.stock}
              </option>
            ))}
          </select>
          <Button onClick={addProduct}>Agregar al carrito</Button>
        </div>
        <div className="mt-5 space-y-3">
          {cart.map((item) => (
            <div key={item.productoId} className="flex items-center justify-between rounded-2xl bg-white p-4">
              <div>
                <p className="font-semibold text-slate-900">{item.nombre}</p>
                <p className="text-xs text-slate-500">Cantidad: {item.cantidad}</p>
              </div>
              <p className="text-sm font-semibold text-slate-900">
                {formatCurrency(item.cantidad * item.precioVenta)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="glass-panel rounded-3xl p-5 shadow-soft">
        <h3 className="section-title">Resumen</h3>
        <div className="mt-4 space-y-3 text-sm text-slate-600">
          <div className="flex justify-between">
            <span>Cliente</span>
            <span>{selectedClient?.nombre || "Consumidor final"}</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatCurrency(totals.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>IGV</span>
            <span>{formatCurrency(totals.igv)}</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-3 font-semibold text-slate-900">
            <span>Total</span>
            <span>{formatCurrency(totals.total)}</span>
          </div>
        </div>
        <Button
          className="mt-6 w-full"
          variant="success"
          disabled={!cart.length || submitting}
          onClick={() =>
            onSubmit({
              clienteId: clientId || null,
              clienteNombre: selectedClient?.nombre || "Consumidor final",
              productos: cart,
              subtotal: totals.subtotal,
              igv: totals.igv,
              descuento: totals.descuento,
              total: totals.total,
              metodoPago: "Efectivo",
            })
          }
        >
          {submitting ? "Procesando..." : "Registrar venta"}
        </Button>
      </div>
    </div>
  );
}

export default SaleComposer;
