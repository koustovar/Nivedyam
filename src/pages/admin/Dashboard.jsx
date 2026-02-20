import { useState } from "react";
import {
    LayoutDashboard,
    ShoppingBag,
    Utensils,
    Calendar,
    Settings as SettingsIcon,
    LogOut,
    Menu as MenuIcon,
    X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

// Sub-components
import DashboardOverview from "./DashboardOverview";
import LiveOrders from "./LiveOrders";
import MenuManager from "./MenuManager";
import Bookings from "./Bookings";
import Settings from "./Settings";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("Dashboard");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { logout, currentUser } = useAuth();
    const navigate = useNavigate();

    const tabs = [
        { name: "Dashboard", icon: LayoutDashboard, component: DashboardOverview },
        { name: "Live Orders", icon: ShoppingBag, component: LiveOrders },
        { name: "Menu Manager", icon: Utensils, component: MenuManager },
        { name: "Bookings", icon: Calendar, component: Bookings },
        { name: "Settings", icon: SettingsIcon, component: Settings },
    ];

    const ActiveComponent = tabs.find(t => t.name === activeTab)?.component || DashboardOverview;

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-[#050505] flex text-white font-sans selection:bg-saffron/30">
            {/* Mobile Sidebar Toggle */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden fixed top-6 left-6 z-[60] p-3 bg-charcoal/80 backdrop-blur-md rounded-2xl border border-white/10 text-gold shadow-2xl"
            >
                {isSidebarOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-black border-r border-white/5 p-8 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] lg:translate-x-0 lg:static ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}>
                <div className="flex items-center space-x-4 mb-16 px-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-saffron to-gold rounded-[1.25rem] flex items-center justify-center font-black text-black text-2xl shadow-lg shadow-saffron/20 ring-4 ring-gold/10">
                        N
                    </div>
                    <div>
                        <span className="text-xl font-serif font-black tracking-widest block leading-none">NIVEDYAM</span>
                        <span className="text-[10px] font-bold text-white/20 tracking-[0.3em] uppercase mt-1 block">Management</span>
                    </div>
                </div>

                <nav className="space-y-3">
                    {tabs.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => {
                                setActiveTab(item.name);
                                setIsSidebarOpen(false);
                            }}
                            className={`w-full flex items-center space-x-4 px-5 py-4 rounded-2xl text-sm transition-all duration-300 group ${activeTab === item.name
                                    ? "bg-gradient-to-r from-saffron to-saffron/80 text-black font-black shadow-xl shadow-saffron/10"
                                    : "text-white/40 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <item.icon size={20} className={activeTab === item.name ? "text-black" : "text-white/20 group-hover:text-gold transition-colors"} />
                            <span className="tracking-wide">{item.name}</span>
                        </button>
                    ))}
                </nav>

                <div className="absolute bottom-8 left-8 right-8">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 mb-6 flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center overflow-hidden border border-gold/10">
                            {currentUser?.photoURL ? (
                                <img src={currentUser.photoURL} alt="Admin" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-gold font-bold">A</span>
                            )}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-bold truncate">{currentUser?.displayName || "Admin User"}</p>
                            <p className="text-[10px] text-white/30 truncate">Administrator</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center space-x-3 px-5 py-4 rounded-2xl text-sm text-red-400 hover:bg-red-500/10 transition-all font-bold border border-red-500/10 group active:scale-95"
                    >
                        <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow min-h-screen overflow-y-auto px-6 py-12 lg:px-12">
                <div className="max-w-7xl mx-auto pt-10 lg:pt-0">
                    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/5 pb-12">
                        <div>
                            <div className="flex items-center space-x-3 mb-2">
                                <span className="bg-gold/10 text-gold text-[10px] font-bold px-3 py-1 rounded-full border border-gold/20 tracking-[0.2em] uppercase">Control Center</span>
                            </div>
                            <h1 className="text-5xl font-serif font-black tracking-tight">{activeTab}</h1>
                        </div>
                        <div className="flex items-center bg-white/5 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/10 shadow-xl">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-3" />
                            <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">System Status: Operational</span>
                        </div>
                    </header>

                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <ActiveComponent />
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
