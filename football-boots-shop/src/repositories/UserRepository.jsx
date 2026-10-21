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

const userCollection = collection(db, "user");

export const UserRepository = {
  async addUser(user) {
    const docRef = await addDoc(userCollection, user);
    return docRef.id;
  },

  async getUserById(id) {
    const docRef = doc(db, "user", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() };
  },

  getUserInfoFromLocal() {
    const data = localStorage.getItem("userInfo");
    return data ? JSON.parse(data) : null;
  },

  async getAllUsers() {
    const snapshot = await getDocs(userCollection);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async updateUser(id, updatedData) {
    const docRef = doc(db, "user", id);
    await updateDoc(docRef, updatedData);
  },

  async deleteUser(id) {
    const docRef = doc(db, "user", id);
    await deleteDoc(docRef);
  },

  async login(username, password) {
    const q = query(
      userCollection,
      where("username", "==", username)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      for (const doc of querySnapshot.docs) {
        const storedPw = doc.get("password");
        if (storedPw === password) {
          return { id: doc.id, ...doc.data() };
        }
      }
      return 1;
    } else {
      return 2;
    }
  },

  async getAllUsersByRole(role) {
    const docSnap = query(
      userCollection,
      where("vaitro", "==", role)
    );
    const snapshot = await getDocs(docSnap);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },
};

export default UserRepository;
