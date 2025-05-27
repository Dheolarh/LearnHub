import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and about section */}
          <div>
            <div className="flex items-center">
              <Logo className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-white">LearnHub</span>
            </div>
            <p className="mt-4 text-sm leading-6">
              LearnHub is a premier online learning platform offering expert-led courses
              across technology, business, creative skills, and personal development.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 transition hover:text-blue-500">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 transition hover:text-blue-500">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 transition hover:text-blue-500">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 transition hover:text-blue-500">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white">Top Categories</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/courses?category=development" className="text-sm text-gray-400 transition hover:text-blue-400">
                  Development
                </Link>
              </li>
              <li>
                <Link to="/courses?category=business" className="text-sm text-gray-400 transition hover:text-blue-400">
                  Business
                </Link>
              </li>
              <li>
                <Link to="/courses?category=design" className="text-sm text-gray-400 transition hover:text-blue-400">
                  Design
                </Link>
              </li>
              <li>
                <Link to="/courses?category=marketing" className="text-sm text-gray-400 transition hover:text-blue-400">
                  Marketing
                </Link>
              </li>
              <li>
                <Link to="/courses?category=photography" className="text-sm text-gray-400 transition hover:text-blue-400">
                  Photography
                </Link>
              </li>
              <li>
                <Link to="/courses?category=music" className="text-sm text-gray-400 transition hover:text-blue-400">
                  Music
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-400 transition hover:text-blue-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-400 transition hover:text-blue-400">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-sm text-gray-400 transition hover:text-blue-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-400 transition hover:text-blue-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-400 transition hover:text-blue-400">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/become-instructor" className="text-sm text-gray-400 transition hover:text-blue-400">
                  Become an Instructor
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ul className="mt-4 space-y-4">
              <li className="flex">
                <MapPin className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
                <span className="text-sm">
                  123 Learning Street, Education City, 10001
                </span>
              </li>
              <li className="flex">
                <Phone className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex">
                <Mail className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
                <span className="text-sm">support@learnhub.com</span>
              </li>
            </ul>
            
            {/* Newsletter signup */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white">Subscribe to our newsletter</h4>
              <div className="mt-2 flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-l-md border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
                <button className="rounded-r-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} LearnHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;