import { motion } from "framer-motion";
import { User, Bell, Clock, HelpCircle, LogOut, ChevronRight, Phone, ShieldCheck, MapPin, LogIn, LayoutDashboard } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";

const ProfilePage = () => {
    const { currentUser, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    const menuItems = [
        { icon: MapPin, label: "My Addresses", sub: "Nagpur, Civil Lines", path: "/addresses", color: "text-blue-400" },
        { icon: Clock, label: "Order History", sub: "View past orders", path: "/history", color: "text-gold" },
        { icon: Phone, label: "Call Waiter", sub: "Table 12 - Active", action: () => alert("Waiter notified!"), color: "text-green-400" },
        ...((isAdmin) ? [{ icon: LayoutDashboard, label: "Admin Management", sub: "Access Control Panel", path: "/admin/dashboard", color: "text-saffron font-bold" }] : []),
        { icon: ShieldCheck, label: "Privacy & Security", sub: "Manage account", path: "/security", color: "text-white/40" },
        { icon: HelpCircle, label: "Support & FAQ", sub: "Get help", path: "/support", color: "text-white/40" },
    ];

    const handleAuthAction = () => {
        if (currentUser) {
            logout();
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="min-h-screen pt-16 px-8 mandala-pattern bg-background pb-32">
            {/* Header Section */}
            <div className="flex flex-col items-center mb-16 px-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative mb-6"
                >
                    <div className="w-28 h-28 bg-gradient-to-br from-charcoal to-muted rounded-[2.5rem] flex items-center justify-center border border-white/5 shadow-2xl relative z-10">
                        <User size={56} className="text-gold" />
                    </div>
                    <div className="absolute inset-0 bg-gold/10 blur-2xl rounded-full scale-75" />
                </motion.div>
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                >
                    <h2 className="text-3xl font-serif font-bold text-white mb-1">
                        {currentUser ? (currentUser.displayName || currentUser.email.split('@')[0]) : "Nivedyam Guest"}
                    </h2>
                    <p className="text-gold/60 text-xs font-bold tracking-widest uppercase">
                        {currentUser ? "Active Member" : "Guest Mode"}
                    </p>
                </motion.div>
            </div>

            {/* Account Options */}
            <div className="space-y-4 mb-12">
                {menuItems.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                    >
                        <button
                            onClick={() => item.path ? navigate(item.path) : item.action?.()}
                            className="w-full flex items-center justify-between p-6 bg-charcoal/30 hover:bg-white/[0.02] rounded-3xl border border-white/5 active:scale-[0.98] transition-all group"
                        >
                            <div className="flex items-center space-x-5">
                                <div className={`p-3.5 bg-white/5 rounded-2xl ${item.color} group-hover:scale-110 transition-transform`}>
                                    <item.icon size={22} />
                                </div>
                                <div className="text-left text-white">
                                    <p className="font-bold text-base leading-none mb-1">{item.label}</p>
                                    <p className="text-xs text-white/30 font-sans">{item.sub}</p>
                                </div>
                            </div>
                            <ChevronRight className="text-white/10 group-hover:text-gold group-hover:translate-x-1 transition-all" size={20} />
                        </button>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <Button
                    variant="secondary"
                    className={`w-full h-16 rounded-[2rem] border-white/10 bg-charcoal/20 ${currentUser ? 'text-red-500 hover:bg-red-500/5' : 'text-saffron hover:bg-saffron/5'}`}
                    onClick={handleAuthAction}
                >
                    {currentUser ? (
                        <>
                            <LogOut size={20} className="mr-3" />
                            <span className="font-bold text-lg">Sign Out</span>
                        </>
                    ) : (
                        <>
                            <LogIn size={20} className="mr-3" />
                            <span className="font-bold text-lg">Sign In</span>
                        </>
                    )}
                </Button>
                <p className="text-center mt-12 text-white/10 text-[10px] font-bold tracking-[0.2em] uppercase">
                    &copy; 2026 Nivedyam Hospitality Group
                </p>
            </motion.div>
        </div>
    );
};

export default ProfilePage;
