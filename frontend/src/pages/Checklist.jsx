import React, { useState } from 'react';
import { generateChecklist } from '../services/aiService';
import { Download, Loader2, AlertTriangle, MapPin, Globe, CheckCircle2, Sparkles } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Checklist() {
    const [formData, setFormData] = useState({
        disasterType: new URLSearchParams(window.location.search).get('type') || 'earthquake',
        location: '',
        lang: 'English'
    });

    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.location.trim()) {
            toast.error("Please enter a location");
            return;
        }

        setIsLoading(true);
        setResult(null);

        try {
            const response = await generateChecklist(formData);
            // The API returns { ok: true, reasoning: string }
            setResult(response.reasoning || "No checklist generated.");
        } catch (error) {
            toast.error(error.message || "Failed to generate checklist. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDownload = () => {
        if (!result) return;
        const blob = new Blob([result], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `SafePath_${formData.disasterType}_Checklist.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success("Checklist downloaded successfully!");
    };

    // Clean up reasoning and render using react-markdown
    const renderFormattedResult = (text) => {
        // Find if the text contains a checklist section vs reasoning
        const parts = text.split(/(?=\*\*.*Checklist.*\*\*|#.*Checklist)/i);
        const reasoning = parts[0];
        const checklist = parts.length > 1 ? parts.slice(1).join('\n') : '';

        return (
            <div className="space-y-8">
                {reasoning && (
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-sm overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Sparkles className="w-24 h-24 text-primary-500" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <AlertTriangle className="h-6 w-6 text-amber-500" />
                            AI Reasoning & Safety Context
                        </h3>
                        <div className="prose prose-slate dark:prose-invert prose-p:leading-relaxed max-w-none relative z-10">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {reasoning}
                            </ReactMarkdown>
                        </div>
                    </div>
                )}

                {checklist && (
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-sm overflow-hidden relative mt-8">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <CheckCircle2 className="w-24 h-24 text-teal-500" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <CheckCircle2 className="h-6 w-6 text-teal-500" />
                            Actionable Checklist
                        </h3>
                        <div className="prose prose-slate dark:prose-invert prose-p:leading-relaxed prose-li:my-1 prose-ul:list-none prose-ul:pl-0 max-w-none relative z-10">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    li: ({ node, ...props }) => (
                                        <li className="flex gap-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow mb-3 items-start">
                                            <input type="checkbox" className="mt-1 h-5 w-5 rounded border-slate-300 text-teal-600 focus:ring-teal-600 bg-white dark:bg-slate-900 cursor-pointer" />
                                            <span className="text-slate-800 dark:text-slate-200 flex-1">{props.children}</span>
                                        </li>
                                    ),
                                    ul: ({ node, ...props }) => (
                                        <ul className="pl-0">{props.children}</ul>
                                    )
                                }}
                            >
                                {checklist}
                            </ReactMarkdown>
                        </div>
                    </div>
                )}

                {(!reasoning && !checklist) && (
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                        <div className="prose prose-slate dark:prose-invert max-w-none">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {text}
                            </ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
            {/* Configuration Form */}
            <div className="w-full lg:w-1/3 shrink-0">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm sticky top-24">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Generate Checklist</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Create a highly tailored disaster preparedness plan.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                                <AlertTriangle className="h-4 w-4 text-amber-500" /> Disaster Type
                            </label>
                            <select
                                name="disasterType"
                                value={formData.disasterType}
                                onChange={handleChange}
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 block p-2.5"
                            >
                                <option value="earthquake">Earthquake</option>
                                <option value="flood">Flood</option>
                                <option value="cyclone">Cyclone</option>
                                <option value="wildfire">Wildfire</option>
                                <option value="tsunami">Tsunami</option>
                                <option value="winter_storm">Winter Storm</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                                <MapPin className="h-4 w-4 text-blue-500" /> Exact Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                placeholder="e.g. Coastal Florida, USA"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 block p-2.5"
                            />
                            <p className="text-xs text-slate-400 mt-1">Providing specific geography (coastal, urban, mountainous) improves AI accuracy.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                                <Globe className="h-4 w-4 text-teal-500" /> Language
                            </label>
                            <select
                                name="lang"
                                value={formData.lang}
                                onChange={handleChange}
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 block p-2.5"
                            >
                                <option value="English">English</option>
                                <option value="Spanish">Spanish</option>
                                <option value="French">French</option>
                                <option value="Mandarin">Mandarin</option>
                                <option value="Hindi">Hindi</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-base px-5 py-3 text-center transition-colors shadow-sm shadow-primary-500/30 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Generating AI Plan...
                                </>
                            ) : (
                                'Generate Custom Checklist'
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Output Section */}
            <div className="w-full lg:w-2/3">
                <AnimatePresence mode="wait">
                    {!isLoading && !result && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-full min-h-[400px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center p-8 bg-slate-50/50 dark:bg-slate-900/50"
                        >
                            <div className="bg-primary-100 dark:bg-primary-900/40 p-4 rounded-full mb-4">
                                <CheckCircle2 className="h-8 w-8 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Ready to generate</h3>
                            <p className="text-slate-500 dark:text-slate-400 max-w-sm">Fill out the configuration form to receive a step-by-step checklist specifically tailored to your environment.</p>
                        </motion.div>
                    )}

                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-6"
                        >
                            {/* Skeleton Loader */}
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm animate-pulse">
                                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-4"></div>
                                <div className="space-y-3">
                                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
                                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/6"></div>
                                </div>
                            </div>
                            <div>
                                <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-4 animate-pulse"></div>
                                <div className="space-y-3">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="h-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl animate-pulse"></div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {!isLoading && result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Emergency Plan</h2>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">For {formData.disasterType} in {formData.location}</p>
                                </div>
                                <button
                                    onClick={handleDownload}
                                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium transition-colors"
                                >
                                    <Download className="h-4 w-4" />
                                    <span className="hidden sm:inline">Download MD</span>
                                </button>
                            </div>

                            {renderFormattedResult(result)}

                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
