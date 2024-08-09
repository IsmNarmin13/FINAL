import React, { useState, useEffect } from 'react';
import { BiX } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import config from '../../config';
import Cookies from 'js-cookie';
const Cart = () => {
    const [total, setTotal] = useState(0);
    const [cartItems, setCartItems] = useState([])

    const fetchCartItems = async () => {
        let token = Cookies.get('accessToken')
        if (token) {

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
    }

    useEffect(() => {
        let token = Cookies.get('accessToken')
        if (token) { 
            fetchCartItems()
        }
    }, [])


    const handleIncrease = async (id, quantity) => {
        let token = Cookies.get('accessToken')
        if (token) {

            const response = await fetch(`${config.backApi}/carts/items/${id}`, {
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
    }

    const handleDecrease = async (id, quantity) => {
        let token = Cookies.get('accessToken')
        if (token) {

            const response = await fetch(`${config.backApi}/carts/items/${id}`, {
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

    }

    const handleDelete = async (id) => {
        let token = Cookies.get('accessToken')
        if (token) {

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
    }

    return (
        <>
            {cartItems.length === 0 ? (
                <p className='text-center pb-5'>You have no books in the basket.</p>
            ) : (
                <div>
                    <div className="">
                        {cartItems.map((item) => (
                            <div key={item.book.id} className="md:flex md:justify-between md:items-center my-4 border-t-2 space-y-4 md:space-y-0">
                                <div className='md:w-1/5 mt-4'>
                                    <img className='w-60 h-40 object-contain bg-gray-100' src={`${item.book.posterUrl}`} />
                                </div>
                                <div className='md:w-1/5'>
                                    <h3 className="md:text-xl text-m font-bold">{item.book.title}</h3>
                                    <p className="text-gray-500">{item.book.author.pseudonym}</p>
                                </div>
                                <div className='md:w-2/5 flex justify-around items-center p-2  md:p-0 md:flex-row'>
                                    <div className='md:w-1/5 font-bold'>
                                        ${item.book.price}
                                    </div>
                                    <div className='md:w-1/5 flex'>
                                        <button
                                            className="font-bold"
                                            onClick={() => {
                                                if (item.quantity > 1) {
                                                    handleDecrease(item.id, item.quantity)
                                                }
                                            }}
                                        >
                                            -
                                        </button>
                                        <span className="px-3 py-1 m-2">{item.quantity}</span>
                                        <button
                                            className="font-bold"
                                            onClick={() => handleIncrease(item.id, item.quantity)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button className="text-gray-800" onClick={() => handleDelete(item.id)}>
                                        <BiX className='w-8 h-8' />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='w-full border-t-2 flex justify-end'>
                        <div className='md:float-right'>
                            <div className='flex justify-between w-48 mt-4'>
                                <div className='flex flex-col space-y-2'>
                                    <span className='text-gray-600'>Books</span>
                                    <span className='text-gray-600'>Discount</span>
                                    <span className='text-gray-600'>Delivery</span>
                                    <span className='font-bold text-gray-800'>Total</span>
                                </div>
                                <div className='flex flex-col space-y-2'>
                                    <span className='text-gray-600'>${total.toFixed(2)}</span>
                                    <span className='text-gray-600'>0</span>
                                    <span className='text-gray-600'>$9.99</span>
                                    <span className='font-bold text-gray-800'>${(9.99 + total).toFixed(2)}</span>
                                </div>
                            </div>
                            <Link to="/checkout"
                                className="bg-[#ad937c] text-white py-2 px-12 mt-2 mb-5 text-m flex items-center "
                            >
                                <span className='me-2'>Checkout</span>
                                <img src='./images/arrow-icon.png' />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Cart;
