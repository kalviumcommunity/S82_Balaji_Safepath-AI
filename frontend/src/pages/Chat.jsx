import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../services/aiService';
import { Send, MapPin, AlertTriangle, Globe, Loader2, Bot, User, Sparkles } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Chat() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: 'ai',
            text: "Hello! I am SafePath AI. How can I assist you with disaster preparedness or recovery today?",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);

    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Context settings
    const [disasterType, setDisasterType] = useState('earthquake');
    const [location, setLocation] = useState('');
    const [lang, setLang] = useState('English');

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = {
            id: Date.now(),
            role: 'user',
            text: input.trim(),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await sendChatMessage({
                message: userMessage.text,
                disasterType,
                location: location || 'Unknown',
                lang
            });

            const aiMessage = {
                id: Date.now() + 1,
                role: 'ai',
                text: response.reply || response.reasoning || "I couldn't process a specific response for that.",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            toast.error(error.message || 'Failed to get a response from SafePath AI');
            // Add a fallback error message
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                role: 'ai',
                text: "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later.",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                error: true
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-8rem)] gap-6">

            {/* Context Sidebar */}
            <div className="w-full lg:w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col gap-5 h-auto lg:h-full overflow-y-auto shrink-0 shadow-sm">
                <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                        <Bot className="h-5 w-5 text-primary-600" /> Chat Context
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Set these parameters to get highly tailored advice.</p>
                </div>

                <div className="space-y-4 flex-grow">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                            <AlertTriangle className="h-4 w-4 text-amber-500" /> Disaster Type
                        </label>
                        <select
                            value={disasterType}
                            onChange={(e) => setDisasterType(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 block p-2.5 transition-colors"
                        >
                            <option value="earthquake">Earthquake</option>
                            <option value="flood">Flood</option>
                            <option value="cyclone">Cyclone</option>
                            <option value="wildfire">Wildfire</option>
                            <option value="general">General Preparedness</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                            <MapPin className="h-4 w-4 text-blue-500" /> Location
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. San Francisco"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 block p-2.5 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                            <Globe className="h-4 w-4 text-teal-500" /> Language
                        </label>
                        <select
                            value={lang}
                            onChange={(e) => setLang(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 block p-2.5 transition-colors"
                        >
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                            <option value="Hindi">Hindi</option>
                            <option value="Mandarin">Mandarin</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col shadow-sm overflow-hidden h-[60vh] lg:h-full">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white">Safety Assistant</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Powered by Gemini AI</p>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50/30 dark:bg-slate-950/30 space-y-6">
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                key={msg.id}
                            >
                                <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

                                    {/* Avatar */}
                                    <div className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-primary-600 text-white'
                                        }`}>
                                        {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                                    </div>

                                    {/* Bubble */}
                                    <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div className={`px-5 py-4 rounded-2xl shadow-sm text-[15px] leading-relaxed max-w-full overflow-hidden ${msg.role === 'user'
                                            ? 'bg-gradient-to-r from-primary-600 to-teal-500 text-white rounded-tr-sm shadow-primary-500/20'
                                            : msg.error
                                                ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50 rounded-tl-sm'
                                                : 'bg-white/90 dark:bg-slate-800/90 backdrop-blur-md text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-700/50 rounded-tl-sm shadow-xl shadow-slate-200/20 dark:shadow-black/20'
                                            }`}>
                                            {msg.role === 'user' ? (
                                                <p className="whitespace-pre-wrap">{msg.text}</p>
                                            ) : (
                                                <div className="prose prose-sm dark:prose-invert prose-p:leading-relaxed prose-pre:bg-slate-100 dark:prose-pre:bg-slate-900 prose-pre:text-slate-800 dark:prose-pre:text-slate-200 max-w-none">
                                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                        {msg.text}
                                                    </ReactMarkdown>
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-[11px] text-slate-400 mt-1.5 px-1 font-medium">{msg.timestamp}</span>
                                    </div>

                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-start"
                        >
                            <div className="flex gap-3 max-w-[85%] flex-row">
                                <div className="shrink-0 h-8 w-8 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-sm">
                                    <Bot size={16} />
                                </div>
                                <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                                    <span className="flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            disabled={isLoading}
                            className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-0 focus:ring-2 focus:ring-primary-500 rounded-full px-5 py-3 transition-colors disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-3 h-12 w-12 flex items-center justify-center shrink-0 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-primary-500/20"
                        >
                            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
}
