import {
  addDoc,
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { COLLECTIONS } from "../firebase/collections";
import { db } from "../firebase/config";
import { createAlert } from "./alertService";

const salesRef = collection(db, COLLECTIONS.ventas);

export async function getSales() {
  const snapshot = await getDocs(query(salesRef, orderBy("fechaVenta", "desc")));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function createSale(payload, currentUser) {
  const stockAlerts = [];
  const saleData = {
    ...payload,
    usuarioId: currentUser.uid,
    usuarioNombre: currentUser.nombreCompleto,
    fechaVenta: serverTimestamp(),
    estado: "completada",
  };

  await runTransaction(db, async (transaction) => {
    for (const item of payload.productos) {
      const productRef = doc(db, COLLECTIONS.productos, item.productoId);
      const productSnap = await transaction.get(productRef);

      if (!productSnap.exists()) {
        throw new Error(`Producto no encontrado: ${item.nombre}`);
      }

      const productData = productSnap.data();
      const nextStock = Number(productData.stock || 0) - Number(item.cantidad || 0);

      if (nextStock < 0) {
        throw new Error(`Stock insuficiente para ${item.nombre}`);
      }

      transaction.update(productRef, {
        stock: increment(-Number(item.cantidad || 0)),
        updatedAt: serverTimestamp(),
      });

      transaction.set(doc(collection(db, COLLECTIONS.movimientosInventario)), {
        productoId: item.productoId,
        productoNombre: item.nombre,
        tipoMovimiento: "salida",
        motivo: "venta",
        cantidad: item.cantidad,
        stockAnterior: productData.stock,
        stockNuevo: nextStock,
        usuarioId: currentUser.uid,
        fecha: serverTimestamp(),
      });

      if (nextStock <= Number(productData.stockMinimo || 0)) {
        stockAlerts.push({
          productoId: item.productoId,
          tipo: "stock_critico",
          mensaje: `${item.nombre} alcanzo el stock minimo`,
          prioridad: "alta",
        });
      }
    }

    transaction.set(doc(salesRef), saleData);
  });

  await Promise.all(stockAlerts.map((alert) => createAlert(alert)));
}
