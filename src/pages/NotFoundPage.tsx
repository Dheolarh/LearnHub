import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-900">404</h1>
        <h2 className="mt-4 text-3xl font-semibold text-gray-800">Page not found</h2>
        <p className="mt-2 text-lg text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <HomeIcon size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;