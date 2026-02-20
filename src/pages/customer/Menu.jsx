import { useState, useMemo, useEffect } from "react";
import { Search, Bell, MapPin, ChevronRight, ShoppingCart, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MenuCard from "../../components/restaurant/MenuCard";
import { menuService } from "../../services/menuService";

const categories = [
    "Starters",
    "Main Course",
    "Chef Specials",
    "Breads",
    "Rice & Biryani",
    "Desserts",
];

const mockMenu = [
    {
        name: "Murgh Malai Tikka",
        category: "Starters",
        price: 450,
        description: "Creamy chicken kebabs marinated in ginger, garlic and cream, grilled in tandoor.",
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c175f0?q=80&w=1854&auto=format&fit=crop",
        isVeg: false,
        isSpicy: false,
    },
    {
        name: "Paneer Makhani",
        category: "Main Course",
        price: 380,
        description: "Succulent cubes of cottage cheese simmered in a rich tomato and butter gravy.",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1887&auto=format&fit=crop",
        isVeg: true,
        isSpicy: false,
    },
    {
        name: "Dal Nivedyam",
        category: "Chef Specials",
        price: 290,
        description: "Our signature black lentils, slow-cooked for 24 hours with handpicked spices.",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1887&auto=format&fit=crop",
        isVeg: true,
        isSpicy: true,
    },
    {
        name: "Garlic Naan",
        category: "Breads",
        price: 90,
        description: "Leavened bread topped with minced garlic and butter.",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2070&auto=format&fit=crop",
        isVeg: true,
    }
];

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [activeCategory, setActiveCategory] = useState("Chef Specials");
    const [searchQuery, setSearchQuery] = useState("");
    const [cart, setCart] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                // Seed database if empty (for initial setup)
                await menuService.seedDatabase(mockMenu);
                const items = await menuService.getMenuItems();
                setMenuItems(items);
            } catch (error) {
                console.error("Failed to fetch menu:", error);
                // Fallback to mock data if Firestore fails
                setMenuItems(mockMenu.map((item, idx) => ({ id: idx, ...item })));
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    const filteredMenu = useMemo(() => {
        return menuItems.filter((item) => {
            const matchesCategory = activeCategory === "All" || item.category === activeCategory;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery, menuItems]);

    const addToCart = (item) => {
        setCart((prev) => ({
            ...prev,
            [item.id]: (prev[item.id] || 0) + 1,
        }));
    };

    const removeFromCart = (item) => {
        setCart((prev) => {
            const newCart = { ...prev };
            if (newCart[item.id] > 1) {
                newCart[item.id] -= 1;
            } else {
                delete newCart[item.id];
            }
            return newCart;
        });
    };

    const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="w-12 h-12 border-4 border-saffron border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-32">
            {/* Table/Dine-in Status Banner */}
            <div className="px-6 py-4">
                <div className="flex items-center justify-between bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-2xl px-5 py-3 shadow-xl">
                    <div className="flex items-center text-white/50 font-medium text-[10px] tracking-widest uppercase">
                        <MapPin size={12} className="mr-2 text-saffron" />
                        <span>Nagpur - <span className="text-saffron">Table 12</span></span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse mr-2" />
                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Dine-in Active</span>
                    </div>
                </div>
            </div>

            {/* Featured Hero Banner */}
            <section className="px-6 relative z-30">
                <div className="relative aspect-[18/9] rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl group">
                    <img
                        src="https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=2070&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110"
                        alt="Signature"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
                    <div className="absolute inset-y-0 left-8 flex flex-col justify-center">
                        <span className="text-gold font-bold text-[10px] tracking-[0.2em] uppercase mb-1">SIGNATURE</span>
                        <h2 className="text-3xl font-serif font-bold text-white mb-2 leading-tight">Chef's <br />Curated</h2>
                    </div>
                    <button className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:bg-saffron hover:text-white transition-all shadow-xl">
                        <ArrowRight size={24} />
                    </button>
                </div>
            </section>

            {/* Horizontal Category Pill Tabs */}
            <div className="px-6 mt-8 overflow-x-auto no-scrollbar flex space-x-3 pb-4">
                {categories.map((cat) => (
                    <div key={cat} className="flex flex-col items-center flex-shrink-0">
                        <button
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${activeCategory === cat
                                ? "bg-saffron text-white shadow-lg shadow-saffron/20"
                                : "bg-charcoal border border-white/5 text-white/30 hover:text-white/60"
                                } `}
                        >
                            {cat}
                        </button>
                        {activeCategory === cat && (
                            <motion.div
                                layoutId="activeTabUnderline"
                                className="w-8 h-1 bg-saffron rounded-full mt-2 shadow-[0_0_10px_#ff7a00]"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Menu Section with aligned Title and Count */}
            <div className="px-6 mt-6">
                <div className="flex justify-between items-end mb-6 px-1">
                    <h2 className="text-2xl font-serif font-bold text-gold">{activeCategory}</h2>
                    <span className="text-[12px] font-medium text-white/30 uppercase tracking-widest">{filteredMenu.length} items</span>
                </div>

                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {filteredMenu.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                            >
                                <MenuCard
                                    item={item}
                                    onAdd={addToCart}
                                    onRemove={removeFromCart}
                                    quantity={cart[item.id] || 0}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Floating Shopping Cart Feedback */}
            {totalItems > 0 && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="fixed bottom-28 right-6 z-50 px-6 w-full max-w-xs ml-auto"
                >
                    <button
                        className="bg-saffron text-white h-14 w-full rounded-2xl shadow-[0_10px_30px_rgba(255,122,0,0.4)] flex items-center justify-between px-6 active:scale-95 transition-all group"
                        onClick={() => { }}
                    >
                        <div className="flex items-center">
                            <ShoppingCart size={20} className="mr-3" />
                            <span className="font-bold">{totalItems} Item{totalItems > 1 ? 's' : ''} added</span>
                        </div>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default Menu;
