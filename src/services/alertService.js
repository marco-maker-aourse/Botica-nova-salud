import { addDoc, collection, getDocs, orderBy, query, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { COLLECTIONS } from "../firebase/collections";
import { db } from "../firebase/config";

const alertsRef = collection(db, COLLECTIONS.alertas);

export async function getAlerts() {
  const snapshot = await getDocs(query(alertsRef, orderBy("fecha", "desc")));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function createAlert(payload) {
  await addDoc(alertsRef, {
    ...payload,
    leido: false,
    fecha: serverTimestamp(),
  });
}

export async function markAlertAsRead(id) {
  await updateDoc(doc(db, COLLECTIONS.alertas, id), { leido: true });
}
