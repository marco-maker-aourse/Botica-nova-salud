import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket, FaBell, FaUser } from "react-icons/fa6";
import { motion } from "framer-motion";
import { APP_NAME, SIDEBAR_LINKS } from "../utils/constants";
import { useAuth } from "../hooks/useAuth";
import logo from "../assets/logo.svg";

function DashboardLayout() {
  const navigate = useNavigate();
  const { profile, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[280px_1fr]">
        <aside className="glass-panel border-r border-white/60 px-5 py-6">
          <img src={logo} alt={APP_NAME} className="h-10" />
          <div className="mt-8 rounded-3xl bg-gradient-to-br from-brand-600 to-accent-500 p-5 text-white">
            <p className="text-sm text-white/80">Sesion activa</p>
            <p className="mt-2 text-lg font-semibold">{profile?.nombreCompleto || "Usuario"}</p>
            <p className="text-sm uppercase tracking-[0.18em] text-white/70">{profile?.rol || "vendedor"}</p>
          </div>
          <nav className="mt-8 space-y-2">
            {SIDEBAR_LINKS.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive ? "bg-brand-500 text-white shadow-soft" : "text-slate-600 hover:bg-white"
                  }`
                }
              >
                <Icon />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <div className="flex min-w-0 flex-col">
          <header className="flex items-center justify-between border-b border-slate-200 bg-white/75 px-6 py-4 backdrop-blur-xl">
            <div>
              <p className="text-sm text-slate-500">Panel corporativo</p>
              <h2 className="text-xl font-semibold text-slate-900">{APP_NAME}</h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="rounded-2xl bg-slate-100 p-3 text-slate-600 transition hover:bg-slate-200"
                onClick={() => navigate("/perfil")}
              >
                <FaUser />
              </button>
              <button
                className="rounded-2xl bg-slate-100 p-3 text-slate-600 transition hover:bg-slate-200"
                onClick={() => navigate("/dashboard")}
              >
                <FaBell />
              </button>
              <button
                className="rounded-2xl bg-rose-50 p-3 text-rose-600 transition hover:bg-rose-100"
                onClick={logout}
              >
                <FaArrowRightFromBracket />
              </button>
            </div>
          </header>
          <motion.main
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 px-4 py-6 sm:px-6 lg:px-8"
          >
            <Outlet />
          </motion.main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
