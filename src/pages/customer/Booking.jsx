import { useState } from "react";
import { Calendar, Users, Clock, Music, Camera, Utensils, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import Input from "../../components/ui/Input";

const BookingPage = () => {
    const [bookingType, setBookingType] = useState("table"); // 'table' or 'event'

    return (
        <div className="min-h-screen pt-12 px-8 mb-32 mandala-pattern bg-background">
            <header className="mb-12">
                <h1 className="text-4xl font-serif font-bold text-white mb-2 tracking-tight">Reserve <span className="text-gradient">Sacred</span> Space</h1>
                <p className="text-white/30 text-xs font-bold tracking-widest uppercase">Secure your curated experience</p>
            </header>

            {/* Selection Switch */}
            <div className="flex bg-charcoal/50 p-1.5 rounded-[2rem] border border-white/5 mb-10">
                <button
                    onClick={() => setBookingType("table")}
                    className={`flex-1 flex items-center justify-center py-4 rounded-[1.8rem] text-sm font-bold transition-all ${bookingType === "table" ? "bg-gold text-background shadow-lg shadow-gold/20" : "text-white/40 hover:text-white"
                        }`}
                >
                    <Utensils size={18} className="mr-2" /> Fine Dining
                </button>
                <button
                    onClick={() => setBookingType("event")}
                    className={`flex-1 flex items-center justify-center py-4 rounded-[1.8rem] text-sm font-bold transition-all ${bookingType === "event" ? "bg-gold text-background shadow-lg shadow-gold/20" : "text-white/40 hover:text-white"
                        }`}
                >
                    <Star size={18} className="mr-2" /> Special Events
                </button>
            </div>

            <motion.div
                key={bookingType}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                {bookingType === "table" ? (
                    <Card className="p-8 border-white/5 bg-charcoal/30 relative overflow-hidden h-full min-h-[400px]">
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gold uppercase tracking-widest flex items-center mb-2">
                                        <Calendar size={14} className="mr-2" /> Date
                                    </label>
                                    <input type="date" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-gold/50 transition-colors" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gold uppercase tracking-widest flex items-center mb-2">
                                        <Users size={14} className="mr-2" /> Guests
                                    </label>
                                    <select className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-gold/50 transition-colors">
                                        {[1, 2, 3, 4, 5, 6, 8, 10].map(n => <option key={n} value={n}>{n} Persons</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gold uppercase tracking-widest flex items-center mb-2">
                                    <Clock size={14} className="mr-2" /> Preferred Time
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {["7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"].map(t => (
                                        <button key={t} className="py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-gold/10 hover:border-gold/30 transition-all active:scale-95">
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Button className="w-full h-16 rounded-[2rem] bg-gold text-background font-black text-lg mt-10">
                                Confirm Reservation
                                <ArrowRight className="ml-2" />
                            </Button>
                        </div>
                    </Card>
                ) : (
                    <Card className="p-8 border-white/5 bg-charcoal/30">
                        <div className="space-y-8">
                            <div className="p-6 bg-gold/5 border border-gold/10 rounded-3xl mb-4">
                                <h3 className="font-serif font-bold text-xl text-gold mb-2">Curated Celebrations</h3>
                                <p className="text-white/40 text-sm font-sans">From corporate banquets to sacred weddings, we weave heritage into every moment.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button className="p-6 bg-white/5 border border-white/10 rounded-3xl text-left group hover:border-gold/30 transition-all">
                                    <div className="p-3 bg-white/5 rounded-2xl w-fit mb-4 group-hover:bg-gold/10 group-hover:text-gold transition-colors">
                                        <Music size={24} />
                                    </div>
                                    <p className="font-bold text-sm mb-1">Live Sitar</p>
                                    <p className="text-[10px] text-white/20 uppercase tracking-widest">Atmospheric</p>
                                </button>
                                <button className="p-6 bg-white/5 border border-white/10 rounded-3xl text-left group hover:border-gold/30 transition-all">
                                    <div className="p-3 bg-white/5 rounded-2xl w-fit mb-4 group-hover:bg-gold/10 group-hover:text-gold transition-colors">
                                        <Camera size={24} />
                                    </div>
                                    <p className="font-bold text-sm mb-1">Candid Film</p>
                                    <p className="text-[10px] text-white/20 uppercase tracking-widest">Heritage Shoot</p>
                                </button>
                            </div>

                            <Input label="Event Nature" placeholder="e.g. Traditional Wedding" />

                            <Button className="w-full h-16 rounded-[2rem] bg-gradient-to-r from-saffron to-[#ff9100] text-white font-black text-lg">
                                Talk to Curator
                                <ArrowRight className="ml-2" />
                            </Button>
                        </div>
                    </Card>
                )}
            </motion.div>
        </div>
    );
};

export default BookingPage;
