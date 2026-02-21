import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";

export const orderService = {
    async createOrder(orderData) {
        try {
            const docRef = await addDoc(collection(db, "orders"), {
                ...orderData,
                status: "pending",
                timestamp: serverTimestamp(),
                createdAt: new Date().toISOString()
            });
            return { id: docRef.id, ...orderData };
        } catch (error) {
            console.error("Error creating order:", error);
            throw error;
        }
    }
};
