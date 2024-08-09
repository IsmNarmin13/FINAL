import React from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const Pagination = ({ pageCount, currentPage, onPageChange }) => {
  const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1);

  const renderPageNumbers = () => {
    if (pageCount <= 9) {
      return pageNumbers.map(pageNumber => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`relative z-10 inline-flex items-center px-4 py-3 text-sm ${
            currentPage === pageNumber
              ? 'bg-[#ccb196] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
              : 'bg-gray-200 text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
          }`}
        >
           <span>{pageNumber<10 ? "0"+pageNumber : pageNumber}</span>
        </button>
      ));
    }

    const visiblePageNumbers = [];
    if (currentPage <= 4) {
      visiblePageNumbers.push(...pageNumbers.slice(0, 5), '...');
    } else if (currentPage >= pageCount - 3) {
      visiblePageNumbers.push(1, '...', ...pageNumbers.slice(pageCount - 5));
    } else {
      visiblePageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', pageCount);
    }

    return visiblePageNumbers.map((item, index) => (
      <button
        key={index}
        onClick={() => {
          if (item !== '...') {
            onPageChange(item);
          }
        }}
        className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold ${
          item === currentPage
            ? 'bg-orange-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
        }`}
      >
        {item}
      </button>
    ));
  };

  return (
    <div className="flex items-center justify-center bg-white px-4 py-3 sm:px-6">
      <div className="flex justify-center">
        <div >
          <nav className="inline-flex space-x-2 rounded-md shadow-sm" aria-label="Pagination">
            {renderPageNumbers()}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-3 text-white ${
                currentPage === 1 ? 'bg-gray-200 hover:bg-gray-200' : 'bg-[#ccb196]'
              }`}
            >
            <BsChevronLeft className="h-4 w-4 text-white" aria-hidden="true" />
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === pageCount}
              className={`relative inline-flex items-center px-4 py-3 text-white ${
                currentPage === pageCount ? 'bg-gray-200  hover:bg-gray-200' : 'bg-[#ccb196]'
              }`}
            >
            <BsChevronRight className="h-4 w-4 text-white" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;