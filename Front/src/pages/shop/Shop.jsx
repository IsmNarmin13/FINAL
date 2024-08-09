import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import Content from '../../components/content/Content';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

export default function Shop() {
    const location = useLocation();
    const [filteredBooks, setFilteredBooks] = useState([]);
    const { genreIds, authorIds, languageIds, bookId, search, minPrice, maxPrice } = queryString.parse(location.search);
    const [selectedFilters, setSelectedFilters] = useState([]);

    const currentFilterState = {
        genreIds: genreIds ? genreIds.split(',') : [],
        authorIds: authorIds ? authorIds.split(',') : [],
        languageIds: languageIds ? languageIds.split(',') : [],
        minPrice: minPrice || 0,
        maxPrice: maxPrice || 1000,
    };

    const addFilter = (filter) => {
        if (!selectedFilters.includes(filter)) {
            setSelectedFilters((prevFilters) => [...prevFilters, filter]);
        }
    };

    const removeFilter = (filter) => {
        setSelectedFilters((prevFilters) => prevFilters.filter((f) => f !== filter));
    };

    const clearAllFilters = () => {
        setSelectedFilters([]);
    };

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                if (bookId) {
                    const response = await axios.get(`http://localhost:6060/api/v1/books/${bookId}`);
                    setFilteredBooks([response.data]);
                } else {
                    let url = `http://localhost:6060/api/v1/books?PageSize=6&PageNumber=1`;

                    if (genreIds) {
                        const genreIdsArray = genreIds.split(',');
                        genreIdsArray.forEach(id => {
                            url += `&GenreIds=${id}`;
                        });
                    }
                    if (authorIds) {
                        const authorIdsArray = authorIds.split(',');
                        authorIdsArray.forEach(id => {
                            url += `&AuthorIds=${id}`;
                        });
                    }
                    if (languageIds) {
                        const languageIdsArray = languageIds.split(',');
                        languageIdsArray.forEach(id => {
                            url += `&LanguageIds=${id}`;
                        });
                    }
                    if (search) {
                        url += `&Title=${search}`;
                    }
                    if (minPrice) {
                        url += `&MinPrice=${minPrice}`;
                    }
                    if (maxPrice) {
                        url += `&MaxPrice=${maxPrice}`;
                    }

                    const response = await axios.get(url);
                    setFilteredBooks(response.data || []);
                }
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        fetchBooks();
    }, [genreIds, authorIds, languageIds, bookId, search, minPrice, maxPrice]);

    return (
        <div>
            <Navbar />
            <div className='container mx-auto px-16 my-5'>
                <div>
                    <section className='flex'>
                        <Content
                            selectedFilters={selectedFilters}
                            addFilter={addFilter}
                            removeFilter={removeFilter}
                            clearAllFilters={clearAllFilters}
                            filteredBooks={filteredBooks}
                            currentFilterState={currentFilterState}
                            search={search}
                        />
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
}
