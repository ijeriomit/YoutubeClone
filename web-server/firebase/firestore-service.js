// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  query,
  collection,
  getFirestore,
  getDocs,
  where,
  addDoc,
} from "firebase/firestore";
export default class FireStoreService {
  #firebaseConfig = {
    apiKey: "AIzaSyBO-d7GVIbi1T6d-sWiKNs3Z4L7V-AgHJI",
    authDomain: "upstartinterviewdatabase.firebaseapp.com",
    projectId: "upstartinterviewdatabase",
    storageBucket: "upstartinterviewdatabase.firebasestorage.app",
    messagingSenderId: "60058567450",
    appId: "1:60058567450:web:6c73dcb96fe5f21048a2a3",
    measurementId: "G-S6GSY8P1QD",
  };
  #firebaseApp = null;
  #firebaseDataBase = null;
  #collections = new Map();

  constructor(apiKey = "", appId = "", projectId = "") {
    this.#firebaseConfig = {
      apiKey,
      appId,
      projectId,
      ...this.#firebaseConfig,
    };
    this.#firebaseApp = initializeApp(this.#firebaseConfig);
    this.#firebaseDataBase = getFirestore(this.#firebaseApp);
    console.log("Filestore Database Initialized");
  }

  getCollectionRef(collectionName) {
    this.#updateCollectionMap(collectionName);
    return this.#collections.get(collectionName);
  }
  async fetchCollectionData(collectionName) {
    let collectionData = null;
    this.#updateCollectionMap(collectionName);
    try {
      collectionData = await getDocs(
        this.#collections.get(collectionName)
        // collection(this.#firebaseDataBase, collectionName)
      );
    } catch (e) {
      console.error("Error Fetching Collection Data", e);
    }
    return collectionData;
  }

  #updateCollectionMap(collectionName) {
    if (!this.#collections.has(collectionName)) {
      this.#collections.set(
        collectionName,
        collection(this.#firebaseDataBase, collectionName)
      );
    }
  }

  async addDataToCollection(collectionName, data) {
    this.#updateCollectionMap(collectionName);
    const collectionRef = this.#collections.get(collectionName);
    try {
      await addDoc(collectionRef, { ...data });
      console.log("Added Data to Collection", data);
    } catch (e) {
      console.error(`Error Adding Data to Collection: ${collectionRef.id}`, e);
    }
  }

  async queryCollection(collectionName, param1, op, param2) {
    const queryData = [];
    this.#updateCollectionMap(collectionName);
    const queryRef = query(
      this.#collections.get(collectionName),
      where(param1, op, param2)
    );
    try {
      const docs = await getDocs(queryRef);
      docs.forEach((doc) => {
        queryData.push(doc.data());
      });
    } catch (e) {
      console.error(`Error querying collection ${collectionName}`, e);
    }
    return queryData;
  }
}
