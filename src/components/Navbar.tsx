import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export function Navbar() {
  const { user, signOut, isLoading } = useAuthStore();

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Film className="h-8 w-8 text-red-600" />
            <span className="text-white text-xl font-bold">CINEBOOK</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {!isLoading && (
              user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-300">{user.email}</span>
                  <button
                    onClick={() => signOut()}
                    className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Sign In
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}