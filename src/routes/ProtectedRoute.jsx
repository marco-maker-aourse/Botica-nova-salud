import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute({ allowRoles }) {
  const { loading, isAuthenticated, profile } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="glass-panel rounded-3xl px-8 py-6 text-center shadow-soft">
          <div className="mx-auto mb-4 h-12 w-12 animate-pulse rounded-full bg-brand-100" />
          <p className="text-sm text-slate-500">Cargando entorno seguro...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowRoles?.length && !allowRoles.includes(profile?.rol)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
