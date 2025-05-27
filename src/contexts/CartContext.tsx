import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course } from '../types/course';

interface CartContextType {
  items: Course[];
  addItem: (course: Course) => void;
  removeItem: (courseId: string) => void;
  clearCart: () => void;
  isInCart: (courseId: string) => boolean;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Course[]>([]);
  
  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);
  
  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);
  
  // Add a course to cart
  const addItem = (course: Course) => {
    if (!isInCart(course.id)) {
      setItems([...items, course]);
    }
  };
  
  // Remove a course from cart
  const removeItem = (courseId: string) => {
    setItems(items.filter(item => item.id !== courseId));
  };
  
  // Clear the entire cart
  const clearCart = () => {
    setItems([]);
  };
  
  // Check if a course is in cart
  const isInCart = (courseId: string) => {
    return items.some(item => item.id === courseId);
  };
  
  // Calculate total price
  const totalPrice = items.reduce((total, item) => total + item.price, 0);
  
  const value = {
    items,
    addItem,
    removeItem,
    clearCart,
    isInCart,
    totalPrice,
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};