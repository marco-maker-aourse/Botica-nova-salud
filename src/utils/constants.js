import { FaBoxOpen, FaChartLine, FaFileInvoiceDollar, FaUsers } from "react-icons/fa6";

export const APP_NAME = "Nova Salud";

export const ROLES = {
  ADMIN: "admin",
  SELLER: "vendedor",
};

export const PAYMENT_METHODS = ["Efectivo", "Yape", "Plin", "Tarjeta", "Transferencia"];

export const PRODUCT_STATUS = ["activo", "inactivo"];

export const SIDEBAR_LINKS = [
  { to: "/dashboard", label: "Dashboard", icon: FaChartLine },
  { to: "/productos", label: "Productos", icon: FaBoxOpen },
  { to: "/ventas", label: "Ventas", icon: FaFileInvoiceDollar },
  { to: "/clientes", label: "Clientes", icon: FaUsers },
  { to: "/reportes", label: "Reportes", icon: FaChartLine },
  { to: "/configuracion", label: "Configuracion", icon: FaUsers },
];
