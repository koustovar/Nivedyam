import { useState, useEffect } from "react";
import { collection, query, onSnapshot, where, orderBy } from "firebase/firestore";
import { db } from "../../config/firebase";
import { billService } from "../../services/billService";
import { Receipt, Plus, ChevronRight, User, Hash, Clock, CheckCircle2 } from "lucide-react";
import { Card } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

const Billing = () => {
    const [unbilledOrders, setUnbilledOrders] = useState([]);
    const [bills, setBills] = useState([]);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState("unbilled"); // 'unbilled' or 'history'

    useEffect(() => {
        // Subscribe to unbilled orders
        const ordersQuery = query(
            collection(db, "orders"),
            where("status", "in", ["ready", "served", "delivered"]),
            orderBy("timestamp", "desc")
        );

        const unsubscribeOrders = onSnapshot(ordersQuery, (snapshot) => {
            const ordersData = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(order => !order.billId); // double check locally
            setUnbilledOrders(ordersData);
            setLoading(false);
        });

        // Subscribe to bills
        const unsubscribeBills = billService.subscribeToAllBills((data) => {
            setBills(data);
        });

        return () => {
            unsubscribeOrders();
            unsubscribeBills();
        };
    }, []);

    const toggleOrderSelection = (orderId) => {
        setSelectedOrders(prev =>
            prev.includes(orderId)
                ? prev.filter(id => id !== orderId)
                : [...prev, orderId]
        );
    };

    const handleCreateBill = async () => {
        if (selectedOrders.length === 0) return;

        const ordersToBill = unbilledOrders.filter(o => selectedOrders.includes(o.id));
        const firstOrder = ordersToBill[0];

        const billData = {
            orderIds: selectedOrders,
            userId: firstOrder.userId || null,
            customerName: firstOrder.customerDetails?.name || (firstOrder.userId ? "Registered User" : "Guest"),
            customerPhone: firstOrder.customerDetails?.phone || "",
            tableId: firstOrder.tableId || null,
            items: ordersToBill.flatMap(o => o.items),
            subtotal: ordersToBill.reduce((sum, o) => sum + (o.subtotal || 0), 0),
            gst: ordersToBill.reduce((sum, o) => sum + (o.gst || 0), 0),
            total: ordersToBill.reduce((sum, o) => sum + (o.totalAmount || o.total || 0), 0),
        };

        try {
            await billService.createBill(billData);
            setSelectedOrders([]);
            alert("Bill generated and sent to user!");
        } catch (error) {
            console.error("Failed to create bill:", error);
            alert("Error creating bill. Check console.");
        }
    };

    // Grouping unbilled orders by table/session could be better, but for now simple list
    // Actually let's group by tableId if it exists
    const groupedOrders = unbilledOrders.reduce((acc, order) => {
        const key = order.tableId ? `Table ${order.tableId}` : order.customerDetails?.name || "Other";
        if (!acc[key]) acc[key] = [];
        acc[key].push(order);
        return acc;
    }, {});

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-saffron border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex space-x-4 mb-6">
                <button
                    onClick={() => setView("unbilled")}
                    className={`px-6 py-2 rounded-xl font-bold transition-all ${view === "unbilled" ? "bg-saffron text-black shadow-lg shadow-saffron/20" : "bg-white/5 text-white/40"}`}
                >
                    Unbilled Orders
                </button>
                <button
                    onClick={() => setView("history")}
                    className={`px-6 py-2 rounded-xl font-bold transition-all ${view === "history" ? "bg-saffron text-black shadow-lg shadow-saffron/20" : "bg-white/5 text-white/40"}`}
                >
                    Bill History
                </button>
            </div>

            {view === "unbilled" ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Orders List */}
                    <div className="lg:col-span-2 space-y-6">
                        {Object.entries(groupedOrders).length === 0 ? (
                            <Card className="p-12 text-center border-white/5 bg-charcoal/20">
                                <Receipt className="mx-auto text-white/10 mb-4" size={48} />
                                <p className="text-white/40">No orders ready for billing.</p>
                            </Card>
                        ) : (
                            Object.entries(groupedOrders).map(([group, orders]) => (
                                <div key={group} className="space-y-4">
                                    <h3 className="text-lg font-serif font-bold text-gold underline underline-offset-8 decoration-gold/20">{group}</h3>
                                    <div className="grid gap-4">
                                        {orders.map(order => (
                                            <Card
                                                key={order.id}
                                                className={`p-5 transition-all cursor-pointer border-white/5 bg-charcoal/30 flex items-center justify-between ${selectedOrders.includes(order.id) ? 'ring-2 ring-saffron bg-saffron/5' : 'hover:bg-white/5'}`}
                                                onClick={() => toggleOrderSelection(order.id)}
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedOrders.includes(order.id) ? 'bg-saffron border-saffron' : 'border-white/10'}`}>
                                                        {selectedOrders.includes(order.id) && <CheckCircle2 size={12} className="text-black" />}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-white/90">#{order.id.slice(-6).toUpperCase()}</p>
                                                        <p className="text-xs text-white/40">{order.items?.map(i => `${i.quantity}x ${i.name}`).join(", ")}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-black text-gold">₹{order.totalAmount || order.total}</p>
                                                    <p className="text-[10px] text-white/30 uppercase">{order.status}</p>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Bill Generation Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-12">
                            <Card className="p-8 border-white/5 bg-charcoal/40 backdrop-blur-xl">
                                <h3 className="text-xl font-bold mb-6 flex items-center">
                                    <Receipt className="mr-3 text-saffron" size={24} />
                                    Generate Bill
                                </h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/40">Selected Orders</span>
                                        <span className="text-white font-bold">{selectedOrders.length}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/40">Subtotal</span>
                                        <span className="text-white font-bold">₹{unbilledOrders.filter(o => selectedOrders.includes(o.id)).reduce((sum, o) => sum + (o.subtotal || 0), 0)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm border-t border-white/5 pt-4">
                                        <span className="text-white/40">Grand Total</span>
                                        <span className="text-2xl font-black text-gold">₹{unbilledOrders.filter(o => selectedOrders.includes(o.id)).reduce((sum, o) => sum + (o.totalAmount || o.total || 0), 0)}</span>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleCreateBill}
                                    disabled={selectedOrders.length === 0}
                                    className="w-full h-14 rounded-2xl bg-saffron text-black font-black disabled:opacity-50 disabled:grayscale transition-all"
                                >
                                    Create and Send Bill
                                </Button>
                            </Card>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid gap-4">
                    {bills.length === 0 ? (
                        <Card className="p-12 text-center border-white/5 bg-charcoal/20">
                            <Clock className="mx-auto text-white/10 mb-4" size={48} />
                            <p className="text-white/40">No bill history found.</p>
                        </Card>
                    ) : (
                        bills.map(bill => (
                            <Card key={bill.id} className="p-6 border-white/5 bg-charcoal/30 flex items-center justify-between group hover:bg-white/[0.05] transition-all">
                                <div className="flex items-center space-x-6">
                                    <div className={`p-3 rounded-2xl ${bill.status === 'paid' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                        <Receipt size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <span className="font-mono text-xs text-white/20 uppercase tracking-tighter">#{bill.id.slice(-8)}</span>
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${bill.status === 'paid' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                                {bill.status}
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-white/80">{bill.customerName || "Guest"}</h4>
                                        <p className="text-[10px] text-white/30 uppercase tracking-widest">{bill.tableId ? `Table ${bill.tableId}` : 'Delivery'} • {new Date(bill.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-black text-gold">₹{bill.total}</p>
                                    <button className="text-[10px] font-bold text-saffron uppercase tracking-widest hover:underline mt-1">View Details</button>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Billing;
