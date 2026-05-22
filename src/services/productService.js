import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { COLLECTIONS } from "../firebase/collections";
import { db, storage } from "../firebase/config";

const productsRef = collection(db, COLLECTIONS.productos);

export async function getProducts(filters = {}) {
  const constraints = [orderBy("createdAt", "desc")];

  if (filters.estado && filters.estado !== "todos") {
    constraints.push(where("estado", "==", filters.estado));
  }

  const snapshot = await getDocs(query(productsRef, ...constraints));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function getProductById(id) {
  const snapshot = await getDoc(doc(db, COLLECTIONS.productos, id));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

async function uploadProductImage(file) {
  if (!file) return "";
  const imageRef = ref(storage, `productos/${Date.now()}-${file.name}`);
  await uploadBytes(imageRef, file);
  return getDownloadURL(imageRef);
}

export async function createProduct(payload) {
  const image = await uploadProductImage(payload.imagenFile);
  const body = {
    ...payload,
    imagen: image,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  delete body.imagenFile;
  return addDoc(productsRef, body);
}

export async function updateProduct(id, payload) {
  const image = payload.imagenFile ? await uploadProductImage(payload.imagenFile) : payload.imagen;
  const body = {
    ...payload,
    imagen: image,
    updatedAt: serverTimestamp(),
  };

  delete body.imagenFile;
  await updateDoc(doc(db, COLLECTIONS.productos, id), body);
}

export async function deleteProduct(id) {
  await deleteDoc(doc(db, COLLECTIONS.productos, id));
}
