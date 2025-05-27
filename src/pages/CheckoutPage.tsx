import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useCourses } from '../contexts/CourseContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  CreditCard, 
  Lock, 
  CheckCircle, 
  ChevronRight,
  AlertCircle,
  ChevronLeft
} from 'lucide-react';
import { motion } from 'framer-motion';

const CheckoutPage: React.FC = () => {
  const { items, clearCart, totalPrice } = useCart();
  const { purchaseCourses } = useCourses();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: '',
    country: 'US',
    postalCode: ''
  });
  
  // Input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
  };
  
  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Complete the purchase
      const courseIds = items.map(item => item.id);
      purchaseCourses(courseIds);
      clearCart();
      
      // Show success state
      setOrderComplete(true);
      
      // Redirect after a delay
      setTimeout(() => {
        navigate('/dashboard/my-courses');
      }, 3000);
      
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Calculate totals
  const subtotal = items.reduce(
    (total, item) => total + (item.discountPrice || item.price),
    0
  );
  
  const taxes = subtotal * 0.05; // 5% tax rate
  const total = subtotal + taxes;
  
  // If there are no items, redirect to cart
  useEffect(() => {
    if (items.length === 0 && !orderComplete) {
      navigate('/cart');
    }
  }, [items, navigate, orderComplete]);
  
  return (
    <div className="bg-gray-50 py-12 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center">
          <Link
            to="/cart"
            className="mr-4 flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Back to Cart</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Checkout
          </h1>
        </div>
        
        {orderComplete ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-gray-800"
          >
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                Payment Successful!
              </h2>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                Thank you for your purchase. Your courses are now available in your dashboard.
              </p>
              <div className="mx-auto mb-4 h-2 w-full max-w-xs overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <motion.div 
                  className="h-full bg-green-500" 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2 }}
                ></motion.div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Redirecting to your courses...
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Order summary */}
            <div className="lg:col-span-1 lg:order-2">
              <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                  Order Summary
                </h2>
                
                {/* Item list */}
                <div className="mb-4 max-h-64 overflow-y-auto">
                  {items.map(item => (
                    <div key={item.id} className="mb-3 flex items-center">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title}
                        className="h-12 w-12 rounded object-cover"
                      />
                      <div className="ml-3 flex-1">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.instructor.name}
                        </p>
                      </div>
                      <div className="text-right text-sm font-medium text-gray-900 dark:text-white">
                        ${(item.discountPrice || item.price).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Price calculations */}
                <div className="mb-4 space-y-2 border-b border-gray-200 pb-4 dark:border-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Taxes</span>
                    <span className="text-gray-900 dark:text-white">${taxes.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ${total.toFixed(2)}
                  </span>
                </div>
                
                {/* Secure payment note */}
                <div className="mt-6 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                  <Lock className="mr-2 h-4 w-4" />
                  <span>Secure payment processing</span>
                </div>
              </div>
            </div>
            
            {/* Payment form */}
            <div className="lg:col-span-2 lg:order-1">
              <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                  Payment Details
                </h2>
                
                {/* Payment method selection */}
                <div className="mb-6">
                  <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Payment Method
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    <label className={`
                      flex cursor-pointer items-center rounded-md border p-3 
                      ${paymentMethod === 'credit-card' 
                        ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/30' 
                        : 'border-gray-300 dark:border-gray-600'}
                    `}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit-card"
                        checked={paymentMethod === 'credit-card'}
                        onChange={() => setPaymentMethod('credit-card')}
                        className="sr-only"
                      />
                      <CreditCard className={`
                        mr-2 h-5 w-5 
                        ${paymentMethod === 'credit-card' 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-gray-400'}
                      `} />
                      <span className={`
                        text-sm font-medium 
                        ${paymentMethod === 'credit-card' 
                          ? 'text-blue-700 dark:text-blue-400' 
                          : 'text-gray-700 dark:text-gray-300'}
                      `}>
                        Credit / Debit Card
                      </span>
                    </label>
                    
                    <label className={`
                      flex cursor-not-allowed items-center rounded-md border p-3 opacity-60
                      ${paymentMethod === 'paypal' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 dark:border-gray-600'}
                    `}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        disabled
                        checked={paymentMethod === 'paypal'}
                        onChange={() => setPaymentMethod('paypal')}
                        className="sr-only"
                      />
                      <span className="mr-2 font-bold text-blue-600">Pay</span>
                      <span className="font-bold text-blue-800">Pal</span>
                    </label>
                  </div>
                </div>
                
                {/* Credit card form */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="cardName" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                      className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="cardNumber" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, '');
                        if (/^\d*$/.test(value) && value.length <= 16) {
                          setFormData({
                            ...formData,
                            cardNumber: formatCardNumber(value)
                          });
                        }
                      }}
                      placeholder="1234 5678 9012 3456"
                      required
                      maxLength={19}
                      className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div className="mb-4 grid grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="expMonth" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Month
                      </label>
                      <select
                        id="expMonth"
                        name="expMonth"
                        value={formData.expMonth}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">Month</option>
                        {Array.from({ length: 12 }, (_, i) => {
                          const month = i + 1;
                          return (
                            <option key={month} value={month < 10 ? `0${month}` : month}>
                              {month < 10 ? `0${month}` : month}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="expYear" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Year
                      </label>
                      <select
                        id="expYear"
                        name="expYear"
                        value={formData.expYear}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">Year</option>
                        {Array.from({ length: 10 }, (_, i) => {
                          const year = new Date().getFullYear() + i;
                          return (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="cvv" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value) && value.length <= 4) {
                            setFormData({
                              ...formData,
                              cvv: value
                            });
                          }
                        }}
                        placeholder="123"
                        required
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="country" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                        <option value="JP">Japan</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="postalCode" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="10001"
                        required
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                  
                  {/* Billing address note */}
                  <div className="mb-6 flex items-center rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    <AlertCircle className="mr-2 h-5 w-5 flex-shrink-0" />
                    <span>
                      Your billing address will be used for tax purposes and payment verification.
                    </span>
                  </div>
                  
                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full rounded-md bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:opacity-70"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="mr-2 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Complete Purchase
                        <ChevronRight className="ml-1 h-5 w-5" />
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;