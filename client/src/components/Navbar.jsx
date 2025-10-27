import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getCurrentUser } from "./../util";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm p-4 rounded-lg mb-6 flex justify-between items-center transition-all duration-300">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent tracking-wide hover:opacity-90 transition duration-300"
        >
          Blog Bits
        </Link>


        <div className="hidden md:flex items-center gap-3">
          {user && (
            <Link
              to="/new"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              + New Blog
            </Link>
          )}
          <Link
            to="/"
            className="text-gray-700 hover:text-purple-600 font-medium px-3 py-2 rounded transition-colors duration-200"
          >
            All Blogs
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full shadow-inner">
              <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-semibold">
                {user.name.substring(0, 1).toUpperCase()}
              </div>
              <span className="text-gray-700 font-medium hidden sm:inline">
                {user.name}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-600 font-semibold transition duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
