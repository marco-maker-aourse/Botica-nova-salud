import clsx from "clsx";

function Button({ children, variant = "primary", className, ...props }) {
  const variants = {
    primary: "bg-brand-500 text-white hover:bg-brand-600",
    secondary: "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200",
    success: "bg-accent-500 text-white hover:bg-accent-600",
    danger: "bg-rose-500 text-white hover:bg-rose-600",
  };

  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold shadow-sm transition duration-200 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
