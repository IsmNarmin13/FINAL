import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeartOutline, HeartSharp } from 'react-ionicons';
import { CartOutline, CartSharp } from 'react-ionicons';
import Cookies from "js-cookie";
import config from "../../config";
import styles from "./bookCard.module.css";

export default function BookCard({ book }) {
    const [isHeartHovered, setIsHeartHovered] = useState(false);
    const [isHeartClicked, setIsHeartClicked] = useState(false);
    const [isCartHovered, setIsCartHovered] = useState(false);
    const [isCartClicked, setIsCartClicked] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = Cookies.get("accessToken");
        const refreshToken = Cookies.get("refreshToken");

        if (accessToken && refreshToken) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            const fetchWishlistItems = async () => {
                try {
                    let token = Cookies.get('accessToken');
                    const response = await fetch(`${config.backApi}/wisher`, {
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
                    setWishlistItems(data.items);
                    const isBookInWishlist = data.items.some(item => item.book.id === book.id);

                    // console.log(isBookInWishlist);
                    setIsHeartClicked(isBookInWishlist);
                } catch (error) {
                    console.error("Error fetching wishlist items:", error);
                }
            };
            fetchWishlistItems();
        }
    }, [isLoggedIn, isHeartClicked]);

    useEffect(() => {
        if (isLoggedIn) {
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
                    const isBookInCart = data.items.some(item => item.book.id === book.id);

                    // console.log(isBookInCart);
                    setIsCartClicked(isBookInCart);
                } catch (error) {
                    console.error("Error fetching cart items:", error);
                }
            };
            fetchCartItems();
        }
    }, [isLoggedIn, isCartClicked]);

    const handleHeartClick = () => {
        setIsHeartClicked(prevState => !prevState);
    };

    const handleCartClick = () => {
        setIsCartClicked(prevState => !prevState);
    };

    const handleAddToWishlist = async (id) => {
        if (isLoggedIn) {
            try {
                let token = Cookies.get('accessToken');

                let isExist = await handleCheckUniqueWishlistItemById(id);

                if (!isExist) {
                    const response = await fetch(`${config.backApi}/wisher/${id}`, {
                        method: 'PUT',
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
                    const response = await fetch(`${config.backApi}/wisher/${id}`, {
                        method: 'DELETE',
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
                }
                handleHeartClick();
            } catch (error) {
                console.error("Error adding to wishlist:", error);
            }
        } else {
            navigate('/signIn');
        }
    };

    const handleCheckUniqueWishlistItemById = async (id) => {
        try {
            let token = Cookies.get('accessToken');

            const response = await fetch(`${config.backApi}/wisher/book-in-wish/${id}`, {
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
            console.error("Error checking wishlist item:", error);
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
        if (isLoggedIn) {
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
                        method: 'DELETE',
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
                }

                handleCartClick();
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        } else {
            navigate('/signIn');
        }
    };

    return (
        <div className={styles.bookCard}>
            <div className={styles.imageContainer}>
                <Link to={`/shop/book/?bookId=${book.id}`}>
                    <img className={styles.bookImage} src={`${book.posterUrl}`} alt={book.title} />
                </Link>
            </div>
            <div className={styles.bookInfo}>
                <div className={styles.bookTitle}>{book.title}</div>
                <div className={styles.bookDescription}>{book.author.pseudonym}</div>
            </div>
            <div className={styles.iconContainer}>
                {isHeartClicked ? (
                    <HeartSharp
                        className={styles.icon}
                        onMouseEnter={() => setIsHeartHovered(true)}
                        onMouseLeave={() => setIsHeartHovered(false)}
                        onClick={() => handleAddToWishlist(book.id)}
                    />
                ) : (
                    <HeartOutline
                        className={styles.icon}
                        onMouseEnter={() => setIsHeartHovered(true)}
                        onMouseLeave={() => setIsHeartHovered(false)}
                        onClick={() => handleAddToWishlist(book.id)}
                    />
                )}
                {isCartClicked ? (
                    <CartSharp
                        className={styles.icon}
                        onMouseEnter={() => setIsCartHovered(true)}
                        onMouseLeave={() => setIsCartHovered(false)}
                        onClick={() => handleAddToCart(book.id)}
                    />
                ) : (
                    <CartOutline
                        className={styles.icon}
                        onMouseEnter={() => setIsCartHovered(true)}
                        onMouseLeave={() => setIsCartHovered(false)}
                        onClick={() => handleAddToCart(book.id)}
                    />
                )}
            </div>
        </div>
    );
}
