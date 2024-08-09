import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function HeroBanner() {
  return (
    <div className='flex flex-col md:flex-row items-center justify-between py-[50px]'>
      <div className='flex-1 md:pr-8'>
        <h1 className='text-6xl font-bold mb-4'>
          The Most Read Book of the Month
        </h1>
        <p className='text-lg md:text-xl text-gray-600 mb-4'>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        </p>
        <Link to={'/shop/books/all'} className="text-black hover:text-white">
          <button className='mt-4 border border-transparent px-6 py-3 bg-[#ccb196] text-white font-semibold rounded-md transition duration-300 hover:bg-[#ad937c] flex items-center justify-center'>
            Buy Now <BsArrowRight className='ml-2' />
          </button>
        </Link>
      </div>
      <img 
        src="/images/books/banner.png" 
        alt="Book Banner" 
        className="w-[550px] h-auto md:flex-none md:w-[500px] sm:w-[550px]"/>
    </div>
  );
}
