import React from 'react';
import { Link } from 'react-router-dom';

const SpecialOffer = () => {
  return (
    <div className='special-offers w-full flex flex-col md:flex-row items-center justify-around my-10 md:my-20 py-8 md:py-12 px-4'>
      <div className='w-full md:w-2/5 mb-4 md:mb-0'>
        <img className='w-full' src='./images/specialOffer/specialOffer.png' alt='Special Offer' />
      </div>
      <div className='w-full md:w-3/5 space-y-4 text-left'>
        <p className='text-lg md:text-2xl text-gray-700'>Special Offers</p>
        <h2 className='text-xl md:text-4xl text-gray-700 lg:text-6xl font-semibold'>
          Books 50% off now! Don’t miss such a deal!
        </h2>
        <p className='text-sm md:text-base text-gray-700'>
          It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
        </p>
        <div className='w-2/3 md:w-1/4'>
          <Link to={`/shop/books`} className='flex justify-center items-center border py-3 bg-[#ccb196] text-white'>
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;
