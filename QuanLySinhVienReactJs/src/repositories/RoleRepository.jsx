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

export const RoleRepository = {
  async getRole(role) {
    const docRef = doc(db, "vaitro", String(role));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log(docSnap.data().ten);
      return { vaitro: docSnap.data().ten };
    } else {
      return null;
    }
  },
};
