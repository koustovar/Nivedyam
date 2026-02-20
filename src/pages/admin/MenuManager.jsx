import { useState, useEffect } from "react";
import { collection, query, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Plus, Search, Edit2, Trash2, Image as ImageIcon, Check, X } from "lucide-react";
import { Card } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { motion, AnimatePresence } from "framer-motion";

const MenuManager = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "Main Course",
        description: "",
        image: "",
        isVeg: true,
    });

    useEffect(() => {
        const q = query(collection(db, "menu"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMenuItems(items);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                ...formData,
                price: Number(formData.price),
                updatedAt: new Date()
            };

            if (editingItem) {
                await updateDoc(doc(db, "menu", editingItem.id), data);
                setEditingItem(null);
            } else {
                await addDoc(collection(db, "menu"), data);
                setIsAdding(false);
            }
            setFormData({ name: "", price: "", category: "Main Course", description: "", image: "", isVeg: true });
        } catch (error) {
            console.error("Error saving menu item:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            await deleteDoc(doc(db, "menu", id));
        }
    };

    const filteredItems = menuItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-2xl font-bold">Menu Manager</h2>
                    <p className="text-white/40 text-sm">Manage your restaurant offerings</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Input
                            placeholder="Search dishes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-11 bg-white/5 border-white/10 w-64"
                        />
                        <Search className="absolute left-3 top-3 text-white/20" size={18} />
                    </div>
                    <Button onClick={() => setIsAdding(true)} className="h-11 rounded-xl">
                        <Plus size={18} className="mr-2" /> Add Item
                    </Button>
                </div>
            </div>

            <AnimatePresence>
                {(isAdding || editingItem) && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <Card className="border-white/10 bg-charcoal/40 p-6 mb-8">
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input label="Dish Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="bg-white/5 border-white/10" />
                                <Input label="Price (₹)" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required className="bg-white/5 border-white/10" />
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 h-12 text-white focus:outline-none focus:ring-2 focus:ring-saffron/50 transition-all mb-4"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="Starters">Starters</option>
                                    <option value="Main Course">Main Course</option>
                                    <option value="Breads">Breads</option>
                                    <option value="Desserts">Desserts</option>
                                    <option value="Drinks">Drinks</option>
                                </select>
                                <Input label="Image URL" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="bg-white/5 border-white/10" />
                                <div className="md:col-span-2">
                                    <Input label="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="bg-white/5 border-white/10" />
                                </div>
                                <label className="flex items-center space-x-3 cursor-pointer group">
                                    <input type="checkbox" checked={formData.isVeg} onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })} className="hidden" />
                                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${formData.isVeg ? 'border-green-500 bg-green-500/20' : 'border-white/10'}`}>
                                        {formData.isVeg && <Check size={14} className="text-green-500" />}
                                    </div>
                                    <span className="text-white/60 group-hover:text-white transition-colors">Vegetarian</span>
                                </label>
                                <div className="md:col-span-2 flex justify-end space-x-4">
                                    <Button variant="outline" type="button" onClick={() => { setIsAdding(false); setEditingItem(null); }}>Cancel</Button>
                                    <Button type="submit">{editingItem ? "Update Item" : "Create Item"}</Button>
                                </div>
                            </form>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                    <Card key={item.id} className="border-white/5 bg-charcoal/30 overflow-hidden group">
                        <div className="aspect-video relative overflow-hidden">
                            {item.image ? (
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                            ) : (
                                <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                    <ImageIcon className="text-white/10" size={48} />
                                </div>
                            )}
                            <div className="absolute top-4 right-4 flex space-x-2">
                                <button
                                    onClick={() => { setEditingItem(item); setFormData(item); }}
                                    className="p-2 bg-black/50 backdrop-blur-md rounded-lg text-white/50 hover:text-white transition-colors"
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-2 bg-black/50 backdrop-blur-md rounded-lg text-white/50 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <div className="absolute bottom-4 left-4">
                                <span className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase border border-white/10">
                                    {item.category}
                                </span>
                            </div>
                        </div>
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold">{item.name}</h3>
                                <span className="text-saffron font-bold">₹{item.price}</span>
                            </div>
                            <p className="text-white/40 text-xs line-clamp-2 mb-4 leading-relaxed font-light">{item.description}</p>
                            <div className="flex items-center space-x-3">
                                <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default MenuManager;
