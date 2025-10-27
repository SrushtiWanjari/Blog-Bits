// import { Link } from "react-router";

// function BlogCard({
//   title,
//   author,
//   publishedAt,
//   updatedAt,
//   status,
//   category,
//   slug,
//   viewCount,
// }) {
//   return (
//     <div className="bg-slate-800 border border-gray-700 p-4 my-4 rounded-md relative shadow-lg hover:shadow-purple-500/50 transition duration-300">
//       <h2 className="text-xl font-bold mb-2">
//         {status !== "published" && (
//           <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-md mr-2">
//             {status}
//           </span>
//         )}
//         {title}
//       </h2>

//       <div className="flex items-center gap-4 my-2">
//         <div className="flex items-center justify-center font-semibold w-[50px] h-[50px] bg-purple-500 text-white rounded-full text-3xl">
//           {author.name.substring(0, 1)}
//         </div>

//         <div>
//           <p className="font-semibold">{author.name}</p>
//           <p className="text-gray-300 text-sm">{author.email}</p>
//         </div>
//       </div>

//       <p className="text-gray-400 text-sm mt-2">
//         Published On: {new Date(publishedAt || updatedAt).toLocaleString()},
//         Read By {viewCount} people
//       </p>

//       {/* Category Badge */}
//       <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
//         {category}
//       </span>

//       {/* Read/Edit Button */}
//       {status === "published" ? (
//         <Link
//           className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md absolute bottom-4 right-4 transition"
//           to={`/blog/${slug}`}
//         >
//           Read More
//         </Link>
//       ) : (
//         <Link
//           className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md absolute bottom-4 right-4 transition"
//           to={`/edit/${slug}`}
//         >
//           Edit Blog
//         </Link>
//       )}
//     </div>
//   );
// }

// export default BlogCard;


import { Link } from "react-router";

function BlogCard({
  title,
  author,
  publishedAt,
  updatedAt,
  status,
  category,
  slug,
  viewCount,
}) {
  return (
    <div className="bg-white border border-gray-200 p-5 rounded-lg shadow hover:shadow-lg transition duration-300 relative">
      <h2 className="text-xl font-bold mb-2 text-purple-600">
        {status !== "published" && (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-md mr-2">
            {status}
          </span>
        )}
        {title}
      </h2>

      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center justify-center w-[50px] h-[50px] bg-blue-500 text-white rounded-full font-semibold text-3xl">
          {author.name.substring(0, 1)}
        </div>
        <div>
          <p className="font-semibold text-gray-800">{author.name}</p>
          <p className="text-gray-500 text-sm">{author.email}</p>
        </div>
      </div>

      <p className="text-gray-500 text-sm mb-3">
        Published On: {new Date(publishedAt || updatedAt).toLocaleString()} | Read by {viewCount} people
      </p>

      <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
        {category}
      </span>

      {status === "published" ? (
        <Link
          to={`/blog/${slug}`}
          className="absolute bottom-4 right-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition"
        >
          Read More
        </Link>
      ) : (
        <Link
          to={`/edit/${slug}`}
          className="absolute bottom-4 right-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition"
        >
          Edit Blog
        </Link>
      )}
    </div>
  );
}

export default BlogCard;

