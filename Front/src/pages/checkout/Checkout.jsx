import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CheckoutShoppingCart from '../../components/checkoutShoppingCart/CheckoutShoppingCart';
import CheckoutSteps from '../../components/checkoutSteps/CheckoutSteps'
import Navbar from '../../components/navbar/Navbar';
const Checkout = () => {
    const navigate = useNavigate();

    const handleShowConfirmation = () => {
        navigate('/checkout/confirmation');
    };

    return (
        <div>
            <Navbar />

            <div className='container mx-auto px-16 my-5'>
                {/* <div className='breadcrump text-sm my-8'>
        <Link className='' to='/home'>Home</Link>
        <span> / All Books </span>
        <span> / Book page </span>
        <span> / Shopping Bag </span>
        <span className='font-bold'> / Checkout </span>
        </div> */}
                <div className='md:flex justify-between'>
                    <div className='md:w-1/2'><CheckoutSteps showConfirmation={handleShowConfirmation} /></div>
                    <div className='md:w-1/2'><CheckoutShoppingCart /></div>
                </div>
            </div>
        </div>
    )
}

export default Checkout