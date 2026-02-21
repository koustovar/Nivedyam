import { useState, useEffect } from "react";
import { collection, query, onSnapshot, orderBy, updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { ShoppingBag, Utensils, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { motion, AnimatePresence } from "framer-motion";

const LiveOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "orders"), orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const ordersData = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(order => order.status !== "billed" && order.status !== "cancelled");
            setOrders(ordersData);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await updateDoc(doc(db, "orders", orderId), {
                status: newStatus
            });
        } catch (error) {
            console.error("Error updating order:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-saffron border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold flex items-center">
                    Live Order Monitor
                    <span className="ml-3 px-2 py-0.5 bg-red-500/10 text-red-500 text-[10px] rounded-full animate-pulse">LIVE</span>
                </h2>
                <div className="text-white/40 text-sm">
                    {orders.length} orders total
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <AnimatePresence>
                    {orders.length === 0 ? (
                        <Card className="p-12 text-center border-white/5 bg-charcoal/20">
                            <ShoppingBag className="mx-auto text-white/10 mb-4" size={48} />
                            <p className="text-white/40">No live orders at the moment.</p>
                        </Card>
                    ) : (
                        orders.map((order) => (
                            <motion.div
                                key={order.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                <Card className="border-white/5 bg-charcoal/30 overflow-hidden group">
                                    <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex-grow">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <span className="font-mono text-xs text-white/30">#{order.id.slice(-6).toUpperCase()}</span>
                                                {order.tableId ? (
                                                    <span className="bg-gold/10 text-gold text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center">
                                                        <Utensils size={10} className="mr-1" /> Table {order.tableId}
                                                    </span>
                                                ) : (
                                                    <span className="bg-blue-500/10 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center">
                                                        <ShoppingBag size={10} className="mr-1" /> Delivery
                                                    </span>
                                                )}
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${order.status === 'pending' ? 'bg-orange-500/10 text-orange-500' :
                                                    order.status === 'preparing' ? 'bg-blue-500/10 text-blue-500' :
                                                        'bg-green-500/10 text-green-500'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <div className="text-white/80 font-medium mb-1">
                                                {order.items?.map(item => `${item.quantity}x ${item.name}`).join(", ") || "No items"}
                                            </div>
                                            <div className="flex items-center text-white/30 text-xs">
                                                <Clock size={12} className="mr-1" />
                                                {order.timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || "Just now"}
                                                <span className="mx-2">•</span>
                                                ₹{order.totalAmount}
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            {order.status === 'pending' && (
                                                <button
                                                    onClick={() => updateOrderStatus(order.id, 'preparing')}
                                                    className="px-4 py-2 bg-blue-500/10 text-blue-500 rounded-xl text-xs font-bold hover:bg-blue-500/20 transition-all active:scale-95"
                                                >
                                                    Start Preparing
                                                </button>
                                            )}
                                            {order.status === 'preparing' && (
                                                <button
                                                    onClick={() => updateOrderStatus(order.id, 'ready')}
                                                    className="px-4 py-2 bg-green-500/10 text-green-500 rounded-xl text-xs font-bold hover:bg-green-500/20 transition-all active:scale-95"
                                                >
                                                    Mark as Ready
                                                </button>
                                            )}
                                            <button className="p-2 bg-white/5 text-white/30 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all">
                                                <XCircle size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default LiveOrders;
