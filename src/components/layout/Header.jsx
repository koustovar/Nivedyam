import { Search, MapPin, User, LogIn } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const isAdmin = location.pathname.startsWith("/admin");

    const getInitials = (user) => {
        if (user.displayName) return user.displayName.charAt(0).toUpperCase();
        if (user.email) return user.email.charAt(0).toUpperCase();
        return "U";
    };

    return (
        <header className="fixed top-4 left-0 right-0 px-6 z-50 pointer-events-none">
            <div className="max-w-7xl mx-auto flex justify-between items-center bg-charcoal/40 backdrop-blur-xl border border-white/5 rounded-[2rem] px-6 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.3)] pointer-events-auto">
                <Link to="/" className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gold/20 rounded-xl flex items-center justify-center border border-gold/20 shadow-inner">
                        <span className="text-xl font-serif font-black text-gold">N</span>
                    </div>
                    <span className="text-xl font-serif font-bold tracking-[0.2em] text-white hidden sm:block">NIVEDYAM</span>
                </Link>

                {!isAdmin && (
                    <div className="flex items-center space-x-4">
                        <div className="hidden md:flex items-center bg-white/5 rounded-full px-4 py-2 border border-white/5">
                            <MapPin size={14} className="text-saffron mr-2" />
                            <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest"> Nagpur, Civil Lines</span>
                        </div>

                        <button className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center bg-white/5 hover:bg-white/10 active:scale-90 transition-all">
                            <Search size={18} className="text-white/60" />
                        </button>

                        <button
                            onClick={() => navigate(currentUser ? "/profile" : "/login")}
                            className="relative group overflow-hidden w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 hover:bg-white/10 active:scale-90 transition-all shadow-xl shadow-black/20"
                        >
                            {currentUser ? (
                                currentUser.photoURL ? (
                                    <img
                                        src={currentUser.photoURL}
                                        alt="Profile"
                                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gold/20 to-saffron/20 text-gold font-black text-sm">
                                        {getInitials(currentUser)}
                                    </div>
                                )
                            ) : (
                                <User size={18} className="text-white/60 group-hover:text-gold transition-colors" />
                            )}
                            {currentUser && (
                                <div className="absolute inset-0 border-2 border-gold/20 rounded-full group-hover:border-gold/50 transition-colors pointer-events-none" />
                            )}
                        </button>
                    </div>
                )}

                {isAdmin && (
                    <div className="flex items-center space-x-3">
                        <span className="text-[10px] font-bold text-gold uppercase tracking-[0.3em] bg-gold/10 px-4 py-2 rounded-full border border-gold/10">Admin Portal</span>
                        {currentUser && (
                            <button
                                onClick={() => navigate("/profile")}
                                className="w-10 h-10 rounded-full border border-gold/30 overflow-hidden active:scale-90 transition-all shadow-lg"
                            >
                                {currentUser.photoURL ? (
                                    <img src={currentUser.photoURL} alt="Admin" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gold/20 flex items-center justify-center text-gold font-bold">{getInitials(currentUser)}</div>
                                )}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
