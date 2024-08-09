import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "../bookCard/BookCard";
import SortBy from '../sortBy/SortBy';
import { PiX } from "react-icons/pi";
import styles from './content.module.css';
import Pagination from '../pagination/Pagination';
import Sidebar from '../../components/sidebar/Sidebar';

export default function Content({ selectedFilters, removeFilter, clearAllFilters, addFilter, filteredBooks, currentFilterState, search }) {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [pageSize, setPageSize] = useState(6);

    useEffect(() => {
        if (filteredBooks.items && filteredBooks.totalCount > 0) {
            setBooks(filteredBooks.items);
            setPageCount(filteredBooks.totalPages);
            setPageSize(filteredBooks.pageSize);
        } else if (currentFilterState) {
            setBooks([]);
        } else {
            fetchBooks(currentPage, search);
        }
    }, [filteredBooks, currentPage, search, currentFilterState]);

    const fetchBooks = async (pageNumber, searchQuery) => {
        try {
            let url = `http://localhost:6060/api/v1/books?PageSize=${pageSize}&PageNumber=${pageNumber}`;
            const { genreIds, authorIds, languageIds, minPrice, maxPrice } = currentFilterState || {};

            if (searchQuery) {
                url += `&Title=${searchQuery}`;
            }
            if (genreIds && genreIds.length > 0) {
                genreIds.forEach(id => {
                    url += `&GenreIds=${id}`;
                });
            }
            if (authorIds && authorIds.length > 0) {
                authorIds.forEach(id => {
                    url += `&AuthorIds=${id}`;
                });
            }
            if (languageIds && languageIds.length > 0) {
                languageIds.forEach(id => {
                    url += `&LanguageIds=${id}`;
                });
            }
            if (minPrice) {
                url += `&MinPrice=${minPrice}`;
            }
            if (maxPrice) {
                url += `&MaxPrice=${maxPrice}`;
            }

            const response = await axios.get(url);
            setBooks(response.data.items || []);
            setPageCount(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        fetchBooks(pageNumber, search);
    };

    return (
        <div>
            <div className="flex flex-row gap-5">
                <section>
                    <Sidebar addFilter={addFilter} removeFilter={removeFilter} clearAllFilters={clearAllFilters} />
                </section>
                <section>
                    <div className="flex justify-between items-center mb-7 mt-10 md:mt-0 border-t-2 md:border-t-0">
                        <div className="tags flex space-x-4 text-sm">
                            {selectedFilters.map((filter) => (
                                <div key={filter.id} className="tag flex px-2 py-1 bg-gray-200 items-center">
                                    {filter.name}
                                    <button
                                        onClick={() => removeFilter(filter)}
                                        className="tag-remove-button ms-2"
                                    >
                                        <PiX />
                                    </button>
                                </div>
                            ))}
                            {selectedFilters.length > 0 && (
                                <button
                                    onClick={clearAllFilters}
                                    className="clear-all-button px-2 py-1 bg-gray-200"
                                >
                                    Clear all filters
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-2">
                        {books && books.length > 0 ? (
                            <div className={styles.container}>
                                {books.map((book) => (
                                    <BookCard key={book.id} book={book} />
                                ))}
                            </div>
                        ) : (
                            <div>No books found</div> 
                        )}
                    </div>
                    {books.length > 0 && ( 
                        <Pagination
                            currentPage={currentPage}
                            pageCount={pageCount}
                            onPageChange={handlePageChange}
                        />
                    )}
                </section>
            </div>
        </div>
    );
}
