import MarkdownEditor from "@uiw/react-md-editor";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router";
import Navbar from "../components/Navbar.jsx";
import { BLOG_CATEGORIES } from "./../constants.js";

function EditBlog() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const { slug } = useParams();

  const loadBlog = async () => {
    if (!slug) return;
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/${slug}`);
    const blogData = response?.data?.data;
    setTitle(blogData?.title);
    setContent(blogData?.content);
    setCategory(blogData?.category);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
    loadBlog();
  }, []);

  const updateBlog = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}`,
        { title, content, category },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (response?.data?.success) {
        toast.success("💾 Blog saved successfully!");
        setTimeout(() => (window.location.href = "/"), 2000);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "❌ Error updating blog");
    }
  };

  const publishBlog = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/blogs/${slug}/publish`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (response?.data?.success) {
        toast.success("🚀 Blog published successfully!");
        setTimeout(() => (window.location.href = "/"), 2000);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "❌ Error publishing blog");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 text-gray-800">
      <Navbar />

      <div className="container mx-auto px-6 py-10">
        <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-2xl p-8 transition-all duration-300 hover:shadow-purple-300">
          <h1 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500">
            ✍️ Edit Your Blog
          </h1>

          {/* Blog Title */}
          <input
            type="text"
            placeholder="Enter your blog title..."
            className="border-2 border-purple-200 focus:border-purple-500 focus:ring focus:ring-purple-100 p-4 w-full rounded-xl mb-5 bg-white/70 text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Category Dropdown */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-2 border-purple-200 focus:border-purple-500 focus:ring focus:ring-purple-100 p-4 w-full rounded-xl mb-6 bg-white/70 text-gray-800 shadow-sm transition-all duration-300"
          >
            {BLOG_CATEGORIES.map((cate) => (
              <option key={cate} value={cate}>
                {cate}
              </option>
            ))}
          </select>

          {/* Markdown Editor */}
          <div className="border-2 border-purple-200 rounded-xl overflow-hidden shadow-md mb-6">
            <MarkdownEditor
              value={content}
              onChange={(value) => setContent(value)}
              height="450px"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <button
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              onClick={updateBlog}
            >
              💾 Save Changes
            </button>

            <button
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              onClick={publishBlog}
            >
              🚀 Publish Blog
            </button>
          </div>
        </div>

        <Toaster position="bottom-right" />
      </div>

       <footer className="mt-16 text-center py-6 text-gray-600 text-sm">
        © {new Date().getFullYear()} <span className="font-semibold">BlogBits</span> — 
        Crafted with ❤️ for bloggers worldwide.
      </footer>
    </div>
  );
}

export default EditBlog;
