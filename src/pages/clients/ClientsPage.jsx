import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";
import { createClient, deleteClient, getClients } from "../../services/clientService";

function ClientsPage() {
  const [clients, setClients] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const loadClients = async () => {
    const data = await getClients();
    setClients(data);
  };

  useEffect(() => {
    loadClients();
  }, []);

  const onSubmit = async (values) => {
    await createClient(values);
    reset();
    loadClients();
  };

  const handleDelete = async (client) => {
    const result = await Swal.fire({
      title: "Eliminar cliente",
      text: `Se eliminara ${client.nombre}.`,
      icon: "warning",
      showCancelButton: true,
    });
    if (!result.isConfirmed) return;
    await deleteClient(client.id);
    loadClients();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestion de clientes"
        description="Conserva la base comercial para fidelizacion, historial de compra y mejor atencion al cliente."
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_1.3fr]">
        <form onSubmit={handleSubmit(onSubmit)} className="glass-panel rounded-3xl p-5 shadow-soft">
          <div className="grid gap-4">
            <InputField
              label="Nombre"
              register={register("nombre", { required: "Nombre obligatorio" })}
              error={errors.nombre?.message}
            />
            <InputField label="DNI" register={register("dni")} />
            <InputField label="Telefono" register={register("telefono")} />
            <InputField label="Correo" register={register("correo")} />
            <InputField label="Direccion" register={register("direccion")} />
            <Button type="submit">Guardar cliente</Button>
          </div>
        </form>
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-4">Nombre</th>
                <th className="px-5 py-4">DNI</th>
                <th className="px-5 py-4">Telefono</th>
                <th className="px-5 py-4 text-right">Accion</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-t border-slate-100">
                  <td className="px-5 py-4">{client.nombre}</td>
                  <td className="px-5 py-4">{client.dni}</td>
                  <td className="px-5 py-4">{client.telefono}</td>
                  <td className="px-5 py-4 text-right">
                    <Button variant="danger" onClick={() => handleDelete(client)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ClientsPage;
