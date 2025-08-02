import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Search, Heart, LogOut, User, Film } from 'lucide-react';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col">
      <nav className="bg-[#1a1a1a] border-b border-[#8b5cf6]/20 sticky top-0 z-50 safe-area-top">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12 sm:h-14">
            <Link to="/" className="flex items-center space-x-2 text-[#8b5cf6] hover:text-white transition-colors">
              <div className="flex items-center justify-center">
                <img 
                  src="/Logo-vizart.png" 
                  alt="Vizart Logo" 
                  className="h-5 w-5 sm:h-6 sm:w-6 object-contain"
                />
              </div>
              <span className="text-base sm:text-lg font-bold font-mono tracking-wider">Vixo</span>
            </Link>

            <div className="flex items-center space-x-1 sm:space-x-4">
              <Link
                to="/"
                className={`flex items-center space-x-1 px-2 py-1 sm:px-3 sm:py-2 rounded-lg transition-colors touch-target ${
                  isActive('/') ? 'bg-[#8b5cf6] text-white' : 'text-gray-300 hover:text-white hover:bg-[#8b5cf6]/20'
                }`}
              >
                <div className="flex items-center justify-center w-4 h-4">
                  <Film className="h-4 w-4" />
                </div>
                <span className="hidden sm:inline">Home</span>
              </Link>

              <Link
                to="/search"
                className={`flex items-center space-x-1 px-2 py-1 sm:px-3 sm:py-2 rounded-lg transition-colors touch-target ${
                  isActive('/search') ? 'bg-[#8b5cf6] text-white' : 'text-gray-300 hover:text-white hover:bg-[#8b5cf6]/20'
                }`}
              >
                <div className="flex items-center justify-center w-4 h-4">
                  <Search className="h-4 w-4" />
                </div>
                <span className="hidden sm:inline">Search</span>
              </Link>

              {user ? (
                <>
                  <Link
                    to="/favorites"
                    className={`flex items-center space-x-1 px-2 py-1 sm:px-3 sm:py-2 rounded-lg transition-colors touch-target ${
                      isActive('/favorites') ? 'bg-[#8b5cf6] text-white' : 'text-gray-300 hover:text-white hover:bg-[#8b5cf6]/20'
                    }`}
                  >
                    <div className="flex items-center justify-center w-4 h-4">
                      <Heart className="h-4 w-4" />
                    </div>
                    <span className="hidden sm:inline">Favorites</span>
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-1 px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-gray-300 hover:text-white hover:bg-red-600/20 transition-colors touch-target"
                  >
                    <div className="flex items-center justify-center w-4 h-4">
                      <LogOut className="h-4 w-4" />
                    </div>
                    <span className="hidden sm:inline">Sign Out</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-1 px-2 py-1 sm:px-4 sm:py-2 rounded-lg bg-[#8b5cf6] text-white hover:bg-[#8b5cf6]/80 transition-colors touch-target"
                >
                  <div className="flex items-center justify-center w-4 h-4">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 safe-area-bottom">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}