import React from "react";
import { Link, NavLink } from "react-router";
// import useAppContext from '../../Contexts/useAppContext';

const Sidebar = () => {
  // const location = useLocation()
  return (
    <div className="min-w-[15%] flex flex-col bg-slate-700">
      <div className="h-40"></div>
      <div className=" flex flex-col w-full">
        {/* <NavLink
          to="stats"
          className={({ isActive }) =>
            `pl-3 h-10 flex items-center text-white font-bold ${
              isActive && "border-l-[10px] border-[#3f5dbdf5]"
            }`
          }
        >
          Stats
        </NavLink>
        <NavLink
          to="users"
          className={({ isActive }) =>
            `pl-3 h-10 flex items-center text-white font-bold ${
              isActive && "border-l-[10px] border-[#3f5dbdf5]"
            }`
          }
        >
          Users
        </NavLink> */}
        <NavLink
          to="products"
          className={({ isActive }) =>
            `pl-3 h-10 flex items-center text-white font-bold ${
              isActive && "border-l-[10px] border-[#3f5dbdf5]"
            }`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="orders"
          className={({ isActive }) =>
            `pl-3 h-10 flex items-center text-white font-bold ${
              isActive && "border-l-[10px] border-[#3f5dbdf5]"
            }`
          }
        >
          Orders
        </NavLink>
      </div>
      <div className="mt-5">
        <Link
          to="/"
          className="px-3 h-10 flex items-center text-white font-bold"
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
