import React from "react";

export default function BookDescription({ book }) {
    const {
        posterUrl,
        title,
        genre = {},
        author = {},
        pageCount,
        price,
        soldUnits,
        quantity,
        language
    } = book

    console.log(book.posterUrl);
    return (
        <div className="container">
            <div className="book-section animate__animated animate__zoomInUp">
                <div className="book-cover">
                    {posterUrl && <img src={book.posterUrl}  alt="Book Cover" />}
                    {/* src={posterUrl} */}
                </div>
                <div className="book-info text-center">
                    {title && <h1>"{title}"</h1>}
                    {genre.name && <p>Genre: {genre.name}</p>}
                    {author.pseudonym && <p>Author: {author.pseudonym}</p>}
                    {pageCount && <p>Pages count: {pageCount}</p>}
                    {price && <p>Price: {price}</p>}
                    {soldUnits && <p>Sold units: {soldUnits}</p>}
                    {quantity && <p>Quantity: {quantity}</p>}
                    {language && <h2>Language: "{language.name}"</h2>}
            <p>{book.description}</p>

                    <button className="buy-button">Get Book</button>
                </div>
            </div>
        </div>
    );
}

