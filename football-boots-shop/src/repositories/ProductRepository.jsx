import React from "react";
import { db } from "../firebase";
import {
  collection, // Truy cap vao collection
  doc, // Lay 1 document de doc, sua, xoa
  addDoc, // Them
  getDocs, // Lay toan bo
  getDoc, // Lay 1
  updateDoc, // Cap nhat
  deleteDoc, // Xoa
  query, // Truy van
  where,
  orderBy,
  limit,
  startAt,
  endAt,
} from "firebase/firestore";

/**
 * Lọc sản phẩm từ Firestore theo các bộ lọc
 * @param {{
 * brand?: number,
 * type1?: string,
 * type2?: string,
 * size?: number,
 * pack?: string,
 * surface?: number,
 * ankle?: number,
 * player?: number,
 * minPrice?: number,
 * maxPrice?: number }} filters
 *
 * @returns {Promise<Array>} danh sách sản phẩm
 */

const productCollection = collection(db, "product");

export const ProductRepository = {
  async addProduct(product) {
    const docRef = await addDoc(productCollection, product);
    return docRef.id;
  },

  async getProductById(id) {
    const docRef = doc(db, "product", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() };
  },

  async getAllProducts() {
    const snapshot = await getDocs(productCollection);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async getFilteredProducts(filters) {
    let q = collection(db, "products");
    const conditions = [];

    if (filters.brand !== undefined)
      conditions.push(where("brand", "==", filters.brand));
    if (filters.type1)
      conditions.push(where("type1", "==", filters.type1));
    if (filters.type2)
      conditions.push(where("type2", "==", filters.type2));
    if (filters.size !== undefined)
      conditions.push(where("size", "==", filters.size));
    if (filters.pack)
      conditions.push(where("pack", "==", filters.pack));
    if (filters.surface !== undefined)
      conditions.push(
        where("surface", "==", filters.surface)
      );
    if (filters.ankle !== undefined)
      conditions.push(where("ankle", "==", filters.ankle));
    if (filters.player !== undefined)
      conditions.push(
        where("player", "==", filters.player)
      );
    if (filters.minPrice !== undefined)
      conditions.push(
        where("price", ">=", filters.minPrice)
      );
    if (filters.maxPrice !== undefined)
      conditions.push(
        where("price", "<=", filters.maxPrice)
      );

    if (conditions.length > 0) {
      q = query(q, ...conditions);
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async updateProduct(id, updatedData) {
    const docRef = doc(db, "product", id);
    await updateDoc(docRef, updatedData);
  },

  async deleteProduct(id) {
    const docRef = doc(db, "product", id);
    await deleteDoc(docRef);
  },
};

export default ProductRepository;
