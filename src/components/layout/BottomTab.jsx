import { Home, Calendar, CalendarCheck, User, Search, BookText, Utensils, Star } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const BottomTab = () => {
    const location = useLocation();

    const tabs = [
        { icon: Utensils, label: "Menu", path: "/menu" },
        { icon: BookText, label: "Book", path: "/booking" },
        { icon: Star, label: "Events", path: "/events" },
        { icon: User, label: "Profile", path: "/profile" },
    ];

    return (
        <div className="fixed bottom-6 left-0 right-0 px-6 z-50 pointer-events-none">
            <nav className="max-w-md mx-auto bg-charcoal/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto">
                <div className="flex justify-around items-center">
                    {tabs.map((tab) => {
                        const isActive = location.pathname === tab.path;
                        return (
                            <Link
                                key={tab.path}
                                to={tab.path}
                                className="relative flex flex-col items-center py-2 px-4 group"
                            >
                                <div className={`transition-all duration-300 ${isActive ? "text-saffron scale-110" : "text-white/30 group-hover:text-white/60"}`}>
                                    <tab.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                                </div>
                                <span className={`text-[9px] font-bold mt-1 tracking-[0.15em] uppercase transition-all duration-300 ${isActive ? "text-saffron opacity-100" : "text-white/10 opacity-0"}`}>
                                    {tab.label}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="bottomTabIndicator"
                                        className="absolute -bottom-1 w-1 h-1 bg-saffron rounded-full shadow-[0_0_10px_#ff7a00]"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
};

export default BottomTab;
