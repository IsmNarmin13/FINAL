import React from 'react'
import { Link } from 'react-router-dom'
import ShoppingCart from '../../components/shoppingCart/ShoppingCart'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
const Cart = () => {
  return (
    <div>

      <div>
        <Navbar />
        <main>
          <div className='container mx-auto px-16 my-5'>
            <div>
              <ShoppingCart />
            </div>
          </div>
        </main>
      </div >
      <Footer />

    </div>
  )
}

export default Cart