import React, { useState } from 'react';
import { Sun, Moon, Menu, X } from './ui/Icons';
import { Theme } from '../types';

type Page = 'generator' | 'use-cases' | 'connect';

interface LayoutProps {
  children: React.ReactNode;
  theme: Theme;
  toggleTheme: () => void;
  currentPage: Page;
  navigateTo: (page: Page) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, theme, toggleTheme, currentPage, navigateTo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { page: Page; label: string }[] = [
    { page: 'generator', label: 'Generator' },
    { page: 'use-cases', label: 'Use Cases' },
    { page: 'connect', label: 'Connect' },
  ];

  const handleNavigate = (page: Page) => {
    navigateTo(page);
    setMobileMenuOpen(false);
  };

  return (
    <div className={`min-h-screen flex flex-col text-slate-900 dark:text-slate-100 transition-colors duration-300`}>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-black/80 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer"
            onClick={() => handleNavigate('generator')}
            role="button"
            aria-label="Go to home"
          >
            <img src="/logo.png" alt="Dotify Logo" className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg" />
            <span className="text-lg sm:text-xl font-bold text-primary-500">
              Dotify
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${currentPage === item.page
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }
                `}
                aria-current={currentPage === item.page ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Controls */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400 min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label={theme === Theme.DARK ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === Theme.DARK ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400 min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-black animate-[fade-in_0.2s_ease-out]">
            <nav className="flex flex-col p-4 space-y-2" role="navigation" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavigate(item.page)}
                  className={`
                    w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200
                    ${currentPage === item.page
                      ? 'bg-primary-500 text-white'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }
                  `}
                  aria-current={currentPage === item.page ? 'page' : undefined}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow" role="main">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 mt-auto bg-slate-50 dark:bg-[#050505]" role="contentinfo">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Brand */}
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => handleNavigate('generator')}
              role="button"
              aria-label="Go to home"
            >
              <img src="/logo.png" alt="Dotify Logo" className="w-8 h-8 rounded-lg" />
              <span className="text-lg font-bold text-primary-500">Dotify</span>
            </div>

            {/* Links */}
            <nav className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm" aria-label="Footer navigation">
              <button onClick={() => handleNavigate('generator')} className="text-slate-500 hover:text-primary-500 transition-colors py-1">Generator</button>
              <button onClick={() => handleNavigate('use-cases')} className="text-slate-500 hover:text-primary-500 transition-colors py-1">Use Cases</button>
              <button onClick={() => handleNavigate('connect')} className="text-slate-500 hover:text-primary-500 transition-colors py-1">Connect</button>
            </nav>

            {/* Copyright */}
            <div className="text-xs sm:text-sm text-slate-500 text-center">
              &copy; {new Date().getFullYear()} Dotify. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};