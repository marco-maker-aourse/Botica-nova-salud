import PageHeader from "../../components/common/PageHeader";

function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Configuracion"
        description="Seccion preparada para parametros del negocio, series, impuestos, categorias y proveedores."
      />
      <div className="glass-panel rounded-3xl p-6 shadow-soft">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-5">
            <h3 className="font-semibold text-slate-900">Roles del sistema</h3>
            <p className="mt-2 text-sm text-slate-500">Administra permisos para `admin` y `vendedor` desde Firestore.</p>
          </div>
          <div className="rounded-2xl bg-white p-5">
            <h3 className="font-semibold text-slate-900">Parametros tributarios</h3>
            <p className="mt-2 text-sm text-slate-500">Configura IGV, comprobantes, metodos de pago y datos corporativos.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
