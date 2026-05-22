import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { isFirebaseConfigured } from "../firebase/config";
import ProtectedRoute from "./ProtectedRoute";

const FirebaseSetupPage = lazy(() => import("../pages/auth/FirebaseSetupPage"));
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const DashboardPage = lazy(() => import("../pages/dashboard/DashboardPage"));
const ProductsPage = lazy(() => import("../pages/inventory/ProductsPage"));
const ProductFormPage = lazy(() => import("../pages/inventory/ProductFormPage"));
const SalesPage = lazy(() => import("../pages/sales/SalesPage"));
const ClientsPage = lazy(() => import("../pages/clients/ClientsPage"));
const ReportsPage = lazy(() => import("../pages/reports/ReportsPage"));
const SettingsPage = lazy(() => import("../pages/settings/SettingsPage"));
const ProfilePage = lazy(() => import("../pages/settings/ProfilePage"));

function AppRouter() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-100">
          <div className="glass-panel rounded-3xl px-8 py-6 text-center shadow-soft">
            <div className="mx-auto mb-4 h-12 w-12 animate-pulse rounded-full bg-brand-100" />
            <p className="text-sm text-slate-500">Cargando modulos del sistema...</p>
          </div>
        </div>
      }
    >
      <Routes>
        {!isFirebaseConfigured ? (
          <>
            <Route path="*" element={<FirebaseSetupPage />} />
          </>
        ) : (
          <>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/productos" element={<ProductsPage />} />
            <Route path="/productos/nuevo" element={<ProductFormPage />} />
            <Route path="/productos/editar/:id" element={<ProductFormPage />} />
            <Route path="/ventas" element={<SalesPage />} />
            <Route path="/clientes" element={<ClientsPage />} />
            <Route path="/reportes" element={<ReportsPage />} />
            <Route path="/configuracion" element={<SettingsPage />} />
            <Route path="/perfil" element={<ProfilePage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </>
        )}
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
