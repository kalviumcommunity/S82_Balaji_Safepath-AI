import React from 'react';
import { ShieldAlert, Heart, Github, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <ShieldAlert className="h-6 w-6 text-primary-600" />
                        <span className="font-bold text-lg text-slate-900 dark:text-white">
                            SafePath <span className="text-primary-600">AI</span>
                        </span>
                    </div>

                    <div className="flex space-x-6 text-slate-500 dark:text-slate-400">
                        <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
                            <span className="sr-only">Twitter</span>
                            <Twitter className="h-5 w-5" />
                        </a>
                        <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
                            <span className="sr-only">GitHub</span>
                            <Github className="h-5 w-5" />
                        </a>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        &copy; {new Date().getFullYear()} SafePath AI. All rights reserved.
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        Built with <Heart className="h-4 w-4 text-red-500" /> for community safety.
                    </p>
                </div>
            </div>
        </footer>
    );
}
