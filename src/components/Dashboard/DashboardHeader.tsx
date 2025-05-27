import React from 'react';
import { Menu, Bell, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <button
          type="button"
          className="rounded-md p-1 text-gray-500 md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
        </button>
        
        <div className="flex-1 md:pl-4">
          {/* Home button - always visible */}
          <Link
            to="/"
            className="ml-2 flex items-center rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-700"
            title="Go to Home"
          >
            <Home className="h-6 w-6" />
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700">
            <Bell className="h-6 w-6" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              3
            </span>
          </button>
          
          {/* Help button */}
          <button className="hidden rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 md:block">
            Get Help
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
