import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import PageHeader from "../../components/common/PageHeader";
import SaleComposer from "../../components/sales/SaleComposer";
import SalesHistoryTable from "../../components/sales/SalesHistoryTable";
import { useAuth } from "../../hooks/useAuth";
import { getClients } from "../../services/clientService";
import { getProducts } from "../../services/productService";
import { createSale, getSales } from "../../services/salesService";

function SalesPage() {
  const { profile, user } = useAuth();
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [sales, setSales] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    const [productData, clientData, salesData] = await Promise.all([getProducts(), getClients(), getSales()]);
    setProducts(productData.filter((item) => item.estado === "activo"));
    setClients(clientData);
    setSales(salesData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (payload) => {
    try {
      setSubmitting(true);
      await createSale(payload, {
        uid: user?.uid,
        nombreCompleto: profile?.nombreCompleto || user?.displayName || "Colaborador",
      });
      await Swal.fire({
        icon: "success",
        title: "Venta registrada",
        text: "El stock se actualizo automaticamente y el historial ya fue sincronizado.",
      });
      await loadData();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "No se pudo registrar la venta",
        text: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Modulo de ventas"
        description="Registra operaciones con carrito dinamico, control en tiempo real y trazabilidad para auditoria."
      />
      <SaleComposer products={products} clients={clients} onSubmit={handleSubmit} submitting={submitting} />
      <div className="space-y-4">
        <h3 className="section-title">Historial de ventas</h3>
        <SalesHistoryTable sales={sales} />
      </div>
    </div>
  );
}

export default SalesPage;
