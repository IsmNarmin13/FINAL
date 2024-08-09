import React, { useEffect, useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import config from '../../config';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Detail = ({ book }) => {
  let navigate = useNavigate();

  const renderStars = (count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(<AiFillStar key={i} className="text-[#ad937c]" />);
    }
    for (let i = count; i < 5; i++) {
      stars.push(<AiOutlineStar key={i} className="text-[#ad937c]" />);
    }
    return stars;
  };

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => 
  {
    fetchCartItems()
  }, [book])
  const fetchCartItems = async () => {
    try {
      let token = Cookies.get('accessToken');
      const response = await fetch(`${config.backApi}/carts`, {
        method: 'GET',
        headers: {
          'accept': '/',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setCartItems(data.items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleCheckUniqueCartItemById = async (id) => {
    try {
      let token = Cookies.get('accessToken');
      const response = await fetch(`${config.backApi}/carts/book-in-cart/${id}`, {
        method: 'GET',
        headers: {
          'accept': '/',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      let isExist = await response.json();
      return isExist;
    } catch (error) {
      console.error("Error checking cart item:", error);
    }
  };

  const handleAddToCart = async (id) => {
    try {
      let token = Cookies.get('accessToken');
      let isExist = await handleCheckUniqueCartItemById(id);

      if (!isExist) {
        const response = await fetch(`${config.backApi}/carts/${id}`, {
          method: 'POST',
          headers: {
            'accept': '/',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({})
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } else {
        let item = cartItems.find((c) => c.book.id === book.id);
        let itemId = item.id;
        const response = await fetch(`${config.backApi}/carts/items/${itemId}`, {
          method: 'PUT',
          headers: {
            'accept': '/',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item.quantity + 1)
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleNavToCheckout = async (id) => {
    await handleAddToCart(book.id);
    navigate('/checkout');
  };

  return (
    <div className='flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 p-6 md:p-12 bg-white shadow-md rounded-lg'>
      {book ? (
        <>
          <div>
            <img
              src={book.posterUrl}
              alt={book.title}
              className='w-96 h-[36rem] object-cover mx-auto md:mx-0 rounded-lg shadow-md'
            />
          </div>
          <div className='md:ms-8 w-full md:w-3/5'>
            <h3 className='lg:text-4xl md:text-2xl text-xl font-semibold text-gray-800 mt-4 md:mt-0'>
              {book.title}
            </h3>
            <p className='text-gray-600 mt-2'>{book.author.pseudonym}</p>
            <div className='flex space-x-2 my-5 text-black text-3xl'>
              {renderStars(5)}
            </div>
            <p className='font-bold my-2 lg:text-xl md:text-lg text-md'>
              ${book.price}
            </p>
            <div className='flex md:flex-row space-x-20 md:space-x-16 mt-4'>
              <div className='space-y-3'>
                <p className='text-gray-500'>Genre: </p>
                <p className='text-gray-500'>Pages: </p>
                <p className='text-gray-500'>Language: </p>
                <p className='text-gray-500'>Quantity: </p>
              </div>
              <div className='space-y-3'>
                <p className='text-gray-800'>{book.genre.name}</p>
                <p className='text-gray-800'>{book.pageCount}</p>
                <p className='text-gray-800'>{book.language.name}</p>
                <p className='text-gray-800'>{book.quantity}</p>
              </div>
            </div>
            <div className='detail-buttons flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-8 items-center md:items-start'>
              <button onClick={() => handleAddToCart(book.id)} className='bg-[#ad937c] hover:bg-[#926b4d] text-white py-2.5 px-7 rounded-lg'>
                Add to cart
              </button>
              <button onClick={() => handleNavToCheckout(book.id)} className='bg-[#ad937c] hover:bg-[#926b4d] text-white py-2.5 px-7 rounded-lg'>
                Buy Now
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>Book not found</p>
      )}
    </div>
  );
};

export default Detail;
