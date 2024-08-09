import React from 'react';
import {BsArrowRight } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { discountedBooks } from '../constants/constant';

const DiscountedBooks = () => {
    return (
        <div className='discounted w-full my-10 md:my-20'>
            <div className='flex items-center justify-between'>
                <h1 className='md:text-4xl lg:text-6xl sm:text-xl font-semibold'>
                    Our discounted books
                </h1>
                <Link to="/all-books" className='flex items-center'>
                    <span className='me-2'>view all</span>
                    <BsArrowRight />
                </Link>
            </div>
            <div className='flex items-center'>
                <ul className="md:space-x-6 md:flex space-y-4 md:space-y-0 justify-between w-full mt-8">
                    {discountedBooks.map((book, index) => (
                       <Link to={`/shop/books/${book.id}`}  key={book.id}>
                        <li>
                            
                                <div className='relative' >
                                <img className="w-full" src={`./images/books/${book.imageUrl}`} alt={book.title} />
                                {book.discount>0 ?
                                <span className='absolute top-4 left-4 bg-orange-500 px-3 py-1 text-sm text-white'>{book.discount}% off</span> : ""}
                                </div>
                                <p className="font-bold mt-4">{book.title}</p>
                                <p className="mt-1">
                                    {book.author}
                                </p>
                                {book.oldPrice ? (
                                    <div>
                                        <span className='line-through text-gray-500 me-2 mt-2'>${book.oldPrice}</span>
                                        <span className='text-red-500'>${book.regularPrice}</span>
                                    </div>
                                ) : (
                                    <span className='text-gray-500'>${book.regularPrice}</span>
                                )}
                            
                        </li>
                        </Link>
                    ))}
                </ul>


            </div>
        </div>
    )
}

export default DiscountedBooks