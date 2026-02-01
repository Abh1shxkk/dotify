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
            <div className="fixed top-20 right-4 z-50 flex flex-col space-y-2 pointer-events-none">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`
              pointer-events-auto flex items-center px-4 py-3 rounded-lg shadow-lg transform transition-all animate-[slide-in_0.3s_ease-out]
              ${toast.type === 'success' ? 'bg-primary-500 text-white' : 'bg-red-500 text-white'}
            `}
                    >
                        {toast.type === 'success' ? <ShieldCheck className="w-4 h-4 mr-2" /> : <Info className="w-4 h-4 mr-2" />}
                        <span className="font-medium text-sm">{toast.text}</span>
                    </div>
                ))}
            </div>

            {/* Hero Section with Background Image */}
            <section
                className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
                style={{
                    backgroundImage: 'url(/hero-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background dark:from-black/70 dark:via-black/50 dark:to-[#030303]"></div>

                <div className="relative z-10 text-center max-w-3xl mx-auto px-6 py-16 animate-[fade-in_0.6s_ease-out]">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-white drop-shadow-lg">
                        Master your <br />
                        <span className="text-primary-400">
                            Gmail Aliases
                        </span>
                    </h1>
                    <p className="text-slate-200 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto drop-shadow">
                        Generate thousands of valid email variations for filtering, tracking, and organizing your digital life. Professional email management made simple.
                    </p>

                    <form onSubmit={handleGenerate} className="relative max-w-xl mx-auto">
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-primary-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                            <div className="relative flex items-center bg-white dark:bg-[#111] rounded-xl p-2 shadow-2xl border border-slate-200 dark:border-slate-700">
                                <input
                                    type="email"
                                    placeholder="john.doe@gmail.com"
                                    value={inputEmail}
                                    onChange={handleInputChange}
                                    className="flex-grow bg-transparent border-none outline-none px-4 py-3 text-lg placeholder-slate-400 text-slate-900 dark:text-white"
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={isComputing || !inputEmail}
                                    className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                >
                                    {isComputing ? '...' : 'Generate'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            {/* Results Section */}
            {parsed && (
                <section className="max-w-6xl mx-auto px-6 py-12 animate-[slide-up_0.5s_ease-out]">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Variations</h2>
                            <p className="text-slate-500 dark:text-slate-400">
                                Found <span className="font-mono text-primary-500 font-bold">{totalVars.toLocaleString()}</span> possibilities
                            </p>
                        </div>

                        <div className="mt-4 md:mt-0 flex items-center space-x-2 text-sm text-slate-500">
                            <Info className="w-4 h-4" />
                            <span>Page {currentPage} of {totalPages}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
                        <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                            <p className="text-slate-500">No variations found. Try a longer username.</p>
                        </div>
                    )}

                    <div className="mt-12 mb-8">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(p) => {
                                setCurrentPage(p);
                                window.scrollTo({ top: 400, behavior: 'smooth' });
                            }}
                        />
                    </div>
                </section>
            )}
        </>
    );
};
