import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [isLoaded, setIsLoaded] = useState(() => {
        return localStorage.getItem('isLoaded') === 'true';
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('isLoaded', isLoaded);
    }, [isLoaded]);

    const addToCart = (item) => {
        setCartItems((prevItems) => {
           
            if (!Array.isArray(prevItems)) {
                return [item]; 
            }
            const existingItem = prevItems.find((i) => i.id === item.id);
            if (existingItem) {
                return prevItems.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                );
            }
            return [...prevItems, item];
        });
    };

    const updateQuantity = (id, quantity) => {
        setCartItems((prevItems) =>
            Array.isArray(prevItems) ? 
                prevItems.map((item) =>
                    item.id === id ? { ...item, quantity } : item
                )
                : [] 
        );
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) =>
            Array.isArray(prevItems) ?
                prevItems.filter((item) => item.id !== id)
                : [] 
        );
    };

    const setCart = (cart) => {
       
        const normalizedCart = Array.isArray(cart) ? cart : [];
        setCartItems(normalizedCart);
        localStorage.setItem('cartItems', JSON.stringify(normalizedCart));
        setIsLoaded(true); 
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
        localStorage.removeItem('cartId');
        localStorage.removeItem('isLoaded');
        setIsLoaded(false); 
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, setCart, clearCart, isLoaded }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
