import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export async function loginWithEmail(credentials) {
  const { email, password } = credentials;
  const response = await signInWithEmailAndPassword(auth, email, password);
  return response.user;
}
