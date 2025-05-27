import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useCourses } from '../contexts/CourseContext';
import { useAuth } from '../contexts/AuthContext';
import { X, Clock, AlertCircle, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const CartPage: React.FC = () => {
  const { items, removeItem, clearCart, totalPrice } = useCart();
  const { isPurchased } = useCourses();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [discount, setDiscount] = useState(0);
  
  // Filter out already purchased courses
  const validCartItems = items.filter(item => !isPurchased(item.id));
  
  // Calculate totals
  const subtotal = validCartItems.reduce(
    (total, item) => total + (item.discountPrice || item.price), 
    0
  );
  
  const total = subtotal - discount;
  
  // Handle coupon application
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock coupon validation - in a real app this would be an API call
    if (couponCode.toLowerCase() === 'save20') {
      setDiscount(subtotal * 0.2);
      setCouponError('');
    } else {
      setDiscount(0);
      setCouponError('Invalid coupon code');
    }
  };
  
  // Proceed to checkout
  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/cart' } });
    } else {
      navigate('/checkout');
    }
  };
  
  if (validCartItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <ShoppingCart className="mx-auto h-16 w-16 text-gray-400" />
          <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Your cart is empty</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Looks like you haven't added any courses to your cart yet.
          </p>
          <Link
            to="/courses"
            className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 py-16 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-white shadow-md dark:bg-gray-800">
              {validCartItems.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col border-b border-gray-200 p-4 last:border-b-0 dark:border-gray-700 sm:flex-row"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-24 w-24 rounded-md object-cover sm:h-32 sm:w-32"
                  />
                  
                  <div className="mt-4 flex flex-1 flex-col sm:mt-0 sm:ml-6">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          <Link to={`/courses/${item.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                            {item.title}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          By {item.instructor.name}
                        </p>
                      </div>
                      
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="mr-1 h-4 w-4" />
                      {item.duration} • {item.lessons} lessons
                    </div>
                    
                    <div className="mt-auto flex items-end justify-between pt-4">
                      <div className="flex items-center">
                        {item.bestseller && (
                          <span className="mr-2 rounded bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                            Bestseller
                          </span>
                        )}
                        <span className="rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          {item.level}
                        </span>
                      </div>
                      
                      <div className="text-right">
                        {item.discountPrice ? (
                          <div>
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                              ${item.discountPrice.toFixed(2)}
                            </span>
                            <span className="ml-2 text-sm text-gray-500 line-through dark:text-gray-400">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold text-gray-900 dark:text-white">
                            ${item.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Clear cart button */}
              <div className="flex justify-end p-4">
                <button
                  onClick={clearCart}
                  className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
          
          {/* Order summary */}
          <div>
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
              <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                Order Summary
              </h2>
              
              <div className="mb-6 space-y-2 border-b border-gray-200 pb-4 dark:border-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
              </div>
              
              <div className="mb-6 flex justify-between">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  Total
                </span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  ${total.toFixed(2)}
                </span>
              </div>
              
              {/* Coupon form */}
              <form onSubmit={handleApplyCoupon} className="mb-6">
                <label htmlFor="coupon" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Apply Coupon
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="w-full rounded-l-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="rounded-r-md bg-blue-600 px-4 font-medium text-white hover:bg-blue-700"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {couponError}
                  </p>
                )}
                {discount > 0 && (
                  <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                    Coupon applied successfully!
                  </p>
                )}
              </form>
              
              {/* Checkout button */}
              <button
                onClick={handleCheckout}
                className="w-full rounded-md bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
              >
                {isAuthenticated ? 'Proceed to Checkout' : 'Sign in to Checkout'}
              </button>
              
              {/* Security note */}
              <div className="mt-4 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                <AlertCircle className="mr-1 h-4 w-4" />
                <span>Secure checkout. Your information is protected.</span>
              </div>
            </div>
            
            {/* Continue shopping */}
            <div className="mt-6 text-center">
              <Link
                to="/courses"
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;