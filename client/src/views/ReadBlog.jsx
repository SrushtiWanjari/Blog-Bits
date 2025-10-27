// // 



// import MarkdownEditor from "@uiw/react-md-editor";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import Navbar from "../components/Navbar";

// function ReadBlog() {
//   const { slug } = useParams();
//   const [blog, setBlog] = useState({});

//   const fetchBlog = async () => {
//     const response = await axios.get(
//       `${import.meta.env.VITE_API_URL}/blogs/${slug}`
//     );
//     setBlog(response.data.data);
//   };

//   useEffect(() => {
//     document.documentElement.setAttribute("data-color-mode", "light");
//     fetchBlog();
//   }, []);

//   return (
//     <div className="bg-slate-900 min-h-screen text-white">
//       <div className="container mx-auto p-6">
//         <Navbar />
//         <h1 className="text-4xl font-bold mb-4 text-purple-400">{blog.title}</h1>

//         <p className="mb-4 text-gray-300">
//           Published On: {new Date(blog.publishedAt || blog.updatedAt).toLocaleString()} | Read by {blog.viewCount} people
//         </p>

//         <div className="flex items-center mb-6">
//           <span className="text-xl bg-purple-600 px-4 py-1 rounded-full text-white">
//             {blog.category}
//           </span>

//           <div className="flex items-center gap-4 ml-6">
//             <div className="flex items-center justify-center font-semibold w-[50px] h-[50px] bg-purple-500 text-center text-white rounded-full text-3xl">
//               {blog?.author?.name?.substring(0, 1)}
//             </div>
//             <div>
//               <p>{blog?.author?.name}</p>
//               <p className="text-gray-400">{blog?.author?.email}</p>
//             </div>
//           </div>
//         </div>

//         <MarkdownEditor.Markdown source={blog.content} />
//       </div>
//     </div>
//   );
// }

// export default ReadBlog;



import MarkdownEditor from "@uiw/react-md-editor";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../components/Navbar.jsx";

function ReadBlog() {
  const { slug } = useParams();
  const [blog, setBlog] = useState({});

  const fetchBlog = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/${slug}`);
    setBlog(response.data.data);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
    fetchBlog();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <div className="container mx-auto p-6">
        <Navbar />
        <h1 className="text-4xl font-bold mb-4 text-purple-600">{blog.title}</h1>

        <p className="mb-4 text-gray-500">
          Published On: {new Date(blog.publishedAt || blog.updatedAt).toLocaleString()} | Read by {blog.viewCount} people
        </p>

        <div className="flex items-center mb-6 gap-4">
          <span className="text-sm bg-blue-500 text-white px-3 py-1 rounded-full">
            {blog.category}
          </span>

          <div className="flex items-center gap-4 ml-2">
            <div className="flex items-center justify-center w-[50px] h-[50px] bg-purple-500 text-white rounded-full font-semibold text-3xl">
              {blog?.author?.name?.substring(0, 1)}
            </div>
            <div>
              <p className="font-semibold">{blog?.author?.name}</p>
              <p className="text-gray-500 text-sm">{blog?.author?.email}</p>
            </div>
          </div>
        </div>

        <MarkdownEditor.Markdown source={blog.content} />
      </div>
    </div>
  );
}

export default ReadBlog;

