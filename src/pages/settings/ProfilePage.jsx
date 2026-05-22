import { useAuth } from "../../hooks/useAuth";
import PageHeader from "../../components/common/PageHeader";

function ProfilePage() {
  const { profile, user } = useAuth();

  return (
    <div className="space-y-6">
      <PageHeader title="Perfil del usuario" description="Consulta informacion del colaborador autenticado y su rol operativo." />
      <div className="glass-panel rounded-3xl p-6 shadow-soft">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-5">
            <p className="text-sm text-slate-500">Nombre completo</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{profile?.nombreCompleto}</p>
          </div>
          <div className="rounded-2xl bg-white p-5">
            <p className="text-sm text-slate-500">Correo</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{user?.email}</p>
          </div>
          <div className="rounded-2xl bg-white p-5">
            <p className="text-sm text-slate-500">Rol</p>
            <p className="mt-2 text-lg font-semibold uppercase text-slate-900">{profile?.rol}</p>
          </div>
          <div className="rounded-2xl bg-white p-5">
            <p className="text-sm text-slate-500">Estado</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{profile?.estado}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
