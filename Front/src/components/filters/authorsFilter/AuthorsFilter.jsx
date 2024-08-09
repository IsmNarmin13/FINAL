import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AuthorsFilter = ({ addFilter, removeFilter, setSelectedAuthorIds }) => {
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:6060/api/v1/authors")
      .then(response => {
        setAuthors(response.data);
      })
      .catch(error => {
        console.error("Error fetching authors:", error);
      });
  }, []);

  const toggleAuthorSelection = (author) => {
    let updatedAuthors;

    if (selectedAuthors.includes(author)) {

      updatedAuthors = selectedAuthors.filter((a) => a !== author);
      removeFilter(author);
    } else {
      updatedAuthors = [...selectedAuthors, author];
      addFilter(author);
    }

    setSelectedAuthors(updatedAuthors);

    const authorIds = updatedAuthors.map((a) => a.id);
    setSelectedAuthorIds(authorIds);
  };

  return (
    <div className="authorsCategories overflow-y-auto space-y-2 scrollbar max-h-[200px]">
      {authors.map((author) => (
        <div key={author.id} className="flex items-center">
          <input
            type="checkbox"
            id={author.id}
            checked={selectedAuthors.includes(author)}
            onChange={() => {
              toggleAuthorSelection(author);
            }}
            className="mr-4 w-4 h-4 accent-orange-600"
          />
          <label htmlFor={author.id}>
            <span>{author.pseudonym}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default AuthorsFilter;
