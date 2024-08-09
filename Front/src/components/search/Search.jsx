import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    const handleNavToShop = () => {
        if (searchText.trim()) {
            navigate(`/shop/books/?search=${encodeURIComponent(searchText)}`);
        } else {
            navigate(`/shop/books/all`);
        }
    };

    return (
        <div className="w-full py-4">
            <div className="container mx-auto flex justify-center">
                <div className="flex w-full max-w-md">
                    <input 
                        type="search" 
                        name="search" 
                        placeholder="Search for books..." 
                        className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#ccb196]"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button 
                        className="bg-[#eed2ba] text-white px-4 py-2 rounded-r-lg hover:bg-[#ccb196] transition duration-200"
                        onClick={handleNavToShop}
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
}
