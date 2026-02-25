import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Waves, Wind, Flame, MessageSquare, ArrowRight, ClipboardCheck, Users, ShieldCheck } from 'lucide-react';

const categories = [
    { id: 'earthquake', title: 'Earthquake', icon: <Shield className="h-6 w-6" />, desc: 'Structural safety and drop-cover-hold.' },
    { id: 'flood', title: 'Flood', icon: <Waves className="h-6 w-6" />, desc: 'Evacuation routes and water safety.' },
    { id: 'cyclone', title: 'Cyclone', icon: <Wind className="h-6 w-6" />, desc: 'Wind resistance and safe rooms.' },
    { id: 'wildfire', title: 'Wildfire', icon: <Flame className="h-6 w-6" />, desc: 'Air quality and rapid evacuation.' },
];

export default function Home() {
    return (
        <div className="flex flex-col gap-16 md:gap-24 mb-12">

            {/* Split Hero Section */}
            <section className="relative w-full pt-12 pb-20 md:pt-24 md:pb-32 flex flex-col md:flex-row items-center gap-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full md:w-1/2 flex flex-col items-start text-left"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Enterprise Safety Platform</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6 drop-shadow-sm">
                        Intelligent preparedness for <span className="text-blue-600 dark:text-blue-400">unpredictable events.</span>
                    </h1>

                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-lg">
                        SafePath combines real-time situational awareness with tailored safety protocols to protect communities and enterprises across the globe.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        <Link
                            to="/chat"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                        >
                            <MessageSquare className="h-5 w-5" />
                            <span>Consult Assistant</span>
                        </Link>
                        <Link
                            to="/checklist"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-semibold border border-slate-200 dark:border-slate-700 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                        >
                            <ClipboardCheck className="h-5 w-5 text-blue-500" />
                            <span>Generate Protocols</span>
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full md:w-1/2"
                >
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 aspect-[4/3]">
                        <img
                            src="https://plus.unsplash.com/premium_photo-1663075966038-6b37cc036924?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZW1lcmdlbmN5JTIwcmVzY3VlfGVufDB8fDB8fHww"
                            alt="Emergency Response Planning"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent mix-blend-multiply"></div>
                    </div>
                </motion.div>
            </section>

            {/* Feature Grid - Clean & Minimal */}
            <section className="w-full">
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Hazard Protocols</h2>
                        <p className="text-slate-600 dark:text-slate-400">Standardized, data-driven checklists and safety measures categorized by environmental threat level.</p>
                    </div>
                    <Link to="/checklist" className="group flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium">
                        View all protocols <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {categories.map((cat, index) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <Link to={`/checklist?type=${cat.id}`} className="block h-full">
                                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 h-full transition-all hover:border-slate-300 dark:hover:border-slate-600 flex flex-col hover:shadow-lg hover:-translate-y-1">
                                    <div className="flex items-center gap-3 mb-4 text-slate-900 dark:text-white">
                                        <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                                            {cat.icon}
                                        </div>
                                        <h3 className="font-semibold">{cat.title}</h3>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{cat.desc}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Enterprise CTA */}
            <section className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                        <ShieldCheck className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Join the Community Network</h2>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 max-w-lg mb-0 text-lg">
                        Share real-time incident reports and collaborate with local authorities and communities to ensure collective safety.
                    </p>
                </div>
                <div className="shrink-0">
                    <Link
                        to="/community"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-bold transition-colors border border-slate-200 dark:border-slate-700"
                    >
                        <Users className="h-5 w-5" />
                        Access Community
                    </Link>
                </div>
            </section>
        </div>
    );
}
