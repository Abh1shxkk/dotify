import React from 'react';
import {
    Filter,
    Target,
    FolderOpen,
    Lock,
    Tag,
    BarChart3,
    ArrowRight,
    Mail,
    ShieldCheck,
    Zap
} from '../ui/Icons';

const useCases = [
    {
        icon: Filter,
        title: 'Email Filtering',
        description: 'Create unique email addresses for different services to automatically filter and organize incoming mail based on source.',
        example: 'Use shopping@example for all e-commerce sites'
    },
    {
        icon: Target,
        title: 'Source Tracking',
        description: 'Know exactly which service leaked your email when you start receiving spam—pinpoint the source instantly.',
        example: 'Trace spam back to specific signups'
    },
    {
        icon: FolderOpen,
        title: 'Inbox Organization',
        description: 'Set up smart filters based on your email variations to keep your inbox clean and perfectly categorized.',
        example: 'Auto-sort by variation into folders'
    },
    {
        icon: Lock,
        title: 'Privacy Protection',
        description: 'Use different variations for sensitive accounts to add an extra layer of identity protection and security.',
        example: 'Unique emails for banking sites'
    },
    {
        icon: Tag,
        title: 'Service Categorization',
        description: 'Assign specific variations to shopping, social media, newsletters, and more for seamless management.',
        example: 'social@, news@, promo@ categories'
    },
    {
        icon: BarChart3,
        title: 'Analytics Ready',
        description: 'Track engagement and identify which services contact you most by monitoring variation usage patterns.',
        example: 'See which services email most'
    }
];

const benefits = [
    {
        icon: Mail,
        title: 'Unlimited Variations',
        description: 'Generate thousands of unique email addresses from a single Gmail account.'
    },
    {
        icon: ShieldCheck,
        title: 'No Extra Accounts',
        description: 'All variations point to your existing inbox—no new accounts needed.'
    },
    {
        icon: Zap,
        title: 'Instant Setup',
        description: 'Start using variations immediately with zero configuration required.'
    }
];

export const UseCasesPage: React.FC = () => {
    return (
        <div className="animate-[fade-in_0.4s_ease-out]">
            {/* Hero Section */}
            <section className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                        Powerful <span className="text-primary-500">Use Cases</span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Discover how email variations can transform your digital life management and give you complete control over your inbox.
                    </p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 bg-slate-50 dark:bg-[#080808]">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center mx-auto mb-4">
                                    <benefit.icon className="w-8 h-8 text-primary-500" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases Grid */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
                        How You Can Use <span className="text-primary-500">Email Variations</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {useCases.map((useCase, index) => (
                            <div
                                key={index}
                                className="group p-6 bg-white dark:bg-[#0c0c0c] rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary-300 dark:hover:border-primary-800 transition-all duration-300 hover:shadow-xl dark:hover:shadow-primary-900/10"
                            >
                                <div className="w-14 h-14 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mb-5 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors">
                                    <useCase.icon className="w-7 h-7 text-primary-500" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                                    {useCase.description}
                                </p>
                                <div className="flex items-center text-xs text-primary-500 font-medium">
                                    <ArrowRight className="w-3 h-3 mr-1.5" />
                                    <span>{useCase.example}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-primary-500 dark:bg-primary-600">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-primary-100 text-lg mb-8">
                        Generate your first email variation in seconds.
                    </p>
                    <a
                        href="#generator"
                        onClick={(e) => {
                            e.preventDefault();
                            window.dispatchEvent(new CustomEvent('navigate', { detail: 'generator' }));
                        }}
                        className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-primary-50 transition-colors shadow-lg"
                    >
                        Try Generator
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </a>
                </div>
            </section>
        </div>
    );
};
