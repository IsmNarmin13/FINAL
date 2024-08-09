'use client';
import { useState } from 'react';
import styles from '../carousel/carousel.module.css';
import { Link } from 'react-router-dom';

export default function Carousel({ books }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? books.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === books.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleRadioChange = (index) => {
        setCurrentIndex(index);
    };

    console.log(books);

    return (
        <div className={styles.carousel}>
            <div className={styles.carouselInner}>
                <div className={styles.carouselItem}>
                    <Link href={`/shop/books/${books[currentIndex].id}`} className={styles.linkWrapper}>
                        <img
                            className={styles.carouselImage}
                            src={`/book-4.png`} 
                            alt={books[currentIndex].title} 
                        />
                        <div className={styles.bookTitle}>{books[currentIndex].title}</div>
                        <div className={styles.bookAuthor}>{books[currentIndex].author.pseudonym}</div>
                    </Link>
                </div>
                <button className={styles.prevButton} onClick={handlePrev}>&#10094;</button>
                <button className={styles.nextButton} onClick={handleNext}>&#10095;</button>
            </div>
            <div className={styles.radioButtons}>
                {books.map((_, index) => (
                    <div key={index}>
                        <input
                            type='radio'
                            checked={currentIndex === index}
                            onChange={() => handleRadioChange(index)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
