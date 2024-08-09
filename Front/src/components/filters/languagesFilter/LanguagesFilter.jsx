import axios from 'axios';
import React, { useState, useEffect } from 'react';

const LanguagesFilter = ({ addFilter, removeFilter, setSelectedLanguageIds }) => {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [languages, setLanguages] = useState([]);

  const toggleLanguageSelection = (language) => {
    let updatedLanguages;

    if (selectedLanguages.includes(language)) {
      updatedLanguages = selectedLanguages.filter((l) => l !== language);
      removeFilter(language)
    } else {
      updatedLanguages = [...selectedLanguages, language];
      addFilter(language)
    }

    setSelectedLanguages(updatedLanguages);

    const languageIds = updatedLanguages.map((l) => l.id);
    setSelectedLanguageIds(languageIds)
  };

  useEffect(() => {
    axios.get("http://localhost:6060/api/v1/languages")
      .then(response => {
        setLanguages(response.data);
      })
      .catch(error => {
        console.error("Error fetching languages:", error);
      });
  }, []);

  return (
    <div className="languagesCategories overflow-y-auto space-y-2 scrollbar max-h-[200px]"> 
      {languages.map((language) => (
        <div key={language.id} className="flex items-center">
          <input
            type="checkbox"
            id={language.id}
            checked={selectedLanguages.includes(language)}
            onChange={() => {
              toggleLanguageSelection(language);
            }}
            className="mr-4 w-4 h-4 accent-orange-600"
          />
          <label htmlFor={language.id}>
            <span>{language.name}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default LanguagesFilter;
