import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import ProductForm from "../../components/products/ProductForm";
import { createProduct, getProductById, updateProduct } from "../../services/productService";

const initialValues = {
  nombre: "",
  descripcion: "",
  categoria: "Medicamentos",
  codigoBarras: "",
  precioCompra: 0,
  precioVenta: 0,
  stock: 0,
  stockMinimo: 0,
  unidadMedida: "Unidad",
  fechaVencimiento: "",
  proveedor: "",
  estado: "activo",
  imagen: "",
};

function ProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [defaultValues, setDefaultValues] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    getProductById(id).then((data) => {
      if (data) setDefaultValues(data);
    });
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      const payload = {
        ...values,
        precioCompra: Number(values.precioCompra),
        precioVenta: Number(values.precioVenta),
        stock: Number(values.stock),
        stockMinimo: Number(values.stockMinimo),
        imagenFile: values.imagenFile?.[0],
      };

      if (id) {
        await updateProduct(id, payload);
      } else {
        await createProduct(payload);
      }

      await Swal.fire({
        icon: "success",
        title: "Producto guardado",
        text: "La informacion del producto se actualizo correctamente.",
      });
      navigate("/productos");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "No se pudo guardar",
        text: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={id ? "Editar producto" : "Nuevo producto"}
        description="Completa la ficha farmacologica con precios, stock, vencimiento, proveedor e imagen."
      />
      <div className="glass-panel rounded-3xl p-6 shadow-soft">
        <ProductForm defaultValues={defaultValues} onSubmit={handleSubmit} submitting={submitting} />
      </div>
    </div>
  );
}

export default ProductFormPage;
