import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
    ShoppingBag,
    DollarSign,
    Users,
    Clock,
    TrendingUp
} from "lucide-react";
import { collection, query, onSnapshot, where, Timestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Card, CardContent } from "../../components/ui/Card";

const StatCard = ({ title, value, icon: Icon, color, trend }) => {
    const colorMap = {
        gold: "bg-gold/10 text-gold",
        saffron: "bg-saffron/10 text-saffron",
        blue: "bg-blue-500/10 text-blue-400",
        green: "bg-green-500/10 text-green-400",
    };

    return (
        <Card className="border-white/5 bg-charcoal/30">
            <CardContent className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-white/40 text-sm font-medium mb-1">{title}</p>
                        <h3 className="text-2xl font-bold">{value}</h3>
                        {trend && (
                            <p className="text-[10px] mt-2 flex items-center text-green-500 font-bold uppercase tracking-wider">
                                <TrendingUp size={12} className="mr-1" /> {trend}
                            </p>
                        )}
                    </div>
                    <div className={`p-3 rounded-xl ${colorMap[color] || "bg-white/5 text-white"}`}>
                        <Icon size={24} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const DashboardOverview = () => {
    const [stats, setStats] = useState({
        todayRevenue: 0,
        todayOrders: 0,
        activeTables: 0,
        avgServingTime: "18m",
    });

    useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const q = query(
            collection(db, "orders"),
            where("timestamp", ">=", Timestamp.fromDate(today))
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            let revenue = 0;
            let orders = 0;
            snapshot.docs.forEach(doc => {
                const data = doc.data();
                revenue += data.totalAmount || 0;
                orders += 1;
            });

            setStats(prev => ({
                ...prev,
                todayRevenue: revenue,
                todayOrders: orders
            }));
        });

        return unsubscribe;
    }, []);

    const statItems = [
        { title: "Today's Revenue", value: `₹${stats.todayRevenue.toLocaleString()}`, icon: DollarSign, color: "gold", trend: "+12% from yesterday" },
        { title: "Total Orders", value: stats.todayOrders.toString(), icon: ShoppingBag, color: "saffron", trend: "Active sessions" },
        { title: "Active Tables", value: "8/20", icon: Users, color: "blue", trend: "High occupancy" },
        { title: "Avg. Serving Time", value: stats.avgServingTime, icon: Clock, color: "green", trend: "Optimized" },
    ];

    return (
        <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statItems.map((stat, i) => (
                    <StatCard key={i} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Placeholder for Revenue Chart */}
                <Card className="border-white/5 bg-charcoal/30 h-[400px] flex items-center justify-center">
                    <div className="text-center">
                        <TrendingUp size={48} className="mx-auto text-white/5 mb-4" />
                        <p className="text-white/20 font-bold uppercase tracking-[0.3em]">Revenue Performance</p>
                        <p className="text-white/10 text-xs mt-2">Chart integration pending</p>
                    </div>
                </Card>

                {/* Popular Dishes */}
                <Card className="border-white/5 bg-charcoal/30 p-8">
                    <h3 className="text-xl font-bold mb-6">Popular Dishes</h3>
                    <div className="space-y-6">
                        {[
                            { name: "Paneer Makhani", orders: 45, color: "bg-gold" },
                            { name: "Dal Nivedyam", orders: 38, color: "bg-saffron" },
                            { name: "Murgh Malai", orders: 32, color: "bg-blue-400" },
                        ].map((dish, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-bold text-white/80">{dish.name}</span>
                                    <span className="text-white/40">{dish.orders} orders</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(dish.orders / 50) * 100}%` }}
                                        className={`h-full ${dish.color}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default DashboardOverview;
