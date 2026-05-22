import { Link } from "react-router-dom";
import { formatCurrency, formatDate } from "../../utils/formatters";
import EmptyState from "../common/EmptyState";
import StatusBadge from "../common/StatusBadge";
import Button from "../ui/Button";

function ProductTable({ products, onDelete }) {
  if (!products.length) {
    return (
      <EmptyState
        title="No hay productos registrados"
        description="Empieza cargando el catalogo inicial para ver movimientos, alertas y reportes."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
      <div className="soft-scrollbar overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-5 py-4">Producto</th>
              <th className="px-5 py-4">Categoria</th>
              <th className="px-5 py-4">Stock</th>
              <th className="px-5 py-4">Precio</th>
              <th className="px-5 py-4">Vencimiento</th>
              <th className="px-5 py-4">Estado</th>
              <th className="px-5 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-slate-100">
                <td className="px-5 py-4">
                  <div>
                    <p className="font-semibold text-slate-900">{product.nombre}</p>
                    <p className="text-xs text-slate-500">{product.codigoBarras || "Sin codigo"}</p>
                  </div>
                </td>
                <td className="px-5 py-4">{product.categoria}</td>
                <td className="px-5 py-4">
                  <StatusBadge tone={Number(product.stock) <= Number(product.stockMinimo) ? "danger" : "success"}>
                    {product.stock}
                  </StatusBadge>
                </td>
                <td className="px-5 py-4">{formatCurrency(product.precioVenta)}</td>
                <td className="px-5 py-4">{formatDate(product.fechaVencimiento)}</td>
                <td className="px-5 py-4">
                  <StatusBadge tone={product.estado === "activo" ? "success" : "warning"}>
                    {product.estado}
                  </StatusBadge>
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <Link to={`/productos/editar/${product.id}`}>
                      <Button variant="secondary">Editar</Button>
                    </Link>
                    <Button variant="danger" onClick={() => onDelete(product)}>
                      Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;
