import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Theme, ToastMessage } from './types';
import { GeneratorPage } from './components/pages/GeneratorPage';
import { UseCasesPage } from './components/pages/UseCasesPage';
import { ConnectPage } from './components/pages/ConnectPage';

type Page = 'generator' | 'use-cases' | 'connect';

const App: React.FC = () => {
  // Theme State
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return (localStorage.getItem('theme') as Theme) || Theme.DARK;
    }
    return Theme.DARK;
  });

  // Router State
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    const hash = window.location.hash.slice(1) as Page;
    return ['generator', 'use-cases', 'connect'].includes(hash) ? hash : 'generator';
  });

  // Toast State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Handle hash changes for browser back/forward
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) as Page;
      if (['generator', 'use-cases', 'connect'].includes(hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('generator');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handle custom navigate events from child components
  useEffect(() => {
    const handleNavigate = (e: CustomEvent<Page>) => {
      navigateTo(e.detail);
    };

    window.addEventListener('navigate', handleNavigate as EventListener);
    return () => window.removeEventListener('navigate', handleNavigate as EventListener);
  }, []);

  // Sync theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === Theme.DARK) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === Theme.DARK ? Theme.LIGHT : Theme.DARK);
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToast = (text: string, type: 'success' | 'error') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'use-cases':
        return <UseCasesPage />;
      case 'connect':
        return <ConnectPage />;
      case 'generator':
      default:
        return <GeneratorPage toasts={toasts} addToast={addToast} />;
    }
  };

  return (
    <Layout
      theme={theme}
      toggleTheme={toggleTheme}
      currentPage={currentPage}
      navigateTo={navigateTo}
    >
      {renderPage()}
    </Layout>
  );
};

export default App;