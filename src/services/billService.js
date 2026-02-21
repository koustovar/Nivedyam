import { collection, addDoc, updateDoc, doc, query, where, getDocs, onSnapshot, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";

const COLLECTION_NAME = "bills";

export const billService = {
    // Create a new bill from orders
    async createBill(billData) {
        try {
            const docRef = await addDoc(collection(db, COLLECTION_NAME), {
                ...billData,
                status: "unpaid",
                timestamp: serverTimestamp(),
                createdAt: new Date().toISOString()
            });

            // Update all included orders with the billId
            for (const orderId of billData.orderIds) {
                await updateDoc(doc(db, "orders", orderId), {
                    billId: docRef.id,
                    status: "billed"
                });
            }

            return { id: docRef.id, ...billData };
        } catch (error) {
            console.error("Error creating bill:", error);
            throw error;
        }
    },

    // Get bills for a specific user
    async getUserBills(userId) {
        try {
            const q = query(
                collection(db, COLLECTION_NAME),
                where("userId", "==", userId),
                orderBy("timestamp", "desc")
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error("Error fetching user bills:", error);
            throw error;
        }
    },

    // Subscribe to all bills (for admin)
    subscribeToAllBills(callback) {
        const q = query(collection(db, COLLECTION_NAME), orderBy("timestamp", "desc"));
        return onSnapshot(q, (snapshot) => {
            const billsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            callback(billsData);
        });
    },

    // Mark bill as paid
    async markAsPaid(billId, paymentId) {
        try {
            await updateDoc(doc(db, COLLECTION_NAME, billId), {
                status: "paid",
                paymentId: paymentId,
                paidAt: serverTimestamp()
            });
            return true;
        } catch (error) {
            console.error("Error marking bill as paid:", error);
            throw error;
        }
    }
};
