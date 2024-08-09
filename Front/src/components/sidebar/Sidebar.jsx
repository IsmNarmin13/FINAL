import { PiX } from 'react-icons/pi';
import React, { useState } from 'react';
import PriceRangeSlider from '../priceRangeSlider/PriceRangeSlider';
import AuthorsFilter from '../filters/authorsFilter/AuthorsFilter';
import LanguagesFilter from '../filters/languagesFilter/LanguagesFilter';
import AllGenres from '../filters/allGenres/AllGenres';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ addFilter, removeFilter, clearAllFilters }) {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 500]);
  const navigate = useNavigate();

  const handleApplyFilters = () => {
    clearAllFilters();
    const genreIds = selectedGenres.join(',');
    const authorIds = selectedAuthors.join(',');
    const languageIds = selectedLanguages.join(',');
    const [minPrice, maxPrice] = selectedPriceRange;

    const queryParams = new URLSearchParams();
    if (genreIds) queryParams.append('genreIds', genreIds);
    if (authorIds) queryParams.append('authorIds', authorIds);
    if (languageIds) queryParams.append('languageIds', languageIds);
    if (minPrice > 0 || maxPrice <= 1000) {
      queryParams.append('minPrice', minPrice);
      queryParams.append('maxPrice', maxPrice);
    }

    navigate(`/shop/books/?${queryParams.toString()}`);
  };

  return (
    <div className='w-full border border-gray-800 p-4'>
      <p className='font-bold text-lg border-b pb-3 border-gray-800'>Categories</p>
      <p className='font-bold text-lg my-4'>Price</p>
      <PriceRangeSlider setSelectedPriceRange={setSelectedPriceRange} />
      <p className='font-bold text-lg my-4'>All Genres</p>
      <AllGenres
        addFilter={addFilter}
        removeFilter={removeFilter}
        setSelectedGenreIds={setSelectedGenres}
      />
      <p className='font-bold text-lg my-4'>Authors</p>
      <AuthorsFilter
        addFilter={addFilter}
        removeFilter={removeFilter}
        setSelectedAuthorIds={setSelectedAuthors}
      />
      <p className='font-bold text-lg my-4'>Language</p>
      <LanguagesFilter
        addFilter={addFilter}
        removeFilter={removeFilter}
        setSelectedLanguageIds={setSelectedLanguages}
      />
      <button className='w-full py-3 bg-[#ccb196] text-white my-3' onClick={handleApplyFilters}>Apply</button>
      <button className='flex py-3 border border-gray-800 justify-center items-center w-full text-gray-600' onClick={clearAllFilters}>
        <PiX className='me-3' />Clear Filters
      </button>
    </div>
  );
}
