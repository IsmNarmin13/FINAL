import React, { useState } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { categories } from '../constants/constant';

const Categories = () => {
  const extendedCategories = [...categories, ...categories];

  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((startIndex + 1) % categories.length);
  };

  const handlePrev = () => {
    setStartIndex((startIndex - 1 + categories.length) % categories.length);
  };

  return (
    <div className='categories w-full my-10 md:my-20'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl md:text-4xl lg:text-6xl font-semibold'>
          Popular Categories
        </h1>
        <div className='flex items-center space-x-2'>
          <BsArrowLeft onClick={handlePrev} className='cursor-pointer' />
          <BsArrowRight onClick={handleNext} className='cursor-pointer' />
        </div>
      </div>
      <div className='flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mt-5 overflow-hidden'>
        {extendedCategories.slice(startIndex, startIndex + 3).map((category) => (
          <div key={category.id} className='w-full md:w-1/3 relative'>
            <img className='w-full' src={category.image} alt={category.name} />
            <h3 className='absolute bottom-4 left-4 md:left-24 font-bold text-xl md:text-3xl'>
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;