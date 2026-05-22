# Proyecto Final SENATI

## Titulo

Sistema Web de Gestion de Inventario y Ventas para la Botica Nova Salud

## Introduccion

El presente proyecto desarrolla una solucion web empresarial para optimizar los procesos operativos de la botica Nova Salud. La propuesta integra control de inventario, registro de ventas, gestion de clientes, alertas automaticas y reportes administrativos en una sola plataforma accesible desde navegador. La implementacion se ha construido con tecnologias modernas y escalables orientadas a entornos reales de negocio.

## Problemática

Nova Salud realiza actualmente el control de inventario y ventas de forma manual. Esta metodologia ocasiona errores en el stock de medicamentos, desabastecimiento frecuente, demoras en la atencion, baja trazabilidad de operaciones, riesgo de perdida de informacion y ausencia de reportes para la toma de decisiones. Estas limitaciones impactan directamente en la productividad del negocio y en la experiencia del cliente final.

## Objetivo general

Desarrollar un sistema web moderno que permita gestionar inventario, ventas, clientes, alertas y reportes en tiempo real para mejorar la eficiencia operativa de la botica Nova Salud.

## Objetivos especificos

- Implementar autenticacion segura con control de acceso por roles.
- Gestionar productos con informacion completa de stock, vencimiento, proveedor e imagen.
- Registrar ventas con actualizacion automatica de inventario.
- Administrar clientes para mejorar seguimiento comercial.
- Generar alertas por stock critico y productos proximos a vencer.
- Presentar reportes visuales para apoyar la toma de decisiones.

## Justificacion

La digitalizacion del proceso operativo es necesaria para reducir errores humanos, acelerar la atencion al cliente y fortalecer el control administrativo. El uso de React y Firebase permite una arquitectura moderna, escalable y de bajo mantenimiento, ideal para una botica que requiere acceso web, disponibilidad continua y crecimiento progresivo.

## Propuesta de solucion

Se plantea una aplicacion web responsive con interfaz corporativa, panel administrativo y modulos especializados. El sistema utiliza Firebase Authentication para la seguridad, Cloud Firestore como base de datos NoSQL, Storage para imagenes de productos y una arquitectura frontend desacoplada desarrollada con React 19 y Vite.

## Arquitectura

- Frontend SPA: React 19 + Vite + Tailwind CSS.
- Routing: React Router DOM con rutas protegidas.
- Estado global: AuthContext.
- Persistencia: Firebase Authentication, Firestore y Storage.
- Servicios: capa `services/` para centralizar logica de negocio y consultas.
- Seguridad: reglas Firestore por rol `admin` y `vendedor`.

## Tecnologias usadas

- React 19
- Vite
- Tailwind CSS
- React Router DOM
- React Hook Form
- Framer Motion
- SweetAlert2
- React Icons
- Firebase Authentication
- Cloud Firestore
- Firebase Storage
- Git y GitHub
- GitHub Pages

## Desarrollo del sistema

### Modulo de login

Permite validar credenciales mediante Firebase Authentication, mantener la sesion activa y proteger el acceso al panel interno.

### Modulo dashboard

Concentra indicadores claves como total de productos, ventas del dia, clientes registrados, alertas de stock y grafico de ventas diarias.

### Modulo de productos

Incluye operaciones CRUD, filtros, busqueda, stock minimo, precio de compra, precio de venta, fecha de vencimiento e imagen del producto.

### Modulo de ventas

Integra un carrito dinamico, calculo de subtotal e IGV, descuento de stock mediante transaccion y almacenamiento del historial de ventas.

### Modulo de clientes

Permite registrar y administrar clientes para asociarlos a las ventas y mejorar la atencion comercial.

### Modulo de alertas

Genera notificaciones para productos con stock critico y deja preparada la extension para productos proximos a vencer.

### Modulo de reportes

Presenta ventas por dia, productos mas vendidos, stock critico y lista de vencimientos proximos.

## Evidencias sugeridas para la sustentacion

- Captura de pantalla del login.
- Captura del dashboard con KPIs.
- Captura del CRUD de productos.
- Captura del modulo de ventas con carrito.
- Captura del reporte administrativo.
- Captura de Firestore con colecciones creadas.
- Captura del repositorio GitHub.
- Captura del deploy en GitHub Pages.

## Conclusiones

El sistema propuesto permite transformar un proceso manual e ineficiente en una operacion digital controlada, trazable y escalable. La solucion mejora la administracion del inventario, reduce errores de stock, acelera el registro de ventas y brinda informacion util para decisiones comerciales. La arquitectura basada en React y Firebase ofrece una plataforma moderna y adecuada para un entorno empresarial real.

## Recomendaciones

- Implementar facturacion electronica en una fase posterior.
- Agregar modulo de compras y abastecimiento.
- Automatizar alertas por correo o WhatsApp.
- Incorporar dashboard con filtros por sede o periodo.
- Realizar pruebas funcionales, de rendimiento y seguridad antes del despliegue final.
