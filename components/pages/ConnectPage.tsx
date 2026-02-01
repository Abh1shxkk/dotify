import React from 'react';
import {
    Github,
    Twitter,
    Linkedin,
    Mail,
    ArrowRight
} from '../ui/Icons';

const socialLinks = [
    {
        icon: Github,
        label: 'GitHub',
        username: '@Abh1shxkk',
        href: 'https://github.com/Abh1shxkk',
        description: 'Check out my open source projects',
        color: 'group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900'
    },
    {
        icon: Twitter,
        label: 'X (Twitter)',
        username: '@abh1shxkk',
        href: 'https://x.com/abh1shxkk',
        description: 'Follow for updates and tips',
        color: 'group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900'
    },
    {
        icon: Linkedin,
        label: 'LinkedIn',
        username: 'Abhishek Chauhan',
        href: 'https://www.linkedin.com/in/abhishek-chauhan-880496394',
        description: 'Connect with me professionally',
        color: 'group-hover:bg-blue-600 group-hover:text-white'
    }
];

export const ConnectPage: React.FC = () => {
    return (
        <div className="animate-[fade-in_0.4s_ease-out]">
            {/* Hero Section */}
            <section className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                        Let's <span className="text-primary-500">Connect</span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Follow us on social media for updates, tips, and behind-the-scenes content. We'd love to hear from you!
                    </p>
                </div>
            </section>

            {/* Social Links Grid */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center p-6 bg-white dark:bg-[#0c0c0c] rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 hover:shadow-xl"
                            >
                                <div className={`w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-5 transition-all duration-300 ${social.color}`}>
                                    <social.icon className="w-7 h-7" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center mb-1">
                                        <h3 className="text-lg font-semibold mr-2">{social.label}</h3>
                                        <span className="text-sm text-primary-500">{social.username}</span>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                                        {social.description}
                                    </p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-slate-50 dark:bg-[#080808]">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="bg-white dark:bg-[#0c0c0c] rounded-3xl border border-slate-200 dark:border-slate-800 p-8 md:p-12">
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="w-20 h-20 rounded-2xl bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center mb-6 md:mb-0 md:mr-8">
                                <Mail className="w-10 h-10 text-primary-500" />
                            </div>
                            <div className="text-center md:text-left flex-1">
                                <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
                                <p className="text-slate-600 dark:text-slate-400 mb-4">
                                    Have questions, feedback, or partnership inquiries? We'd love to hear from you.
                                </p>
                                <a
                                    href="https://mail.google.com/mail/?view=cm&fs=1&to=abhishek.codes2004@gmail.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-primary-500 font-semibold hover:text-primary-600 transition-colors"
                                >
                                    abhishek.codes2004@gmail.com
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
