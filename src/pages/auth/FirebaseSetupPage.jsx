function FirebaseSetupPage() {
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">Configuracion requerida</p>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">La app no se puede conectar a Firebase todavia</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          La pantalla en blanco venia de aqui: faltan las variables reales del archivo <code>.env</code>. Ya deje
          una vista segura para que el sistema no se rompa mientras configuras el proyecto.
        </p>
        <div className="mt-6 rounded-3xl bg-slate-50 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Pasos para levantarlo</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-600">
            <li>Copia <code>.env.example</code> como <code>.env</code>.</li>
            <li>Completa tus credenciales reales de Firebase.</li>
            <li>Reinicia el servidor con <code>npm run dev</code>.</li>
          </ol>
        </div>
        <div className="mt-6 rounded-3xl border border-dashed border-slate-300 p-6">
          <pre className="overflow-x-auto text-xs leading-6 text-slate-700">
{`VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_PUBLIC_BASE=/`}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default FirebaseSetupPage;
