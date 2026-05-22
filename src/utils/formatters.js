import { format } from "date-fns";

export const formatCurrency = (value = 0) =>
  new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  }).format(Number(value || 0));

export const formatDate = (value, pattern = "dd/MM/yyyy") => {
  if (!value) return "--";
  const date = value?.toDate ? value.toDate() : new Date(value);
  return format(date, pattern);
};

export const formatCompactNumber = (value = 0) =>
  new Intl.NumberFormat("es-PE", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Number(value || 0));
