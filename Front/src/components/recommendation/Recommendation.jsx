import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import BookCard from '../bookCard/BookCard';
import axios from 'axios';

const Recommendation = ({ currentBookId }) => {
    const [books, setBooks] = useState([]);

    const fetchBooks = async (pageSize) => {
        try {
            const response = await axios.get(`http://localhost:6060/api/v1/books?PageSize=${pageSize}&PageNumber=1`);
            setBooks(response.data.items || []);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    useEffect(() => {
        fetchBooks(5);
    }, []);

    const isCurrentBookInRecommendations = currentBookId && books.some(book => book.id === currentBookId);

    useEffect(() => {
        const pageSize = isCurrentBookInRecommendations ? 5 : 4;
        fetchBooks(pageSize);
    }, [currentBookId, books]);

    const filteredBooks = currentBookId ? books.filter(book => book.id !== currentBookId) : books;

    return (
        <>
            <div className='flex justify-between mt-20 px-[20px] py-[10px]'>
                <h1 className='md:text-4xl lg:text-6xl sm:text-xl font-semibold'>
                    You might also like
                </h1>
                <Link to="/shop/books/all" className='flex text-[#ad937c] hover:text-[#ad937c] items-center'>
                    <span className='me-2'>View all</span>
                    <BsArrowRight />
                </Link>
            </div>
            <div className="flex flex-wrap gap-[30px] py-[10px] px-[30px]">
                {filteredBooks.map((book) => (
                    <div key={book.id} className="flex flex-col">
                        <Link to={`/shop/book/?bookId=${book.id}`}>
                            <BookCard book={book} />
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Recommendation;
