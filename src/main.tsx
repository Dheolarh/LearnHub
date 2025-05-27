import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { CourseProvider } from './contexts/CourseContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <CourseProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CourseProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);