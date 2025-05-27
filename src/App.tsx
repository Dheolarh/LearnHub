import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import CoursePlayerPage from './pages/CoursePlayerPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import MyCoursesPage from './pages/Dashboard/MyCoursesPage';
import SavedCoursesPage from './pages/Dashboard/SavedCoursesPage';
import ProfilePage from './pages/Dashboard/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

// Protected route component
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { checkAuth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Check if user is authenticated on app load
    checkAuth();
    
    // Check user's preferred theme
    if (localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && 
       window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [checkAuth]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="courses/:courseId" element={<CourseDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      
      {/* Protected routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardPage />} />
        <Route path="my-courses" element={<MyCoursesPage />} />
        <Route path="saved-courses" element={<SavedCoursesPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      
      <Route path="/checkout" element={
        <ProtectedRoute>
          <CheckoutPage />
        </ProtectedRoute>
      } />
      
      <Route path="/learn/:courseId" element={
        <ProtectedRoute>
          <CoursePlayerPage />
        </ProtectedRoute>
      } />
      
      {/* 404 route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;