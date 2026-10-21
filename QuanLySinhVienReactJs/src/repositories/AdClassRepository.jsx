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

const adClassCollection = collection(db, "lop");

export const AdClassRepository = {
  async getAdClass(adClass) {
    const docRef = doc(db, "lop", String(adClass));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log(docSnap.data().ten);
      return { lop: docSnap.data().ten };
    } else {
      return null;
    }
  },

  async getAllAdClasses() {
    const snapshot = await getDocs(adClassCollection);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },
};
