import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";
import ProductTable from "../../components/products/ProductTable";
import { deleteProduct, getProducts } from "../../services/productService";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  const loadProducts = async () => {
    const data = await getProducts({ estado: statusFilter });
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, [statusFilter]);

  const filteredProducts = useMemo(
    () =>
      products.filter((item) => {
        const haystack = `${item.nombre} ${item.categoria} ${item.codigoBarras}`.toLowerCase();
        return haystack.includes(query.toLowerCase());
      }),
    [products, query],
  );

  const handleDelete = async (product) => {
    const result = await Swal.fire({
      title: "Eliminar producto",
      text: `Se eliminara ${product.nombre}. Esta accion no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;
    await deleteProduct(product.id);
    await loadProducts();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestion de productos"
        description="Administra el catalogo, controla stock minimo y manten informacion farmacologica centralizada."
        actions={
          <Link to="/productos/nuevo">
            <Button>Nuevo producto</Button>
          </Link>
        }
      />
      <div className="grid gap-4 rounded-3xl bg-white p-4 shadow-soft md:grid-cols-[1fr_200px]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar por nombre, categoria o codigo de barras"
          className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
        />
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
        >
          <option value="todos">Todos</option>
          <option value="activo">Activos</option>
          <option value="inactivo">Inactivos</option>
        </select>
      </div>
      <ProductTable products={filteredProducts} onDelete={handleDelete} />
    </div>
  );
}

export default ProductsPage;
