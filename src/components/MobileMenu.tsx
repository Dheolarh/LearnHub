import React from 'react';
import { Link } from 'react-router-dom';
import { X, Search, User, LogOut, BookOpen, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

interface MobileMenuProps {
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onClose }) => {
  const { user, logout } = useAuth();
  
  return (
    <motion.div
      className="fixed inset-0 z-40 overflow-hidden lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75" onClick={onClose} />
      
      <motion.div
        className="fixed inset-y-0 right-0 flex w-full max-w-xs flex-col bg-white dark:bg-gray-900"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Logo className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold">LearnHub</span>
          </div>
          <button
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* User info if logged in */}
        {user && (
          <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
            <div className="flex items-center">
              <img
                src={user.avatar || "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1"}
                alt={user.name}
                className="h-10 w-10 rounded-full"
              />
              <div className="ml-3">
                <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="border-b border-gray-200 p-4 dark:border-gray-700">
          <div className="relative">
            <input
              type="search"
              placeholder="Search courses..."
              className="w-full rounded-full border border-gray-300 bg-gray-100 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            />
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
          </div>
        </div>
        
        <div className="flex flex-1 flex-col overflow-y-auto">
          <nav className="flex-1 space-y-1 px-2 py-4">
            <Link
              to="/"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
              onClick={onClose}
            >
              Home
            </Link>
            
            <Link
              to="/courses"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
              onClick={onClose}
            >
              Courses
            </Link>
            
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
                  onClick={onClose}
                >
                  <User className="mr-3 h-5 w-5" />
                  Dashboard
                </Link>
                
                <Link
                  to="/dashboard/my-courses"
                  className="flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
                  onClick={onClose}
                >
                  <BookOpen className="mr-3 h-5 w-5" />
                  My Courses
                </Link>
                
                <Link
                  to="/dashboard/saved-courses"
                  className="flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
                  onClick={onClose}
                >
                  <Heart className="mr-3 h-5 w-5" />
                  Saved Courses
                </Link>
                
                <button
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="flex w-full items-center rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Sign out
                </button>
              </>
            )}
          </nav>
          
          {!user && (
            <div className="border-t border-gray-200 p-4 dark:border-gray-700">
              <Link
                to="/login"
                className="block w-full rounded-md bg-gray-100 px-4 py-2 text-center text-base font-medium text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                onClick={onClose}
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="mt-2 block w-full rounded-md bg-blue-600 px-4 py-2 text-center text-base font-medium text-white hover:bg-blue-700"
                onClick={onClose}
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MobileMenu;