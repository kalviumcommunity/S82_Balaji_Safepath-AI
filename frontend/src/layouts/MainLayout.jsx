import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-mesh transition-colors duration-500 text-slate-900 dark:text-slate-100 selection:bg-primary-500/30">
            <Navbar />
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
