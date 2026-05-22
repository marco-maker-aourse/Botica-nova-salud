# Nova Salud | Sistema Web de Gestion de Inventario y Ventas

Proyecto academico-profesional desarrollado con React 19, Vite, Tailwind CSS y Firebase para digitalizar el control de inventario, ventas y alertas operativas de una botica.

## Arquitectura del proyecto

```text
src/
├── assets/                Recursos visuales, logos e imagenes estaticas
├── components/
│   ├── common/            Componentes transversales como encabezados y estados
│   ├── ui/                Primitivos reutilizables de interfaz
│   ├── dashboard/         Widgets graficos y KPIs del panel principal
│   ├── products/          Formularios y tablas del catalogo
│   ├── sales/             Carrito y tabla de historial de ventas
│   └── alerts/            Panel de alertas automáticas
├── context/               Estado global de autenticacion
├── firebase/              Inicializacion SDK y nombres de colecciones
├── hooks/                 Hooks de acceso rapido al contexto
├── layouts/               Plantillas maestras del login y panel privado
├── pages/
│   ├── auth/              Inicio de sesion
│   ├── dashboard/         Dashboard ejecutivo
│   ├── inventory/         CRUD de productos
│   ├── sales/             Registro e historial de ventas
│   ├── clients/           CRUD de clientes
│   ├── reports/           Reportes administrativos
│   └── settings/          Configuracion y perfil
├── routes/                Router principal y proteccion de rutas
├── services/              Capa de acceso a Firebase y logica de negocio
└── utils/                 Constantes, formateadores y validaciones
```

## Colecciones Firestore

- `usuarios`: perfil, rol, estado y control de acceso.
- `productos`: ficha farmaceutica, stock, vencimiento, precios e imagen.
- `ventas`: comprobante logico de cada operacion comercial.
- `clientes`: base de clientes para historial y fidelizacion.
- `movimientosInventario`: auditoria de entradas y salidas.
- `alertas`: notificaciones por stock critico y vencimientos.
- `categorias`: clasificacion del catalogo.
- `proveedores`: registro de abastecedores.

## Instalacion paso a paso

1. Crear el proyecto en `C:\react\nova-salud-botica`.
2. Abrir terminal en esa carpeta.
3. Instalar dependencias:

```bash
npm install
```

4. Duplicar `.env.example` como `.env` y completar credenciales Firebase.
5. Crear proyecto Firebase y habilitar:
   - Authentication con Email/Password
   - Cloud Firestore
   - Storage
6. Publicar reglas:

```bash
firebase deploy --only firestore:rules,firestore:indexes
```

7. Ejecutar entorno local:

```bash
npm run dev
```

## Funcionalidades incluidas

- Login seguro con Firebase Authentication.
- Persistencia de sesion y rutas protegidas.
- Dashboard ejecutivo con KPIs y grafico de ventas.
- CRUD de productos con imagen en Firebase Storage.
- Modulo de ventas con carrito y descuento de stock por transaccion.
- CRUD de clientes.
- Alertas automaticas por stock minimo.
- Reportes de ventas y productos mas vendidos.
- Reglas Firestore con control por roles `admin` y `vendedor`.

## Git y GitHub

```bash
git init
git add .
git commit -m "feat: setup nova salud inventory and sales platform"
git branch -M main
git remote add origin https://github.com/tu-usuario/nova-salud-botica.git
git push -u origin main
```

Buenas practicas recomendadas:

- `main`: rama estable.
- `develop`: integracion interna.
- `feature/*`: nuevas funcionalidades.
- Commits semanticos: `feat`, `fix`, `refactor`, `docs`, `style`, `chore`.

## Deploy en GitHub Pages

1. Ajustar `VITE_PUBLIC_BASE=/nombre-del-repo/` en `.env`.
2. Instalar dependencias.
3. Ejecutar:

```bash
npm run deploy
```

4. En GitHub, activar GitHub Pages sobre la rama `gh-pages`.

## Deploy opcional en Firebase Hosting

```bash
firebase init hosting
firebase deploy --only hosting
```

## Credenciales de ejemplo sugeridas

- `admin@novasalud.pe`
- `vendedor@novasalud.pe`

## Documentacion academica

La documentacion lista para SENATI se encuentra en [docs/documentacion-senati.md](C:/react/nova-salud-botica/docs/documentacion-senati.md).
