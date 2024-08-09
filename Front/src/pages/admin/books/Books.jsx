import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Navbar from '../../../components/navbar/Navbar';

export default function Books() {
    const [languages, setLanguages] = useState([]);
    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [book, setBook] = useState({
        title: '',
        description: '',
        pageCount: '',
        price: '',
        languageId: '',
        quantity: '',
        authorPseudonym: '',
        genreId: '',
        poster: null,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                let response = await axios.get('http://localhost:6060/api/v1/authors');
                setAuthors(response.data);

                response = await axios.get('http://localhost:6060/api/v1/genres');
                setGenres(response.data);

                response = await axios.get('http://localhost:6060/api/v1/languages');
                setLanguages(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchInfo();
    }, []);

    const handlePosterChange = (e) => {
        const file = e.target.files[0];
        setBook({ ...book, poster: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', book.title);
            formData.append('description', book.description);
            formData.append('pageCount', book.pageCount);
            formData.append('price', book.price);
            formData.append('languageId', book.languageId);
            formData.append('quantity', book.quantity);
            formData.append('authorPseudonym', book.authorPseudonym);
            formData.append('genreId', book.genreId);
            formData.append('poster', book.poster);

            const response = await axios.post('http://localhost:6060/api/v1/books', formData);

            console.log('Book added successfully:', response.data);
            setBook({
                title: '',
                description: '',
                pageCount: '',
                price: '',
                languageId: '',
                quantity: '',
                authorPseudonym: '',
                genreId: '',
                poster: null,
            });

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

            setIsModalOpen(true);

        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Navbar/>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center">
                <div className="w-full max-w-2xl mt-10 p-6 bg-white shadow-md rounded-lg">
                    <h2 className="text-2xl font-bold mb-6 text-center">Add New Book</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                            <input
                                type="text"
                                value={book.title}
                                onChange={(e) => setBook({ ...book, title: e.target.value })}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                            <textarea
                                value={book.description}
                                onChange={(e) => setBook({ ...book, description: e.target.value })}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Page Count:</label>
                            <input
                                type="number"
                                min={1}
                                value={book.pageCount}
                                onChange={(e) => setBook({ ...book, pageCount: e.target.value })}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Price:</label>
                            <input
                                
                                type="number"
                                value={book.price}
                                min={1}
                                step="any"
                                onChange={(e) => setBook({ ...book, price: e.target.value })}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Language:</label>
                            <select
                                value={book.languageId}
                                onChange={(e) => setBook({ ...book, languageId: e.target.value })}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="" disabled>Select a language</option>
                                {languages.map((language) => (
                                    <option key={language.id} value={language.id}>
                                        {language.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Quantity:</label>
                            <input
                                type="number"
                                min={1}
                                value={book.quantity}
                                onChange={(e) => setBook({ ...book, quantity: e.target.value })}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Author:</label>
                            <select
                                value={book.authorPseudonym}
                                onChange={(e) => setBook({ ...book, authorPseudonym: e.target.value })}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="" disabled>Select an author</option>
                                {authors.map((author) => (
                                    <option key={author.id} value={author.pseudonym}>
                                        {author.pseudonym}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Genre:</label>
                            <select
                                value={book.genreId}
                                onChange={(e) => setBook({ ...book, genreId: e.target.value })}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="" disabled>Select a genre</option>
                                {genres.map((genre) => (
                                    <option key={genre.id} value={genre.id}>
                                        {genre.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Poster:</label>
                            <input
                                type="file"
                                ref={fileInputRef} // Attach ref to the file input
                                onChange={handlePosterChange}
                                accept="image/*"
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Add Book
                            </button>
                        </div>
                    </form>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                            <h2 className="text-lg font-bold mb-4">Success</h2>
                            <p className="mb-4">The book was successfully added!</p>
                            <button
                                onClick={closeModal}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
