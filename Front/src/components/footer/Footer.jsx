import React from 'react';
import { BsInstagram, BsTiktok } from 'react-icons/bs';
import { AiOutlineYoutube } from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <footer>
        <hr className="w-full h-0.5 mx-auto bg-[#ad937c]"></hr>
        <div className='container mx-auto px-16 md:flex justify-between items-start my-8 space-y-4'>
          <div>
            <ul className='space-y-1'>
              <li className='font-bold'>Customer care</li>
              <li className='text-gray-600'><a href='#'>Categories</a></li>
              <li className='text-gray-600'><a href='#'>Bestsellers</a></li>
              <li className='text-gray-600'><a href='#'>New releases</a></li>
              <li className='text-gray-600'><a href='#'>Sale</a></li>
              <li className='text-gray-600'><a href='#'>Book sets</a></li>
            </ul>
          </div>
          <div>
            <ul className='space-y-1'>
              <li className='font-bold'>About us</li>
              <li className='text-gray-600'><a href='#'>Team</a></li>
              <li className='text-gray-600'><a href='#'>Blog</a></li>
              <li className='text-gray-600'><a href='#'>Contacts</a></li>
            </ul>
          </div>
          <div>
            <ul className='space-y-1'>
              <li className='font-bold'>Support</li>
              <li className='text-gray-600'><a href='#'>FAQ</a></li>
              <li className='text-gray-600'><a href='#'>Delivery</a></li>
              <li className='text-gray-600'><a href='#'>Return</a></li>
              <li className='text-gray-600'><a href='#'>Payment Methods</a></li>
              <li className='text-gray-600'><a href='#'>Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <ul className='space-y-1'>
              <li className='font-bold'>More inspiration</li>
              <div className='flex md:justify-between space-x-2 items-center'>
                <li className='text-gray-600'><a href='#'><BsInstagram className='w-6 h-6' /></a></li>
                <li className='text-gray-600'><a href='#'><FaFacebookF className='w-6 h-6' /></a></li>
                <li className='text-gray-600'><a href='#'><BsTiktok className='w-6 h-6' /></a></li>
                <li className='text-gray-600'><a href='#'><AiOutlineYoutube className='w-8 h-8' /></a></li>
              </div>
            </ul>
          </div>
        </div>
        <hr className="w-full h-0.5 mx-auto bg-[#ad937c]"></hr>
        <div className="mt-3 py-3 text-center">
          <p className="">
            &copy; EBook 2024. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer