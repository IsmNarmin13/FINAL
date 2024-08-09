import React from 'react';
import { BsArrowRight, BsStarFill } from 'react-icons/bs';
import { authors } from '../constants/constant';

const Authors = () => {
  return (
    <div className='authors w-full my-10 md:my-20'>
      <div className='flex flex-col md:flex-row items-center justify-between'>
        <h1 className='text-xl md:text-4xl lg:text-6xl font-semibold mb-4 md:mb-0'>
          Favorite Authors
        </h1>
        <a href="#" className='flex items-center'>
          <span className='me-2'>view all</span>
          <BsArrowRight />
        </a>
      </div>
      <div className='mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8'>
        {authors.slice(0, 5).map((author) => (
          <div className='text-center' key={author.id}>
            <img
              className='rounded-full object-cover w-32 md:w-48 h-32 md:h-48 grayscale mb-3 md:mb-5 mx-auto'
              src={`/images/authors/${author.imageUrl}`}
              alt={author.name}
            />
            <span className='font-bold text-sm md:text-xl'>
              {author.name}
            </span>
            <div className='flex space-x-1 justify-center my-2'>
              {Array(5).fill().map((_, index) => (
                <BsStarFill key={index} className='w-3 md:w-4 h-3 md:h-4 text-orange-500' />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Authors;