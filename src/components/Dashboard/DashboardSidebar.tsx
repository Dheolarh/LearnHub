import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Home, 
  BookOpen, 
  Heart, 
  User, 
  Settings, 
  LifeBuoy, 
  LogOut, 
  X 
} from 'lucide-react';
import Logo from '../Logo';

interface DashboardSidebarProps {
  onClose?: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ onClose }) => {
  const { user, logout } = useAuth();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home className="h-5 w-5" /> },
    { name: 'My Courses', path: '/dashboard/my-courses', icon: <BookOpen className="h-5 w-5" /> },
    { name: 'Saved Courses', path: '/dashboard/saved-courses', icon: <Heart className="h-5 w-5" /> },
    { name: 'Profile', path: '/dashboard/profile', icon: <User className="h-5 w-5" /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <Settings className="h-5 w-5" /> },
    { name: 'Help', path: '/dashboard/help', icon: <LifeBuoy className="h-5 w-5" /> },
  ];
  
  return (
    <div className="flex h-full flex-col border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
        <div className="flex items-center">
          <Logo className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">LearnHub</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 md:hidden"
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>
      
      {/* User info */}
      <div className="border-b border-gray-200 p-4 dark:border-gray-700">
        <div className="flex items-center">
          <img
            src={user?.avatar || "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1"}
            alt="User avatar"
            className="h-10 w-10 rounded-full"
          />
          <div className="ml-3">
            <p className="font-medium text-gray-900 dark:text-white">{user?.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center rounded-md px-3 py-2 ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' 
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`
                }
                end={item.path === '/dashboard'}
                onClick={onClose}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Logout */}
      <div className="border-t border-gray-200 p-4 dark:border-gray-700">
        <button
          onClick={() => {
            logout();
            if (onClose) onClose();
          }}
          className="flex w-full items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign out
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;