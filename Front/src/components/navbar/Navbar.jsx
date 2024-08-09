import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import UserIcon from '../../icons/UserIcon';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import Search from "../search/Search";
import LogoutIcon from "../../icons/LogoutIcon";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const accessToken = Cookies.get("accessToken");
        const refreshToken = Cookies.get("refreshToken");

        if (accessToken && refreshToken) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        let token = Cookies.get('accessToken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
                setRole(userRole);
            } catch (error) {
                console.error('Failed to decode token', error);
            }
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        setIsLoggedIn(false);
        setRole('');
    };

    return (
        <nav className="bg-[#ad937c] p-2">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/home" className="flex items-center text-white hover:text-gray-400">
                    <img src="/images/logo.jpeg" alt="EBook home" className="mr-2 w-[100px] h-[100px] rounded-full" />
                    <span className="text-3xl font-bold">Book store</span>
                </Link>

                <button
                    className="lg:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-8 h-8"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>

                <div className={`absolute top-16 right-0 bg-[#ad937c] p-4 rounded-lg shadow-lg lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
                    <ul>
                        {role !== 'Admin' ? (
                            <>
                                <li><Link className="text-white hover:text-gray-400 hover:underline" to='/home'>Home</Link></li>
                                <li><Link className="text-white hover:text-gray-400 hover:underline" to='/wishlist'>Wishlist</Link></li>
                                <li><Link className="text-white hover:text-gray-400 hover:underline" to='/cart'>Cart</Link></li>
                                <li><Link className="text-white hover:text-gray-400 hover:underline" to='/shop/books/all'>Shop</Link></li>
                                <Search />
                            </>
                        ) : (
                            <>
                                <li><Link className="text-white hover:text-gray-400 hover:underline" to='/admin/authors'>Authors</Link></li>
                                <li><Link className="text-white hover:text-gray-400 hover:underline" to='/admin/books'>Books</Link></li>
                                <li><Link className="text-white hover:text-gray-400 hover:underline" to='/admin/languages'>Languages</Link></li>
                                <li><Link className="text-white hover:text-gray-400 hover:underline" to='/admin/genres'>Genres</Link></li>
                            </>
                        )}
                        <li className="flex items-center justify-center">
                            {!isLoggedIn ? (
                                <Link className="text-white hover:text-gray-400 hover:underline flex items-center" to='/Signup'>
                                    <UserIcon />
                                </Link>
                            ) : (
                                <Link className="text-white hover:text-gray-400 hover:underline flex items-center" to='/home' onClick={handleLogout}>
                                    <LogoutIcon />
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>

                <ul className="hidden lg:flex space-x-6 items-center">
                    {role !== 'Admin' ? (
                        <>
                            <li><Link className="text-white hover:text-gray-400 hover:underline" to='/home'>Home</Link></li>
                            <li><Link className="text-white hover:text-gray-400 hover:underline" to='/wishlist'>Wishlist</Link></li>
                            <li><Link className="text-white hover:text-gray-400 hover:underline" to='/cart'>Cart</Link></li>
                            <li><Link className="text-white hover:text-gray-400 hover:underline" to='/shop/books/all'>Shop</Link></li>
                            <Search />
                        </>
                    ) : (
                        <>
                            <li><Link className="text-white hover:text-gray-400 hover:underline" to='/admin/authors'>Authors</Link></li>
                            <li><Link className="text-white hover:text-gray-400 hover:underline" to='/admin/books'>Books</Link></li>
                            <li><Link className="text-white hover:text-gray-400 hover:underline" to='/admin/languages'>Languages</Link></li>
                            <li><Link className="text-white hover:text-gray-400 hover:underline" to='/admin/genres'>Genres</Link></li>
                        </>
                    )}
                    <li className="flex items-center">
                        {!isLoggedIn ? (
                            <Link className="text-white hover:text-gray-400 hover:underline flex items-center" to='/Signup'>
                                <UserIcon />
                            </Link>
                        ) : (
                            <Link className="text-white hover:text-gray-400 hover:underline flex items-center" to='/home' onClick={handleLogout}>
                                <LogoutIcon />
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}
