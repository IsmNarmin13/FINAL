import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import config from '../../config';

const WishlistItems = () => {
    const [wishlistItems, setWishlistItems] = useState([]);

    const fetchWishlistItems = async () => {
        let token = Cookies.get('accessToken');
        console.log(token);
        
        if (token) {
            const response = await fetch(`${config.backApi}/wisher`, {
                method: 'GET',
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            let data = await response.json();
            console.log(data.items);
            setWishlistItems(data.items);
        }
    };

    useEffect(() => {
        let token = Cookies.get('accessToken');
        if (token) {
            fetchWishlistItems();
        }
    }, []);

    const removeFromWishlist = async (id) => {
        let token = Cookies.get('accessToken');
        if (token) {
            await fetch(`${config.backApi}/wisher/${id}`, {
                method: 'DELETE',
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            fetchWishlistItems();
        }
    };

    const truncateDescription = (description, maxLength) => {
        if (description.length <= maxLength) return description;
        return description.substring(0, maxLength) + '...';
    };

    return (
        <>
            {wishlistItems.length === 0 ? (
                <p className='text-center pb-5'>You have no books in wishlist.</p>
            ) : (
                <div className="flex flex-wrap gap-8">
                    {wishlistItems.map((item) => (
                        <div key={item.id} className="border p-2">
                            <div className='h-[200px] w-full bg-gray-100'>
                                <img className='h-full w-full object-contain' src={`${item.book.posterUrl}`} alt={item.book.title} />
                            </div>
                            <div>
                                <h3 className="md:text-xl text-m font-bold">{item.book.title}</h3>
                                <p className="text-gray-500">
                                    {truncateDescription(item.book.description, 20)}
                                </p>
                            </div>
                            <div className='flex justify-between mt-4'>
                                <Link to={`/shop/book/?bookId=${item.book.id}`} className="text-black px-5 py-1 border border-[#ad937c] hover:bg-[#ad937c] hover:text-white">
                                    Details
                                </Link>
                                <button onClick={() => removeFromWishlist(item.book.id)} className="bg-[#ad937c] hover:bg-[#ad937c] px-5 py-1 border border-orange-500 text-white">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default WishlistItems;
