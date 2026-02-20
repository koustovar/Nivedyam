import { useState, useEffect } from "react";
import { collection, query, onSnapshot, updateDoc, doc, orderBy } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Calendar as CalendarIcon, Users, Clock, CheckCircle2, XCircle, MoreVertical } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { motion, AnimatePresence } from "framer-motion";

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "bookings"), orderBy("date", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setBookings(data);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const updateStatus = async (id, status) => {
        await updateDoc(doc(db, "bookings", id), { status });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-saffron border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Table Reservations</h2>
                    <p className="text-white/40 text-sm">Manage upcoming guest visits</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <AnimatePresence>
                    {bookings.length === 0 ? (
                        <Card className="p-12 text-center border-white/5 bg-charcoal/20">
                            <CalendarIcon className="mx-auto text-white/10 mb-4" size={48} />
                            <p className="text-white/40">No reservations found.</p>
                        </Card>
                    ) : (
                        bookings.map((booking) => (
                            <motion.div
                                key={booking.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                <Card className="border-white/5 bg-charcoal/30 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-white/10 transition-all">
                                    <div className="flex items-center space-x-6">
                                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex flex-col items-center justify-center border border-white/5">
                                            <span className="text-saffron font-bold text-lg">{new Date(booking.date).getDate()}</span>
                                            <span className="text-[10px] font-bold text-white/30 uppercase">{new Date(booking.date).toLocaleString('default', { month: 'short' })}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold mb-1">{booking.customerName}</h3>
                                            <div className="flex items-center space-x-4 text-xs font-medium uppercase tracking-widest">
                                                <span className="flex items-center text-white/40"><Clock size={12} className="mr-1 text-gold" /> {booking.time}</span>
                                                <span className="flex items-center text-white/40"><Users size={12} className="mr-1 text-gold" /> {booking.guests} Guests</span>
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] ${booking.status === 'confirmed' ? 'bg-green-500/10 text-green-500' :
                                                        booking.status === 'pending' ? 'bg-orange-500/10 text-orange-500' :
                                                            'bg-red-500/10 text-red-500'
                                                    }`}>
                                                    {booking.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        {booking.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => updateStatus(booking.id, 'confirmed')}
                                                    className="p-3 bg-green-500/10 text-green-500 rounded-xl hover:bg-green-500/20 transition-all active:scale-95"
                                                >
                                                    <CheckCircle2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => updateStatus(booking.id, 'cancelled')}
                                                    className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-all active:scale-95"
                                                >
                                                    <XCircle size={18} />
                                                </button>
                                            </>
                                        )}
                                        <button className="p-3 bg-white/5 text-white/30 rounded-xl hover:bg-white/10 transition-all">
                                            <MoreVertical size={18} />
                                        </button>
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

export default Bookings;
