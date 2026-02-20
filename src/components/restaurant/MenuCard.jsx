import { Plus, Minus, Leaf } from "lucide-react";
import { Card } from "../ui/Card";

const MenuCard = ({ item, onAdd, onRemove, quantity = 0 }) => {
    return (
        <Card className="flex flex-row bg-charcoal/80 border-white/[0.03] p-4 h-40 items-center group hover:bg-white/[0.04] transition-all duration-300 relative shadow-[0_8px_30px_rgb(0,0,0,0.4)] rounded-3xl active:scale-[0.98]">
            {/* Image Section */}
            <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-2xl border border-white/5 group-hover:border-gold/20 transition-colors shadow-inner">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>

            {/* Quality Indicators - Positioned top right */}
            <div className="absolute top-5 right-5 flex space-x-2">
                {item.isVeg ? (
                    <div className="p-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
                        <Leaf size={12} className="text-green-500" fill="currentColor" />
                    </div>
                ) : (
                    <div className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="ml-5 flex-grow flex flex-col justify-between py-1 h-full">
                <div>
                    <h3 className="font-serif font-bold text-lg text-white leading-tight mb-1 group-hover:text-gold transition-colors">
                        {item.name}
                    </h3>
                    <p className="text-white/40 text-[11px] font-sans leading-relaxed line-clamp-2 pr-10">
                        {item.description}
                    </p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-saffron font-black font-sans text-xl tracking-tight">₹{item.price}</span>

                    {quantity === 0 ? (
                        <button
                            onClick={() => onAdd(item)}
                            className="px-8 py-2.5 rounded-full border-2 border-saffron/30 text-saffron text-[10px] font-black uppercase tracking-widest transition-all hover:bg-saffron hover:text-white hover:border-saffron hover:shadow-[0_0_15px_rgba(255,122,0,0.3)]"
                        >
                            ADD
                        </button>
                    ) : (
                        <div className="flex items-center bg-saffron rounded-full overflow-hidden shadow-[0_10px_20px_rgba(255,122,0,0.3)] h-10 border border-white/10">
                            <button
                                className="px-3 h-full hover:bg-black/10 text-white transition-colors"
                                onClick={() => onRemove(item)}
                            >
                                <Minus size={16} />
                            </button>
                            <span className="px-4 font-black text-white text-xs">{quantity}</span>
                            <button
                                className="px-3 h-full hover:bg-black/10 text-white transition-colors"
                                onClick={() => onAdd(item)}
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default MenuCard;
