import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldAlert, Menu, X, Sun, Moon, User, LogOut } from 'lucide-react';
import { toast } from 'react-toastify';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const checkAuth = () => {
            const storedUser = localStorage.getItem('safepath_user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                setUser(null);
            }
        };

        checkAuth();
        window.addEventListener('auth-change', checkAuth);
        return () => window.removeEventListener('auth-change', checkAuth);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('safepath_user');
        window.dispatchEvent(new Event('auth-change'));
        toast.info('Logged out successfully');
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'AI Chat', path: '/chat' },
        { name: 'Checklist', path: '/checklist' },
        { name: 'Risk Map', path: '/map' },
        { name: 'Community', path: '/community' },
    ];

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-900/95 border-b border-slate-800 transition-colors shadow-2xl shadow-slate-900/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="bg-primary-500/20 p-1.5 rounded-lg group-hover:bg-primary-500/30 transition-colors">
                                <ShieldAlert className="h-7 w-7 text-primary-400" />
                            </div>
                            <span className="font-extrabold text-xl text-white tracking-tight">
                                SafePath <span className="text-primary-400">AI</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-semibold transition-all hover:text-primary-400 ${isActive(link.path)
                                    ? 'text-primary-400'
                                    : 'text-slate-300'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <button
                            onClick={toggleTheme}
                            className="p-2 mr-4 rounded-full text-slate-400 hover:bg-slate-800 transition-colors hover:text-white"
                            aria-label="Toggle theme"
                        >
                            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                                    <div className="bg-primary-500/20 p-1.5 rounded-full">
                                        <User className="h-5 w-5 text-primary-400" />
                                    </div>
                                    <span className="text-sm font-semibold tracking-wide text-white">{user.name}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-900/20 rounded-full transition-colors"
                                    title="Logout"
                                >
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="px-5 py-2 text-sm font-bold text-white bg-primary-600 hover:bg-primary-500 rounded-full transition-all shadow-lg hover:shadow-primary-500/25 border border-primary-500/50"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={toggleTheme}
                            className="p-2 mr-2 rounded-full text-slate-400 hover:bg-slate-800"
                        >
                            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-b border-slate-800 bg-slate-900">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.path)
                                    ? 'text-primary-400 bg-primary-900/20'
                                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        {user ? (
                            <div className="mt-4 pt-4 border-t border-slate-700">
                                <div className="block px-3 py-2 text-base font-medium text-white flex items-center gap-2 mb-2">
                                    <User className="h-5 w-5 text-primary-400" />
                                    {user.name}
                                </div>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-red-900/20"
                                >
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-2 rounded-md text-base font-bold text-white bg-primary-600 mt-4 text-center"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
