import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Map, MessageCircle, FileText, Home, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navigation: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/map', icon: Map, label: 'Map' },
    { path: '/adoption', icon: Heart, label: 'Adopt' },
    { path: '/report', icon: FileText, label: 'Report' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
    { path: user ? '/dashboard' : '/login', icon: User, label: user ? 'Dashboard' : 'Login' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:static md:border-t-0 md:border-b md:shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around md:justify-start md:space-x-8 py-3">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                location.pathname === path
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs md:text-sm font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;