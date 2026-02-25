import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShieldAlert, Mail, Lock, User, UserPlus, Chrome } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Signup() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password) {
            toast.error('Please fill in all fields');
            return;
        }
        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            localStorage.setItem('safepath_user', JSON.stringify({ name: formData.name, email: formData.email }));
            window.dispatchEvent(new Event('auth-change'));
            setIsLoading(false);
            toast.success('Account created successfully!');
            navigate('/');
        }, 1500);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-[70vh] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full"
            >
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-black/50">
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-flex justify-center mb-4">
                            <div className="bg-primary-50 dark:bg-primary-900/20 p-3 rounded-2xl">
                                <ShieldAlert className="h-10 w-10 text-primary-600" />
                            </div>
                        </Link>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Create Account</h2>
                        <p className="text-slate-500 dark:text-slate-400">Join SafePath AI for personalized safety guidance.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="pl-10 w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-primary-500 block p-3 transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="pl-10 w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-primary-500 block p-3 transition-colors"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="pl-10 w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-primary-500 block p-3 transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-2 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-xl text-md px-5 py-3.5 text-center flex justify-center items-center gap-2 transition-all shadow-sm shadow-primary-500/30 hover:shadow-md hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
                        >
                            {isLoading ? (
                                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <UserPlus className="h-5 w-5" />
                                    Create Account
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 flex items-center justify-between">
                        <span className="border-b border-slate-200 dark:border-slate-700 w-1/5 lg:w-1/4"></span>
                        <span className="text-xs text-center text-slate-500 dark:text-slate-400 uppercase font-semibold tracking-wider">or sign up with</span>
                        <span className="border-b border-slate-200 dark:border-slate-700 w-1/5 lg:w-1/4"></span>
                    </div>

                    <button
                        onClick={() => {
                            localStorage.setItem('safepath_user', JSON.stringify({ name: 'Google User', email: 'user@gmail.com' }));
                            window.dispatchEvent(new Event('auth-change'));
                            toast.success('Google signup successful!');
                            navigate('/');
                        }}
                        className="mt-6 w-full text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-100 font-bold rounded-xl text-md px-5 py-3.5 text-center flex justify-center items-center gap-2 transition-colors"
                    >
                        <Chrome className="h-5 w-5 text-red-500" />
                        Google
                    </button>
                </div>

                <p className="mt-8 text-center text-slate-600 dark:text-slate-400 font-medium">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary-600 hover:text-primary-700 font-bold hover:underline transition-all">
                        Sign in
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
