import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [tableId, setTableId] = useState(null);

    const addToCart = (product, notes = "") => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1, notes }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === productId);
            if (existing.quantity > 1) {
                return prev.map((item) =>
                    item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
                );
            }
            return prev.filter((item) => item.id !== productId);
        });
    };

    const updateNotes = (productId, notes) => {
        setCart((prev) =>
            prev.map((item) => (item.id === productId ? { ...item, notes } : item))
        );
    };

    const clearCart = () => setCart([]);

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const gst = subtotal * 0.05; // 5% GST
    const total = subtotal + gst;

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateNotes,
                clearCart,
                subtotal,
                gst,
                total,
                tableId,
                setTableId,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
