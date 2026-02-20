import { motion } from "framer-motion";
import { CheckCircle2, Clock, ChefHat, MapPin, Phone, ArrowLeft } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Link } from "react-router-dom";

const TrackingPage = () => {
    const steps = [
        { label: "Order Confirmed", time: "9:00 PM", status: "completed" },
        { label: "Preparing", time: "9:05 PM", status: "current" },
        { label: "Ready to Serve", status: "upcoming" },
        { label: "Served", status: "upcoming" },
    ];

    return (
        <div className="min-h-screen pt-12 px-8 mb-32 mandala-pattern bg-background">
            <header className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-white mb-2 tracking-tight">Track <span className="text-gradient">Feast</span></h1>
                    <p className="text-white/30 text-[10px] font-bold tracking-[0.2em] uppercase">Order #ORD-7214</p>
                </div>
                <Link to="/profile">
                    <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50">
                        <ArrowLeft size={20} />
                    </button>
                </Link>
            </header>

            {/* Live Status Card */}
            <Card className="p-8 bg-charcoal/30 border-white/5 mb-10 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4">
                    <div className="flex items-center space-x-2 bg-saffron/10 px-3 py-1 rounded-full border border-saffron/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" />
                        <span className="text-[10px] font-bold text-saffron uppercase tracking-widest">Live</span>
                    </div>
                </div>

                <div className="flex flex-col items-center text-center mb-10 pt-4">
                    <div className="w-20 h-20 bg-gold/10 rounded-[2rem] flex items-center justify-center mb-4 border border-gold/20">
                        <ChefHat size={40} className="text-gold" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-white mb-1">Preparing your meal</h2>
                    <p className="text-white/40 text-sm font-sans">Estimated service in <span className="text-gold font-bold">12 mins</span></p>
                </div>

                {/* Timeline */}
                <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
                    {steps.map((step, i) => (
                        <div key={i} className="flex space-x-6 relative z-10">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${step.status === "completed" ? "bg-green-500 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]" :
                                    step.status === "current" ? "bg-saffron border-saffron shadow-[0_0_15px_rgba(255,122,0,0.3)] animate-pulse" :
                                        "bg-charcoal border-white/10"
                                }`}>
                                {step.status === "completed" && <CheckCircle2 size={12} className="text-white" />}
                            </div>
                            <div className="flex-grow flex justify-between items-center">
                                <p className={`font-bold text-sm ${step.status === "upcoming" ? "text-white/20" : "text-white"}`}>
                                    {step.label}
                                </p>
                                {step.time && <p className="text-[10px] text-white/30 font-bold uppercase">{step.time}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Chef/Server Card */}
            <Card className="p-6 bg-charcoal/20 border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-2xl bg-charcoal overflow-hidden border border-white/5">
                        <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1954&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
                    </div>
                    <div>
                        <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest mb-1">Your Chef</p>
                        <h3 className="font-serif font-bold text-white">Anirudh Sharma</h3>
                    </div>
                </div>
                <button className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold hover:bg-gold/20 transition-all">
                    <Phone size={20} />
                </button>
            </Card>
        </div>
    );
};

export default TrackingPage;
