import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard.jsx";
import Navbar from "../components/Navbar.jsx";
import { getCurrentUser } from "./../util.js";

function AllBlogs() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blogs?author=${user?._id || ""}`
      );
      setBlogs(response.data.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  useEffect(() => {
    if (user !== null) fetchBlogs();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 text-gray-800">
      <Navbar />

      <div className="container mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent drop-shadow-md">
            Explore Inspiring Blogs
          </h1>
          <p className="mt-3 text-gray-600 text-lg">
            Discover stories, share ideas, and express your creativity 💡
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-gray-600 bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-semibold mb-2">No blogs available 📝</h2>
            <p className="text-gray-500">
              Start your journey by creating your first blog!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <BlogCard {...blog} />
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="mt-16 text-center py-6 text-gray-600 text-sm">
        © {new Date().getFullYear()} <span className="font-semibold">BlogBits</span> — 
        Crafted with ❤️ for bloggers worldwide.
      </footer>
    </div>
  );
}

export default AllBlogs;
