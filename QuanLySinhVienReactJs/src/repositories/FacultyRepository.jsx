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

const facultyCollection = collection(db, "khoa");

export const FacultyRepository = {
  async getFaculty(faculty) {
    const docRef = doc(db, "khoa", String(faculty));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log(docSnap.data().ten);
      return { khoa: docSnap.data().ten };
    } else {
      return null;
    }
  },

  async getAllFaculties() {
    const snapshot = await getDocs(facultyCollection);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },
};
