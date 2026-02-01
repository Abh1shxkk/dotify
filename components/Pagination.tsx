import React from 'react';
import { ChevronLeft, ChevronRight } from './ui/Icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  // Logic to show limited page numbers - fewer on mobile
  const getPageNumbers = (isMobile: boolean) => {
    const pages: (number | string)[] = [];
    const maxVisible = isMobile ? 3 : 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const mobilePages = getPageNumbers(true);
  const desktopPages = getPageNumbers(false);

  return (
    <nav className="flex items-center justify-center space-x-1 sm:space-x-2 mt-6 sm:mt-8 select-none" aria-label="Pagination">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 sm:p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all min-w-[40px] min-h-[40px] flex items-center justify-center"
        aria-label="Go to previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Mobile Page Numbers */}
      <div className="flex space-x-1 sm:hidden">
        {mobilePages.map((page, idx) => (
          <React.Fragment key={idx}>
            {page === '...' ? (
              <span className="w-8 h-10 flex items-center justify-center text-slate-400 text-sm">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`min-w-[36px] h-10 px-2 rounded-lg text-sm font-medium transition-all ${currentPage === page
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Desktop Page Numbers */}
      <div className="hidden sm:flex space-x-1">
        {desktopPages.map((page, idx) => (
          <React.Fragment key={idx}>
            {page === '...' ? (
              <span className="w-10 h-10 flex items-center justify-center text-slate-400">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${currentPage === page
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 sm:p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all min-w-[40px] min-h-[40px] flex items-center justify-center"
        aria-label="Go to next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
};