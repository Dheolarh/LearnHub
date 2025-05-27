import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Password strength state
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    hasLower: false,
    hasUpper: false,
    hasNumber: false,
    hasSpecial: false
  });
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Check password strength if password field is changed
    if (name === 'password') {
      setPasswordStrength({
        length: value.length >= 8,
        hasLower: /[a-z]/.test(value),
        hasUpper: /[A-Z]/.test(value),
        hasNumber: /[0-9]/.test(value),
        hasSpecial: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)
      });
    }
  };
  
  // Calculate password strength score (0-5)
  const getPasswordScore = () => {
    return Object.values(passwordStrength).filter(Boolean).length;
  };
  
  // Get password strength text based on score
  const getPasswordStrengthText = () => {
    const score = getPasswordScore();
    if (score === 0) return '';
    if (score < 3) return 'Weak';
    if (score < 5) return 'Moderate';
    return 'Strong';
  };
  
  // Get color class based on password strength
  const getPasswordStrengthColor = () => {
    const score = getPasswordScore();
    if (score < 3) return 'bg-red-500';
    if (score < 5) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error
    setError('');
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    // Validate password strength
    if (getPasswordScore() < 3) {
      setError('Please use a stronger password');
      return;
    }
    
    setLoading(true);
    
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center">
          <div className="mx-auto flex justify-center">
            <Logo className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Sign in
            </Link>
          </p>
        </div>
        
        <div className="rounded-lg bg-white px-6 py-8 shadow dark:bg-gray-800 sm:px-10">
          {error && (
            <div className="mb-4 flex items-center rounded-md bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/30 dark:text-red-300">
              <AlertCircle className="mr-2 h-5 w-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              
              {/* Password strength meter */}
              {formData.password && (
                <div className="mt-2">
                  <div className="mb-1 flex items-center justify-between">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                      <div 
                        className={`h-full ${getPasswordStrengthColor()}`} 
                        style={{ width: `${(getPasswordScore() / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  
                  <ul className="mt-2 space-y-1 text-xs text-gray-500 dark:text-gray-400">
                    <li className="flex items-center">
                      <span className={`mr-1 ${passwordStrength.length ? 'text-green-500' : ''}`}>
                        {passwordStrength.length ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          "•"
                        )}
                      </span>
                      At least 8 characters
                    </li>
                    <li className="flex items-center">
                      <span className={`mr-1 ${passwordStrength.hasLower && passwordStrength.hasUpper ? 'text-green-500' : ''}`}>
                        {passwordStrength.hasLower && passwordStrength.hasUpper ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          "•"
                        )}
                      </span>
                      Mix of uppercase & lowercase letters
                    </li>
                    <li className="flex items-center">
                      <span className={`mr-1 ${passwordStrength.hasNumber ? 'text-green-500' : ''}`}>
                        {passwordStrength.hasNumber ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          "•"
                        )}
                      </span>
                      At least one number
                    </li>
                    <li className="flex items-center">
                      <span className={`mr-1 ${passwordStrength.hasSpecial ? 'text-green-500' : ''}`}>
                        {passwordStrength.hasSpecial ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          "•"
                        )}
                      </span>
                      At least one special character
                    </li>
                  </ul>
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <div className="relative mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 ${
                    formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-600'
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600'
                  } dark:bg-gray-700 dark:text-white sm:text-sm`}
                />
              </div>
              {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  Passwords don't match
                </p>
              )}
            </div>
            
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-700 dark:text-gray-300">
                  I agree to the{' '}
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 dark:focus:ring-offset-gray-800"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="mr-2 h-4 w-4 animate-spin text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                      <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </button>
              
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;