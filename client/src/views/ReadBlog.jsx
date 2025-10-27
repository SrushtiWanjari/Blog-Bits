import MarkdownEditor from "@uiw/react-md-editor";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../components/Navbar.jsx";

function ReadBlog() {
  const { slug } = useParams();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/${slug}`);
      setBlog(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching blog:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
    fetchBlog();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-blue-50 min-h-screen text-gray-800">
      <div className="container mx-auto p-6">
        <Navbar />

    
        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-gray-200">
        
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 leading-snug">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6">
            <span className="mr-4">
              🕓 {new Date(blog.publishedAt || blog.updatedAt).toLocaleString()}
            </span>
            <span className="mr-4">👁️ {blog.viewCount || 0} views</span>
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {blog.category}
            </span>
          </div>

          <div className="flex items-center mb-8 bg-gray-50 p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-center w-[60px] h-[60px] bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-2xl font-bold">
              {blog?.author?.name?.substring(0, 1)}
            </div>
            <div className="ml-4">
              <p className="font-semibold text-lg text-gray-800">{blog?.author?.name}</p>
              <p className="text-gray-500 text-sm">{blog?.author?.email}</p>
            </div>
          </div>


          <div
            data-color-mode="light"
            className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-a:text-blue-600 prose-strong:text-purple-600"
          >
            <MarkdownEditor.Markdown source={blog.content} />
          </div>
        </div>
      </div>

       <footer className="mt-16 text-center py-6 text-gray-600 text-sm">
        © {new Date().getFullYear()} <span className="font-semibold">BlogBits</span> — 
        Crafted with ❤️ for bloggers worldwide.
      </footer>
    </div>
  );
}

export default ReadBlog;
