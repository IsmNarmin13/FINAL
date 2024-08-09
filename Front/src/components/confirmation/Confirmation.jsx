import React from 'react'
import { IoCheckmark } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Confirmation = () => {
  return (
    <div className='container mx-auto px-16 my-5'>
      <div className='flex justify-center items-center flex-col my-16'>
        <IoCheckmark className='w-40 h-40 p-6 bg-[#ad937c] rounded-full text-white' />
        <h1 className='text-6xl font-bold my-5'>Successfull!</h1>
        <p className='text-gray-500 text-2xl'>Your payment has been successfully processed</p>
        <button className="my-16 bg-[#ad937c] hover:bg-[#ccb196] text-white flex justify-center items-center p-3">
          <img className='me-3' src="/images/arrowLeft.png" alt="arrow left" />
          <Link to={'/'} className='text-white text:hover-white'>
            Continue To Shopping
          </Link>
        </button>
      </div>
    </div>
  )
}

export default Confirmation
