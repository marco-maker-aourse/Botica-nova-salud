import { useForm } from "react-hook-form";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { minNumberRule, requiredRule } from "../../utils/validators";

function ProductForm({ defaultValues, onSubmit, submitting }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 lg:grid-cols-2">
      <InputField label="Nombre" register={register("nombre", requiredRule("Nombre"))} error={errors.nombre?.message} />
      <InputField
        label="Categoria"
        register={register("categoria", requiredRule("Categoria"))}
        error={errors.categoria?.message}
      />
      <InputField label="Descripcion" register={register("descripcion")} />
      <InputField label="Codigo de barras" register={register("codigoBarras")} />
      <InputField
        label="Precio de compra"
        type="number"
        step="0.01"
        register={register("precioCompra", { ...requiredRule("Precio de compra"), ...minNumberRule("Precio de compra") })}
        error={errors.precioCompra?.message}
      />
      <InputField
        label="Precio de venta"
        type="number"
        step="0.01"
        register={register("precioVenta", { ...requiredRule("Precio de venta"), ...minNumberRule("Precio de venta") })}
        error={errors.precioVenta?.message}
      />
      <InputField
        label="Stock"
        type="number"
        register={register("stock", { ...requiredRule("Stock"), ...minNumberRule("Stock") })}
        error={errors.stock?.message}
      />
      <InputField
        label="Stock minimo"
        type="number"
        register={register("stockMinimo", { ...requiredRule("Stock minimo"), ...minNumberRule("Stock minimo") })}
        error={errors.stockMinimo?.message}
      />
      <InputField label="Unidad de medida" register={register("unidadMedida", requiredRule("Unidad de medida"))} />
      <InputField label="Fecha de vencimiento" type="date" register={register("fechaVencimiento")} />
      <InputField label="Proveedor" register={register("proveedor", requiredRule("Proveedor"))} />
      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700">Estado</span>
        <select
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
          {...register("estado")}
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </label>
      <label className="block space-y-2 lg:col-span-2">
        <span className="text-sm font-medium text-slate-700">Imagen del producto</span>
        <input
          type="file"
          accept="image/*"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
          {...register("imagenFile")}
        />
      </label>
      <div className="lg:col-span-2">
        <Button type="submit" className="w-full sm:w-auto" disabled={submitting}>
          {submitting ? "Guardando..." : "Guardar producto"}
        </Button>
      </div>
    </form>
  );
}

export default ProductForm;
