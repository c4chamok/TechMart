import React, { useEffect, useRef, useState } from "react";
import { FaUserCircle, FaSignInAlt, FaSignOutAlt, FaUserPlus, FaClipboardList, FaTachometerAlt } from "react-icons/fa";
import { Link, Links } from "react-router";
import States from "../../Store/states";

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { cart } = States();
    const menuRef = useRef(null);

    const totalCartCount = cart.reduce((total, item) => item.qty + total, 0);

    const toggleMenu = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownOpen && menuRef.current && !menuRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);

    return (
        <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link to={"/"} className="text-2xl font-bold text-blue-600">
                Tech<span className="text-gray-800">Mart</span>
            </Link>

            {/* Right Menu */}
            <div className="flex items-center gap-2">

                <>
                    <Link
                        to={"/my-cart"}
                        className=""
                    >
                        Cart {totalCartCount}
                    </Link>

                </>

                <div ref={menuRef} className="relative">
                    <button
                        onClick={toggleMenu}
                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 focus:outline-none"
                    >
                        <FaUserCircle className="text-2xl" />
                        <span className="hidden sm:inline">Account</span>
                    </button>

                    {/* Dropdown */}
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                            <Link to={"/login"} className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-gray-700">
                                <FaSignInAlt /> Login
                            </Link>
                            <Link to={"/signup"} className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-gray-700">
                                <FaUserPlus /> Register
                            </Link>
                            <Link to={"/"} className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-gray-700">
                                <FaClipboardList /> My Orders
                            </Link>
                            <Link to={"/dashboard"} className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-gray-700">
                                <FaTachometerAlt /> Dashboard
                            </Link>
                            <hr />
                            <Link className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-sm text-red-600">
                                <FaSignOutAlt /> Logout
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
