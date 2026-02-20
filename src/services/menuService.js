import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

const COLLECTION_NAME = "menu";

export const menuService = {
    // Get all menu items
    async getMenuItems() {
        try {
            const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error("Error fetching menu items:", error);
            throw error;
        }
    },

    // Get items by category
    async getItemsByCategory(category) {
        try {
            const q = query(collection(db, COLLECTION_NAME), where("category", "==", category));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error("Error fetching category items:", error);
            throw error;
        }
    },

    // Add a new menu item
    async addMenuItem(item) {
        try {
            const docRef = await addDoc(collection(db, COLLECTION_NAME), item);
            return { id: docRef.id, ...item };
        } catch (error) {
            console.error("Error adding menu item:", error);
            throw error;
        }
    },

    // Seed initial data if database is empty
    async seedDatabase(initialData) {
        try {
            // First check if we can even read - this helps diagnose permission issues early
            const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));

            if (querySnapshot.empty) {
                console.log("Database is empty. Seeding initial data...");
                for (const item of initialData) {
                    await this.addMenuItem(item);
                }
                return true;
            }
            return false;
        } catch (error) {
            if (error.code === 'permission-denied') {
                console.warn("Firestore permissions denied. Please check your rules in the Firebase Console.");
            } else {
                console.error("Error during database seeding:", error);
            }
            return false;
        }
    }
};
