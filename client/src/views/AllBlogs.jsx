// import axios from "axios";
// import { useEffect, useState } from "react";
// import BlogCard from "../components/BlogCard";
// import Navbar from "./../components/Navbar";
// import { getCurrentUser } from "./../util";

// function AllBlogs() {
//   const [user, setUser] = useState(null);
//   const [blogs, setBlogs] = useState([]);

//   const fetchBlogs = async () => {
//     const response = await axios.get(
//       `${import.meta.env.VITE_API_URL}/blogs?author=${user?._id || ""}`
//     );
//     setBlogs(response.data.data);
//   };

//   useEffect(() => {
//     setUser(getCurrentUser());
//   }, []);

//   useEffect(() => {
//     fetchBlogs();
//   }, [user]);

//   return (
//     <div className="bg-slate-900 min-h-screen text-white">
//       <div className="container mx-auto p-6">
//         <Navbar />
//         <h1 className="text-4xl font-bold mb-6 text-purple-400">All Blogs</h1>
//         {blogs.length === 0 && (
//           <p className="text-gray-300">No blogs available. Create a new blog!</p>
//         )}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {blogs.map((blog) => {
//             const {
//               _id,
//               title,
//               author,
//               updatedAt,
//               publishedAt,
//               status,
//               category,
//               slug,
//               viewCount,
//             } = blog;

//             return (
//               <BlogCard
//                 key={_id}
//                 title={title}
//                 author={author}
//                 updatedAt={updatedAt}
//                 publishedAt={publishedAt}
//                 status={status}
//                 category={category}
//                 slug={slug}
//                 viewCount={viewCount}
//               />
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AllBlogs;


import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard.jsx";
import Navbar from "../components/Navbar.jsx";
import { getCurrentUser } from "./../util.js";

function AllBlogs() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/blogs?author=${user?._id || ""}`
    );
    setBlogs(response.data.data);
  };

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [user]);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <div className="container mx-auto p-6">
        <Navbar />
        <h1 className="text-4xl font-bold mb-6 text-purple-600">All Blogs</h1>

        {blogs.length === 0 && (
          <p className="text-gray-500 mb-4">No blogs available. Create a new blog!</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} {...blog} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllBlogs;

