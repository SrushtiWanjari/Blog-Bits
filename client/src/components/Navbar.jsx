// import { useEffect, useState } from "react";
// import { Link } from "react-router";
// import { getCurrentUser } from "./../util";

// function Navbar() {
//   const [user, setUser] = useState(null);
//   useEffect(() => {
//     setUser(getCurrentUser());
//   }, []);
//   return (
//     <div className="bg-gray-700 text-white p-4 rounded mb-4 flex justify-between items-center">
//       {" "}
//       {user ? `Hello ${user.name}!` : `Welcome Guest!`}
//       <div>
//         {user ? (
//           <span
//             className="cursor-pointer"
//             onClick={() => {
//               localStorage.clear();
//               window.location.href = "/login";
//             }}
//           >
//             Logout
//           </span>
//         ) : (
//           <Link to="/login">Login</Link>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Navbar;


import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getCurrentUser } from "./../util";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return (
    <div className="bg-white shadow-md p-4 rounded mb-6 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-purple-600">Timeless Treasure</h1>
        {user && (
          <Link
            to="/new"
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded transition"
          >
            Create New Blog
          </Link>
        )}
        <Link
          to="/allblogs"
          className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded transition"
        >
          All Blogs
        </Link>
      </div>

      <div>
        {user ? (
          <span
            className="cursor-pointer text-red-500 hover:text-red-600 transition"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            Logout
          </span>
        ) : (
          <Link className="text-blue-600 hover:text-blue-700 transition" to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
