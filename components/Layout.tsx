import React from 'react';
import { Sun, Moon } from './ui/Icons';
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
  const navItems: { page: Page; label: string }[] = [
    { page: 'generator', label: 'Generator' },
    { page: 'use-cases', label: 'Use Cases' },
    { page: 'connect', label: 'Connect' },
  ];

  return (
    <div className={`min-h-screen flex flex-col text-slate-900 dark:text-slate-100 transition-colors duration-300`}>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            className="flex items-center space-x-3 group cursor-pointer"
            onClick={() => navigateTo('generator')}
          >
            <img src="/logo.png" alt="Dotify Logo" className="w-9 h-9 rounded-lg" />
            <span className="text-xl font-bold text-primary-500">
              Dotify
            </span>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => navigateTo(item.page)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${currentPage === item.page
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu + Theme Toggle */}
          <div className="flex items-center space-x-2">
            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => navigateTo(item.page)}
                  className={`
                    px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                    ${currentPage === item.page
                      ? 'bg-primary-500 text-white'
                      : 'text-slate-600 dark:text-slate-400'
                    }
                  `}
                >
                  {item.label.split(' ')[0]}
                </button>
              ))}
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
              aria-label="Toggle Theme"
            >
              {theme === Theme.DARK ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 mt-auto bg-slate-50 dark:bg-[#050505]">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Brand */}
            <div
              className="flex items-center space-x-3 mb-6 md:mb-0 cursor-pointer"
              onClick={() => navigateTo('generator')}
            >
              <img src="/logo.png" alt="Dotify Logo" className="w-8 h-8 rounded-lg" />
              <span className="text-lg font-bold text-primary-500">Dotify</span>
            </div>

            {/* Links */}
            <div className="flex space-x-8 mb-6 md:mb-0 text-sm">
              <button onClick={() => navigateTo('generator')} className="text-slate-500 hover:text-primary-500 transition-colors">Generator</button>
              <button onClick={() => navigateTo('use-cases')} className="text-slate-500 hover:text-primary-500 transition-colors">Use Cases</button>
              <button onClick={() => navigateTo('connect')} className="text-slate-500 hover:text-primary-500 transition-colors">Connect</button>
            </div>

            {/* Copyright */}
            <div className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} Dotify. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};