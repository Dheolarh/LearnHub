import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  Moon,
  Sun
} from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from './Logo';

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const { user } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => 
    document.documentElement.classList.contains('dark')
  );

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
    setDarkMode(!darkMode);
  };

  return (
    <header 
      className={`sticky top-0 z-30 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md dark:bg-gray-900' 
          : 'bg-white/95 backdrop-blur dark:bg-gray-900/95'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
              LearnHub
            </span>
          </Link>
          
          {/* Navigation - Desktop */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link 
                  to="/" 
                  className="text-sm font-medium text-gray-700 transition hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/courses" 
                  className="text-sm font-medium text-gray-700 transition hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                >
                  Courses
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Search, cart, menu */}
          <div className="flex items-center space-x-4">
            {/* Search form */}
            <form 
              onSubmit={handleSearch}
              className="hidden items-center md:flex"
            >
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search courses..."
                  className="w-56 rounded-full border border-gray-300 bg-gray-100 py-1.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              </div>
            </form>
            
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="rounded-full p-1.5 text-gray-700 transition hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            
            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative rounded-full p-1.5 text-gray-700 transition hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <ShoppingCart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                  {items.length}
                </span>
              )}
            </Link>
            
            {/* Mobile menu button */}
            <button
              type="button"
              className="rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
            
            {/* Login/Register buttons - Desktop */}
            {!user && (
              <div className="hidden items-center space-x-2 md:flex">
                <Link
                  to="/login"
                  className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;