import { createContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "../firebase/config";
import { COLLECTIONS } from "../firebase/collections";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth || !db) {
      setLoading(false);
      return () => {};
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (!firebaseUser) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const userRef = doc(db, COLLECTIONS.usuarios, firebaseUser.uid);
      const snapshot = await getDoc(userRef);
      const profileData = snapshot.exists()
        ? { id: snapshot.id, uid: firebaseUser.uid, ...snapshot.data() }
        : {
            uid: firebaseUser.uid,
            nombreCompleto: firebaseUser.displayName || "Usuario",
            correo: firebaseUser.email,
            rol: "vendedor",
            estado: "activo",
          };

      setProfile(profileData);

      if (snapshot.exists()) {
        await updateDoc(userRef, {
          ultimoAcceso: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      isFirebaseConfigured,
      isAuthenticated: Boolean(user),
      logout: () => (auth ? signOut(auth) : Promise.resolve()),
    }),
    [user, profile, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
