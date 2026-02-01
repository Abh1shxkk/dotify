import React from 'react';
import { Copy, Check } from './ui/Icons';

interface EmailCardProps {
  email: string;
  isCopied: boolean;
  onCopy: () => void;
  index: number;
}

export const EmailCard: React.FC<EmailCardProps> = ({ email, isCopied, onCopy, index }) => {
  return (
    <div
      className={`
        group relative flex items-center justify-between p-3 sm:p-3.5 rounded-xl border transition-all duration-300
        ${isCopied
          ? 'bg-primary-50/50 dark:bg-primary-900/10 border-primary-200 dark:border-primary-800'
          : 'bg-white dark:bg-[#0c0c0c] border-slate-200 dark:border-slate-800 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md dark:hover:shadow-none active:scale-[0.98]'
        }
      `}
      style={{ animationDelay: `${index * 20}ms` }}
    >
      <div className="flex-1 min-w-0 mr-2 sm:mr-3 overflow-hidden">
        <p
          className={`text-xs sm:text-sm font-medium truncate font-mono ${isCopied ? 'text-primary-700 dark:text-primary-300' : 'text-slate-700 dark:text-slate-300'}`}
          title={email}
        >
          {email}
        </p>
      </div>

      <button
        onClick={onCopy}
        className={`
          flex items-center justify-center w-9 h-9 sm:w-8 sm:h-8 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-black flex-shrink-0
          ${isCopied
            ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
            : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 group-hover:bg-primary-500 group-hover:text-white active:bg-primary-600'
          }
        `}
        aria-label={isCopied ? 'Copied to clipboard' : 'Copy to clipboard'}
      >
        {isCopied ? (
          <Check className="w-4 h-4 animate-[scale-in_0.2s_ease-out]" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>

      {/* Copied indicator tag */}
      {isCopied && (
        <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
        </span>
      )}
    </div>
  );
};