import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";

export default function Header() {
    const [genres, setGenres] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (accessToken && refreshToken) {
            console.log(accessToken);
            console.log(refreshToken);
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        axios.get(`${config.backApi}/genres`)
            .then(response => {
                setGenres(response.data);
            })
            .catch(error => {
                console.error("Error fetching genres:", error);
            });
    }, []);

    return (
        <div className="animate_animated animate_zoomInDown">
            <div className="bg-gray-500 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/home" className="flex items-center">
                        <img src="/icon.png" width="80" alt="EBook home" className="mr-2" />
                        <span className="text-white text-7xl font-bold">EBook</span>
                    </Link>

                    <ul className="flex space-x-6">
                        <li>
                            <Link className="text-white hover:text-gray-400" to='/home'>Home</Link>
                        </li>
                        <li>
                            <Link className="text-white hover:text-gray-400" to='/shop/books/all'>Shop</Link>
                        </li>
                        {isLoggedIn && (
                            <li>
                                <Link className="text-white hover:text-gray-400" to='/favorites'>Favorites</Link>
                            </li>
                        )}
                        <li className="relative group">
                            <Link to='/shop/books/all' className="text-white hover:text-gray-400">Genres</Link>
                            <ul className="absolute left-0 hidden mt-2 bg-gray-800 rounded-lg group-hover:block">
                                {genres.map(genre => (
                                    <li key={genre.id}>
                                        <Link to={`/shop/books/?genreId=${genre.id}`} className="block px-4 py-2 text-white hover:bg-gray-700 rounded-lg">{genre.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </li>

                    </ul>
                    <div className="relative">
                        <ul className="flex space-x-6 items-baseline">
                            <input type="search" name="search" placeholder="Search our store" className="input-field px-4 py-2 rounded-lg" />
                            <button className="search-btn absolute right-0 top-0 mt-2 mr-2" aria-label="Search">
                                <ion-icon name="search-outline" aria-hidden="true" className="text-gray-500"></ion-icon>
                            </button>
                            {!isLoggedIn && (
                                <li>
                                    <Link className="text-white hover:text-gray-400" to='/Signup'>
                                        <span className="material-symbols-outlined">icon</span>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}