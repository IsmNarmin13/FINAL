import React from 'react'
import { Link } from 'react-router-dom'
import WishlistItems from '../../components/wishlistItems/WishlistItems'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
const Wishlist = () => {
  return (
    <div>
      <Navbar />

      <div className='container mx-auto px-16 my-5'>
        <div>
          <WishlistItems />
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Wishlist

