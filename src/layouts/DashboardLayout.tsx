import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import DashboardSidebar from '../components/Dashboard/DashboardSidebar';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import { motion } from 'framer-motion';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Sidebar for larger screens */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <DashboardSidebar />
      </div>
      
      {/* Mobile sidebar */}
      <motion.div
        className="fixed inset-0 z-40 md:hidden"
        initial={{ opacity: 0 }}
        animate={sidebarOpen ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{ pointerEvents: sidebarOpen ? 'auto' : 'none' }}
      >
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />
        
        <motion.div
          className="relative flex h-full w-full max-w-xs flex-col bg-white pt-5 dark:bg-gray-800"
          initial={{ x: '100%' }}
          animate={sidebarOpen ? { x: 0 } : { x: '100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ marginLeft: 'auto' }}
        >
          <DashboardSidebar onClose={() => setSidebarOpen(false)} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DashboardLayout;