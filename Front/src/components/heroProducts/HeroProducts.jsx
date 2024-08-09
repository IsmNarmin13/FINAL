import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "../bookCard/BookCard";
import styles from './heroProducts.module.css'
export default function HeroProducts()
{
    let [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`http://localhost:6060/api/v1/books?PageSize=4&PageNumber=1`);
                setBooks(response.data.items || []);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="flex ">
            {books.length > 0 ? (
                <div className={styles.booksContainer}>
                    {books.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            ) : <div>No books found</div>}
        </div>
    )
}