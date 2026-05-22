import { useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import { createInitialAccess, loginWithEmail } from "../../services/authService";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";

function LoginPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombreCompleto: "Administrador Nova Salud",
      email: "admin@novasalud.pe",
      password: "123456789",
    },
  });

  const onSubmit = async (values) => {
    try {
      setSubmitting(true);
      await loginWithEmail(values);
      Swal.fire({
        icon: "success",
        title: "Bienvenido",
        text: "Acceso concedido al panel de Nova Salud.",
        timer: 1600,
        showConfirmButton: false,
      });
      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "No se pudo iniciar sesion",
        text: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateAccess = async () => {
    const values = getValues();

    if (!values.email || !values.password) {
      Swal.fire({
        icon: "warning",
        title: "Completa los datos",
        text: "Ingresa nombre, correo y contrasena para crear el acceso inicial.",
      });
      return;
    }

    try {
      setSubmitting(true);
      await createInitialAccess(values);
      Swal.fire({
        icon: "success",
        title: "Acceso inicial creado",
        text: "El usuario ya existe en Authentication y su perfil fue guardado en Firestore.",
      });
      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "No se pudo crear el acceso",
        text: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">Acceso seguro</p>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">Gestiona la botica desde un solo lugar</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Ingresa con tu cuenta corporativa para acceder al dashboard, inventario, ventas y reportes.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <InputField
            label="Nombre completo"
            register={register("nombreCompleto", { required: "Nombre obligatorio" })}
            error={errors.nombreCompleto?.message}
          />
          <InputField
            label="Correo"
            type="email"
            register={register("email", { required: "Correo obligatorio" })}
            error={errors.email?.message}
          />
          <InputField
            label="Contrasena"
            type="password"
            register={register("password", { required: "Contrasena obligatoria" })}
            error={errors.password?.message}
          />
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Validando..." : "Iniciar sesion"}
          </Button>
          <Button type="button" variant="secondary" className="w-full" disabled={submitting} onClick={handleCreateAccess}>
            Crear acceso inicial
          </Button>
        </form>
        <p className="mt-4 text-xs leading-6 text-slate-500">
          `Iniciar sesion` usa Firebase Authentication. `Crear acceso inicial` crea la cuenta y guarda el perfil en
          `usuarios` de Firestore.
        </p>
      </div>
    </AuthLayout>
  );
}

export default LoginPage;
