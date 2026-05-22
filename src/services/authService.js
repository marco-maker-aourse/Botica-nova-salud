import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { COLLECTIONS } from "../firebase/collections";
import { auth, db } from "../firebase/config";

function mapAuthError(error) {
  const code = error?.code || "";

  if (code === "auth/invalid-credential") {
    return "Credenciales invalidas. Si es tu primer acceso, crea el usuario inicial.";
  }

  if (code === "auth/configuration-not-found") {
    return "Firebase Authentication no esta habilitado. En Firebase Console activa Authentication > Sign-in method > Email/Password.";
  }

  if (code === "auth/email-already-in-use") {
    return "El correo ya existe en Authentication. Intenta iniciar sesion con esa cuenta.";
  }

  if (code === "auth/weak-password") {
    return "La contrasena debe tener al menos 6 caracteres.";
  }

  if (code === "auth/network-request-failed") {
    return "No se pudo conectar con Firebase. Revisa tu internet y la configuracion del proyecto.";
  }

  return error?.message || "Ocurrio un error inesperado durante la autenticacion.";
}

export async function loginWithEmail(credentials) {
  const { email, password } = credentials;
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response.user;
  } catch (error) {
    throw new Error(mapAuthError(error));
  }
}

export async function createInitialAccess({ email, password, nombreCompleto }) {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const user = response.user;

    await setDoc(
      doc(db, COLLECTIONS.usuarios, user.uid),
      {
        uid: user.uid,
        nombreCompleto: nombreCompleto?.trim() || "Administrador Nova Salud",
        correo: email,
        telefono: "",
        rol: "admin",
        fotoPerfil: "",
        estado: "activo",
        ultimoAcceso: serverTimestamp(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );

    return user;
  } catch (error) {
    throw new Error(mapAuthError(error));
  }
}
