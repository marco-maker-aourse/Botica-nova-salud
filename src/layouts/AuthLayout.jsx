import logo from "../assets/logo.svg";

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-hero-mesh px-4 py-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-soft lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden bg-gradient-to-br from-brand-700 via-brand-600 to-accent-600 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <img src={logo} alt="Nova Salud" className="h-10" />
            <p className="mt-10 max-w-md text-sm leading-7 text-white/85">
              Plataforma empresarial para controlar inventario, ventas y alertas de la botica Nova Salud con visibilidad operativa en tiempo real.
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold">Control total del negocio farmacéutico.</p>
            <p className="mt-3 text-white/80">
              Menos quiebres de stock, mas velocidad de atencion y trazabilidad completa.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 sm:p-10">{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
