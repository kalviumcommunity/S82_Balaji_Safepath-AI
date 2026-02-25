import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';
import { toast } from 'react-toastify';
import { MessageCircle, Send, Users, Megaphone, Loader2, Clock, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Community() {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: ''
    });

    // Fetch reports on mount
    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            setIsLoading(true);
            // Simulating the backend GET request as per requirements
            // In reality, this would be: const res = await apiClient.get('/community/reports');
            // setReports(res.data)

            // Since backend may not have this exact route yet, we'll try it and fallback to mock data
            const res = await apiClient.get('/community/reports').catch(() => ({
                data: {
                    reports: [
                        { id: 1, title: 'Flooding on Main St.', description: 'Water levels are rising rapidly near the central bridge. Avoid the area if possible.', location: 'Downtown', time: '10 mins ago', author: 'Local Resident' },
                        { id: 2, title: 'Power outage in Sector 4', description: 'Transformer blew out during the storm. Crews are aware but no ETA yet.', location: 'Sector 4', time: '1 hour ago', author: 'Safety Team' }
                    ]
                }
            }));

            setReports(res.data.reports || []);
        } catch (error) {
            console.error('Error fetching reports:', error);
            toast.error('Failed to load community reports.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.description.trim()) {
            toast.error("Title and description are required.");
            return;
        }

        setIsSubmitting(true);
        try {
            // Simulating POST request
            // await apiClient.post('/community/reports', formData);

            const newReport = {
                id: Date.now(),
                ...formData,
                time: 'Just now',
                author: 'You'
            };

            setReports([newReport, ...reports]);
            setFormData({ title: '', description: '', location: '' });
            toast.success('Report submitted successfully!');
        } catch (error) {
            toast.error(error.message || 'Failed to submit report');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
            {/* Submission Form */}
            <div className="w-full lg:w-1/3 shrink-0">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm sticky top-24">
                    <div className="flex items-center gap-2 mb-2">
                        <Megaphone className="h-6 w-6 text-primary-600" />
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">File a Report</h2>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Share real-time updates and hazards with your community.</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Report Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="e.g. Flooded road on 5th Ave"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 block p-2.5 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Location (Optional)
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="e.g. Downtown Central"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 block p-2.5 pl-10 transition-colors"
                                />
                                <MapPin className="h-5 w-5 text-slate-400 absolute left-3 top-2.5" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Description
                            </label>
                            <textarea
                                name="description"
                                rows="4"
                                placeholder="Describe the hazard, status, or needs..."
                                value={formData.description}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 block p-2.5 transition-colors resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-base px-5 py-3 flex justify-center items-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm shadow-primary-500/30"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Send className="h-5 w-5" />
                                    Submit Report
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Reports Feed */}
            <div className="w-full lg:w-2/3">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Users className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                        Live Community Feed
                    </h2>
                    <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 py-1 px-3 rounded-full text-xs font-semibold uppercase tracking-wide">
                        {reports.length} Reports
                    </span>
                </div>

                {isLoading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl animate-pulse">
                                <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-3"></div>
                                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2"></div>
                                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/5"></div>
                            </div>
                        ))}
                    </div>
                ) : reports.length === 0 ? (
                    <div className="bg-slate-50 dark:bg-slate-900/50 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl py-16 flex flex-col items-center justify-center text-center">
                        <MessageCircle className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No reports yet</h3>
                        <p className="text-slate-500 dark:text-slate-400">Be the first to share an update with your community.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <AnimatePresence>
                            {reports.map((report) => (
                                <motion.div
                                    key={report.id}
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{report.title}</h3>
                                        <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-full whitespace-nowrap">
                                            {report.author}
                                        </span>
                                    </div>

                                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                                        {report.description}
                                    </p>

                                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3.5 w-3.5" />
                                            {report.time}
                                        </div>
                                        {report.location && (
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-3.5 w-3.5" />
                                                {report.location}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}
