import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ChevronRight, MapPin, CreditCard, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";
import Button from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Link } from "react-router-dom";

const CartPage = () => {
    const { cart, addToCart, removeFromCart, subtotal, gst, total } = useCart();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center mandala-pattern">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-32 h-32 bg-charcoal/50 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center mb-8 border border-white/5"
                >
                    <ShoppingBag size={56} className="text-white/10" />
                </motion.div>
                <h2 className="text-3xl font-serif font-bold mb-3">Your feast awaits</h2>
                <p className="text-white/30 mb-10 max-w-xs font-sans">The kitchen is ready when you are. Start adding flavors to your cart.</p>
                <Link to="/menu">
                    <Button className="h-16 px-10 rounded-2xl bg-gold text-background hover:bg-gold/90 font-bold text-lg">
                        Discover Menu
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-12 px-8 pb-40 mandala-pattern bg-background">
            <header className="mb-10">
                <h1 className="text-4xl font-serif font-bold text-white mb-2">My <span className="text-gradient">Feast</span></h1>
                <p className="text-white/30 text-xs font-bold tracking-widest uppercase">{cart.length} Items Selected</p>
            </header>

            <div className="space-y-4 mb-12">
                {cart.map((item, idx) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Card className="p-4 bg-charcoal/30 border-white/5 flex items-center space-x-5">
                            <div className="relative w-24 h-24 flex-shrink-0">
                                <img src={item.image} className="w-full h-full rounded-2xl object-cover border border-white/5" alt="" />
                            </div>
                            <div className="flex-grow">
                                <h3 className="font-serif font-bold text-lg text-white mb-1 leading-tight">{item.name}</h3>
                                <p className="text-gold font-bold text-sm mb-3 font-sans">₹{item.price}</p>

                                <div className="flex items-center space-x-5">
                                    <div className="flex items-center bg-white/5 rounded-xl px-1 py-1 border border-white/5">
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-1.5 hover:bg-white/5 rounded-lg text-white/50 hover:text-white transition-colors"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="text-sm font-bold w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => addToCart(item)}
                                            className="p-1.5 hover:bg-white/5 rounded-lg text-white/50 hover:text-white transition-colors"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="text-white/10 hover:text-red-500 transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Bill Details */}
            <h2 className="text-xl font-serif font-bold mb-5 text-white">Bill Summary</h2>
            <Card className="p-8 bg-charcoal/20 border-white/5 mb-10 backdrop-blur-xl">
                <div className="space-y-4">
                    <div className="flex justify-between text-sm font-sans">
                        <span className="text-white/30">Subtotal</span>
                        <span className="text-white/80 font-bold">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm font-sans">
                        <span className="text-white/30">GST (5%)</span>
                        <span className="text-white/80 font-bold">₹{gst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-sans">
                        <span className="text-white/30">Service & Packaging</span>
                        <span className="text-white/80 font-bold">₹30.00</span>
                    </div>
                    <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                        <span className="font-serif font-bold text-xl">Grand Total</span>
                        <span className="text-2xl font-black text-gold">₹{(total + 30).toFixed(0)}</span>
                    </div>
                </div>
            </Card>

            {/* Order Options */}
            <div className="space-y-4 mb-10">
                <button className="w-full flex items-center justify-between p-6 bg-charcoal/30 rounded-3xl border border-white/5 group active:scale-[0.98] transition-all">
                    <div className="flex items-center space-x-5">
                        <div className="p-3 bg-white/5 text-gold rounded-2xl">
                            <MapPin size={22} />
                        </div>
                        <div className="text-left">
                            <p className="text-[10px] text-white/20 font-bold tracking-widest uppercase mb-1">Dine-in Table</p>
                            <p className="text-base font-bold text-white">Table 12 - Ground Floor</p>
                        </div>
                    </div>
                    <ChevronRight className="text-white/10 group-hover:translate-x-1 group-hover:text-gold transition-all" size={20} />
                </button>
            </div>

            {/* Checkout Button */}
            <div className="fixed bottom-28 left-0 right-0 px-8 z-40">
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full h-16 rounded-[2rem] bg-gradient-to-r from-saffron to-[#ff9100] text-white text-xl font-black shadow-[0_15px_40px_rgba(255,122,0,0.4)] flex items-center justify-center group"
                >
                    Place Order
                    <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                </motion.button>
            </div>
        </div>
    );
};

export default CartPage;
