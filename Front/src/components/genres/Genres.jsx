import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";

function Genres() {
    const [genres, setGenres] = useState([])

    useEffect(() => {
        axios.get("http://localhost:6060/api/v1/genres")
            .then(response => {
                setGenres(response.data)
            })
            .catch(error => {
                console.error("Error fetching genres:", error)
            })
    }, [])

    return (
        <>
            <Navbar />
            <div className="genres-container">
                <h2>Genres</h2>
                <ul>
                    {genres.map(genre => (
                        <Link to={`/shop/books/${genre.id}`} key={genre.id}>
                            <p>{genre.name}</p>
                        </Link>
                    ))}
                </ul>
            </div>
            <Footer />
        </>
    )
}

export default Genres;
