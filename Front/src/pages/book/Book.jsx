import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Detail from '../../components/detail/Detail';
import Tabs from '../../components/tabs/Tabs';
import Recommendation from '../../components/recommendation/Recommendation';
import config from '../../config';
import queryString from 'query-string';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const Book = () => {
    const location = useLocation();
    const [book, setBook] = useState(null);
    const [books, setBooks] = useState([]);
    const { bookId } = queryString.parse(location.search);

    const fetchBook = async () => {
        if (bookId) {
            try {
                const response = await fetch(`${config.backApi}/books/${bookId}`, {
                    method: 'GET',
                });
                const data = await response.json();
                console.log(data);
                setBook(data);
            } catch (error) {
                console.error("Error fetching the book data:", error);
            }
        }
    };

    const fetchBooks = async () => {
        try {
            const response = await fetch(`${config.backApi}/books/?PageSize=4&PageNumber=1`, {
                method: 'GET',
            });
            const data = await response.json();
            console.log(data);
            setBooks(data);
        } catch (error) {
            console.error("Error fetching the book data:", error);
        }
    };

    useEffect(() => {
        fetchBook();
        fetchBooks();
    }, [bookId]);

    return (
        <div>
            <Navbar />
            <div className=''>
                <Detail book={book} />
                {book ? <Tabs book={book} /> : <></>}
                <Recommendation currentBookId={book ? book.id : null} />
            </div>
            <Footer />
        </div>
    );
};

export default Book;
