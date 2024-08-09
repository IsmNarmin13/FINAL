import React, { useState, useEffect } from 'react';
import { BiX } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import config from '../../config'


const CheckoutShoppingCart = () => {
    const [total, setTotal] = useState(0);
    const [cartItems, setCartItems] = useState([])

    const fetchCartItems = async () => {
        let token = Cookies.get('accessToken')
        const response = await fetch(`${config.backApi}/carts`, {
            method: 'GET',
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        let data = await response.json()
        setCartItems(data.items)
        setTotal(data.totalPrice)
    }

    useEffect(() => {
        fetchCartItems()
    }, [])

    const handleIncrease = async (id, quantity) => {
        let token = Cookies.get('accessToken')
        await fetch(`${config.backApi}/carts/items/${id}`, {
            method: 'PUT',
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quantity + 1)
        })
        fetchCartItems()
    }

    const handleDecrease = async (id, quantity) => {
        let token = Cookies.get('accessToken')
        await fetch(`${config.backApi}/carts/items/${id}`, {
            method: 'PUT',
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quantity - 1)
        })
        fetchCartItems()

    }

    const handleDelete = async (id) => {
        let token = Cookies.get('accessToken')
        await fetch(`${config.backApi}/carts/items/${id}`, {
            method: 'DELETE',
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        fetchCartItems()
    }


    return (
        <div className="md:ms-20">
            <div>
                <div className='flex justify-between items-center'>
                    <span className='text-2xl hidden md:flex'>Shopping cart</span>
                    <Link className='text-[#ccb196] hover:text-[#ccb196] text-lg' to="/cart">Edit cart</Link>
                </div>
                {cartItems.map((item) => (
                    <div key={item.id} className="md:flex justify-between my-2 border-b-2 pb-2 space-y-4">
                        <div className='md:w-1/5 w-full'>
                            <img className=' w-full md:w-40 h-24 object-contain bg-gray-100' src={`${item.book.posterUrl}`} />
                        </div>
                        <div className='md:w-1/5'>
                            <h3 className="md:text-xl text-m font-bold">{item.title}</h3>
                            <p className="text-gray-500">{item.author}</p>
                        </div>
                        <div className='md:w-2/5 flex justify-between items-start border p-2 md:border-0 md:p-0'>

                            <div className='md:w-1/3 md:flex'>
                                <button
                                    className="font-bold"
                                    onClick={() => {
                                        if (item.quantity > 1) {
                                            handleDecrease(item.id, item.quantity);
                                        }
                                    }}
                                >
                                    -
                                </button>
                                <span className="border border-gray-400 px-3 mx-2">{item.quantity}</span>
                                <button
                                    className="font-bold"
                                    onClick={() => handleIncrease(item.id, item.quantity)}
                                >
                                    +
                                </button>
                            </div>
                            <div className='md:w-1/3 font-bold'>
                                ${item.book.price}
                            </div>
                            <button onClick={() => handleDelete(item.id)} className="flex items-start text-gray-800">
                                <BiX className='w-6 h-6' />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className='w-full flex justify-between items-center my-4 gap-4'>
                <input
                    type='text'
                    placeholder='Discount code'
                    className='p-2 border border-gray-400 w-2/3 md:w-3/5'
                />
                <button
                    className="w-1/3 md:w-2/5 bg-[#ad937c] hover:bg-[#ccb196] text-white py-2 px-4 md:px-12 text-m"
                >
                    <span>Apply</span>
                </button>
            </div>
            <div className='w-full'>
                <div className='flex justify-between mt-4'>
                    <div className='flex flex-col space-y-2'>
                        <span className='text-gray-600'>Before discount</span>
                        <span className='text-gray-600'>Discount</span>
                        <span className='text-gray-600'>Discount code</span>
                        <span className='text-gray-600'>Shipping</span>
                        <span className='font-bold text-gray-800'>Total</span>
                    </div>
                    <div className='flex flex-col space-y-2 items-end'>
                        <span className='text-gray-600'>${total.toFixed(2)}</span>
                        <span className='text-gray-600'>0</span>
                        <span className='text-gray-600'>0</span>
                        <span className='text-gray-600'>$9.99</span>
                        <span className='font-bold text-gray-800'>${(9.99 + total).toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default CheckoutShoppingCart