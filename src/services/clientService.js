import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { COLLECTIONS } from "../firebase/collections";
import { db } from "../firebase/config";

const clientsRef = collection(db, COLLECTIONS.clientes);

export async function getClients() {
  const snapshot = await getDocs(query(clientsRef, orderBy("createdAt", "desc")));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function createClient(payload) {
  return addDoc(clientsRef, {
    ...payload,
    createdAt: serverTimestamp(),
  });
}

export async function updateClient(id, payload) {
  await updateDoc(doc(db, COLLECTIONS.clientes, id), payload);
}

export async function deleteClient(id) {
  await deleteDoc(doc(db, COLLECTIONS.clientes, id));
}
