import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

import Home from './pages/home/Home'
import SignUp from './pages/authentication/SignUp'
import SignIn from './pages/authentication/SignIn'
import Wishlist from './pages/wishlist/Wishlist'
import Cart from './pages/cart/Cart'
import Authors from './pages/admin/authors/Authors'
import Books from './pages/admin/books/Books'
import Genres from './pages/admin/genres/Genres'
import Languages from './pages/admin/languages/Languages'
import AllBooks from './pages/allBooks/AllBooks'
import Book from './pages/book/Book'
import Checkout from './pages/checkout/Checkout';
import Confirmation from './components/confirmation/Confirmation'
import Shop from './pages/shop/Shop';

function App() {
  const [role, setRole] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const accessToken = Cookies.get("accessToken")
    const refreshToken = Cookies.get("refreshToken")

    if (accessToken && refreshToken) {
      // console.log(accessToken)
      // console.log(refreshToken)
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  useEffect(() => {
    let token = Cookies.get('accessToken')
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
        setRole(userRole)
      } catch (error) {
        console.error('Failed to decode token', error)
      }
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/shop/books/*' element={<Shop />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/shop/book/*' element={<Book />} />
        <Route path='/signIn' element={<SignIn />} />
        {isLoggedIn ? (
          <>
            <Route path='/wishList' element={<Wishlist />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/checkout/confirmation' element={<Confirmation />} />
          </> 
        ): (<></>)}

        {role === 'Admin' && (
          <>
            <Route path='/admin/authors' element={<Authors />} />
            <Route path='/admin/books' element={<Books />} />
            <Route path='/admin/genres' element={<Genres />} />
            <Route path='/admin/languages' element={<Languages />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
