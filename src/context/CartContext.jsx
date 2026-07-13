import React, { useState, useContext, createContext } from 'react';
export const CartContext = createContext();
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const addToCart = (product, quantity) => {
        const itemInCart = cart.find(item => item.id === product.id);
        if (itemInCart) {
            const updatedCart = cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
            setCart(updatedCart);
        } else {
            setCart(prevCart => [...prevCart, { ...product, quantity }]);
        }
    };
    const clearCart = () => {
        setCart([]);
    };
    const getCartQuantity = () => {
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    };
    const getCartTotal = () => {
        return cart.reduce((acc, item) => acc + item.precio * item.quantity,
            0);
    };
    const removeItem = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
    };
    const isInCart = (id) => {
        return cart.some(item => item.id === id);
    };
    const getCantidadActual = (id) => {
        const itemInCart = cart.find(item => item.id === id);
        return itemInCart ? itemInCart.quantity : 0;
    };
    const cartDicrease = (id) =>{
        const itemInCart = cart.find(item => item.id === id);
        if(!itemInCart) return;
        if(itemInCart.quantity === 1){
            removeItem(id);
        } else {
            const updatedCart = cart.map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
            setCart(updatedCart);
        }
    }

    return (
        <CartContext.Provider value={{
            cart, addToCart, clearCart,
            getCartQuantity, getCartTotal, getCantidadActual,
            removeItem, isInCart, cartDicrease
        }}>
            {children}
        </CartContext.Provider>
    );
};