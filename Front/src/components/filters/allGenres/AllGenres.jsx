import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AllGenres = ({ addFilter, removeFilter, setSelectedGenreIds }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:6060/api/v1/genres")
      .then(response => {
        setGenres(response.data);
      })
      .catch(error => {
        console.error("Error fetching genres:", error);
      });
  }, []);

  const toggleCategorySelection = (category) => {
    let updatedCategories;

    if (selectedCategories.includes(category)) {
      updatedCategories = selectedCategories.filter((c) => c !== category);
      removeFilter(category);
    } else {
      updatedCategories = [...selectedCategories, category];
      addFilter(category);
    }

    setSelectedCategories(updatedCategories);
    const genreIds = updatedCategories.map(c => c.id);
    setSelectedGenreIds(genreIds);
  };

  return (
    <div className="allBooksCategories overflow-y-auto space-y-2 scrollbar max-h-[200px]">
      {genres.map((category) => (
        <div key={category.id} className="flex items-center">
          <input
            type="checkbox"
            id={category.id}
            checked={selectedCategories.includes(category)}
            onChange={() => {
              toggleCategorySelection(category);
            }}
            className="mr-4 w-4 h-4 accent-orange-600"
          />
          <label htmlFor={category.id}>
            <span>{category.name}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default AllGenres;
