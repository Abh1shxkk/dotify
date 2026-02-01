import React, { useState, useEffect, useCallback } from 'react';
import { ParsedEmail, ToastMessage } from '../../types';
import { parseEmail, generateVariationAtIndex, calculateMaxVariations } from '../../utils/emailLogic';
import { Pagination } from '../Pagination';
import { EmailCard } from '../EmailCard';
import { ShieldCheck, Info } from '../ui/Icons';

const ITEMS_PER_PAGE = 50;

interface GeneratorPageProps {
    toasts: ToastMessage[];
    addToast: (text: string, type: 'success' | 'error') => void;
}

export const GeneratorPage: React.FC<GeneratorPageProps> = ({ toasts, addToast }) => {
    const [inputEmail, setInputEmail] = useState('');
    const [parsed, setParsed] = useState<ParsedEmail | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalVars, setTotalVars] = useState(0);
    const [copiedIndices, setCopiedIndices] = useState<Set<number>>(new Set());
    const [currentItems, setCurrentItems] = useState<{ email: string, index: number }[]>([]);
    const [isComputing, setIsComputing] = useState(false);

    // Load session storage for copied indices
    useEffect(() => {
        const saved = sessionStorage.getItem('dotify_copied');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    setCopiedIndices(new Set(parsed));
                }
            } catch (e) {
                console.error('Failed to load session state');
            }
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputEmail(e.target.value);
        if (parsed) {
            setParsed(null);
            setTotalVars(0);
            setCurrentItems([]);
        }
    };

    const handleGenerate = (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        setIsComputing(true);

        setTimeout(() => {
            const result = parseEmail(inputEmail);
            if (result.isValid) {
                setParsed(result);
                const total = calculateMaxVariations(result.username);
                setTotalVars(total);
                setCurrentPage(1);
                updateItems(result, 1);
            } else {
                addToast("Please enter a valid email address", 'error');
            }
            setIsComputing(false);
        }, 150);
    };

    const updateItems = useCallback((emailData: ParsedEmail, page: number) => {
        const start = (page - 1) * ITEMS_PER_PAGE;
        const max = calculateMaxVariations(emailData.username);
        const end = Math.min(start + ITEMS_PER_PAGE, max);

        const items = [];
        for (let i = start; i < end; i++) {
            items.push({
                email: generateVariationAtIndex(emailData.username, emailData.domain, i),
                index: i
            });
        }
        setCurrentItems(items);
    }, []);

    useEffect(() => {
        if (parsed) {
            updateItems(parsed, currentPage);
        }
    }, [currentPage, parsed, updateItems]);

    const copyToClipboard = async (text: string, globalIndex: number) => {
        try {
            await navigator.clipboard.writeText(text);

            const newSet = new Set(copiedIndices);
            newSet.add(globalIndex);
            setCopiedIndices(newSet);

            sessionStorage.setItem('dotify_copied', JSON.stringify(Array.from(newSet)));
            addToast("Copied to clipboard!", 'success');
        } catch (err) {
            addToast("Failed to copy", 'error');
        }
    };

    const totalPages = Math.ceil(totalVars / ITEMS_PER_PAGE);

    return (
        <>
            {/* Toast Notification Container */}
            <div className="fixed top-20 right-2 sm:right-4 z-50 flex flex-col space-y-2 pointer-events-none max-w-[calc(100vw-1rem)]">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`
                            pointer-events-auto flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-lg transform transition-all animate-[slide-in_0.3s_ease-out]
                            ${toast.type === 'success' ? 'bg-primary-500 text-white' : 'bg-red-500 text-white'}
                        `}
                    >
                        {toast.type === 'success' ? <ShieldCheck className="w-4 h-4 mr-2 flex-shrink-0" /> : <Info className="w-4 h-4 mr-2 flex-shrink-0" />}
                        <span className="font-medium text-xs sm:text-sm">{toast.text}</span>
                    </div>
                ))}
            </div>

            {/* Hero Section with Background Image */}
            <section
                className="relative min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden"
                style={{
                    backgroundImage: 'url(/hero-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background dark:from-black/70 dark:via-black/50 dark:to-[#030303]"></div>

                <div className="relative z-10 text-center w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 animate-[fade-in_0.6s_ease-out]">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 tracking-tight text-white drop-shadow-lg leading-tight">
                        Master your <br className="sm:hidden" />
                        <span className="text-primary-400">
                            Gmail Aliases
                        </span>
                    </h1>
                    <p className="text-slate-200 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto drop-shadow px-2">
                        Generate thousands of valid email variations for filtering, tracking, and organizing your digital life.
                    </p>

                    <form onSubmit={handleGenerate} className="relative max-w-xl mx-auto px-2 sm:px-0">
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-primary-500 rounded-xl sm:rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white dark:bg-[#111] rounded-xl sm:rounded-xl p-2 shadow-2xl border border-slate-200 dark:border-slate-700 gap-2 sm:gap-0">
                                <input
                                    type="email"
                                    placeholder="yourname@gmail.com"
                                    value={inputEmail}
                                    onChange={handleInputChange}
                                    className="flex-grow bg-transparent border-none outline-none px-3 sm:px-4 py-3 text-base sm:text-lg placeholder-slate-400 text-slate-900 dark:text-white w-full"
                                    required
                                    aria-label="Enter your Gmail address"
                                />
                                <button
                                    type="submit"
                                    disabled={isComputing || !inputEmail}
                                    className="bg-primary-500 hover:bg-primary-600 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center w-full sm:w-auto min-h-[48px]"
                                    aria-label="Generate email variations"
                                >
                                    {isComputing ? 'Generating...' : 'Generate'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            {/* Results Section */}
            {parsed && (
                <section className="max-w-6xl mx-auto px-3 sm:px-6 py-8 sm:py-12 animate-[slide-up_0.5s_ease-out]">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 sm:mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 gap-2">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Variations</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
                                Found <span className="font-mono text-primary-500 font-bold">{totalVars.toLocaleString()}</span> possibilities
                            </p>
                        </div>

                        <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500">
                            <Info className="w-4 h-4 flex-shrink-0" />
                            <span>Page {currentPage} of {totalPages}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                        {currentItems.map((item) => (
                            <EmailCard
                                key={item.index}
                                email={item.email}
                                isCopied={copiedIndices.has(item.index)}
                                index={item.index}
                                onCopy={() => copyToClipboard(item.email, item.index)}
                            />
                        ))}
                    </div>

                    {currentItems.length === 0 && (
                        <div className="text-center py-12 sm:py-20 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                            <p className="text-slate-500 text-sm sm:text-base">No variations found. Try a longer username.</p>
                        </div>
                    )}

                    <div className="mt-8 sm:mt-12 mb-6 sm:mb-8">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(p) => {
                                setCurrentPage(p);
                                window.scrollTo({ top: 300, behavior: 'smooth' });
                            }}
                        />
                    </div>
                </section>
            )}

            {/* SEO Content Section - Only visible when no results */}
            {!parsed && (
                <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                            What is the <span className="text-primary-500">Gmail Dot Trick</span>?
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                            Gmail ignores dots (periods) in the local part of email addresses. This means
                            <code className="mx-1 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-primary-500 text-xs sm:text-sm">example@gmail.com</code>
                            and
                            <code className="mx-1 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-primary-500 text-xs sm:text-sm">e.x.a.m.p.l.e@gmail.com</code>
                            both deliver to the same inbox!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl text-center">
                            <div className="text-3xl sm:text-4xl mb-3">📧</div>
                            <h3 className="font-semibold mb-2 text-sm sm:text-base">One Inbox</h3>
                            <p className="text-slate-500 text-xs sm:text-sm">All variations go to your single Gmail inbox</p>
                        </div>
                        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl text-center">
                            <div className="text-3xl sm:text-4xl mb-3">🎯</div>
                            <h3 className="font-semibold mb-2 text-sm sm:text-base">Track Sources</h3>
                            <p className="text-slate-500 text-xs sm:text-sm">Know which service shared your email</p>
                        </div>
                        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl text-center">
                            <div className="text-3xl sm:text-4xl mb-3">🔒</div>
                            <h3 className="font-semibold mb-2 text-sm sm:text-base">Stay Private</h3>
                            <p className="text-slate-500 text-xs sm:text-sm">Use unique emails for different services</p>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};
