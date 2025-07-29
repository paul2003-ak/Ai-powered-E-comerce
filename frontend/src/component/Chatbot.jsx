import React, { useState, useRef, useEffect, useContext } from 'react';
import { Send, X, MessageCircle, Trash2, Copy, Check } from 'lucide-react';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';

// Mock context for demo - replace with your actual authDataContext

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'model',
            parts: [{ text: 'Hello! I\'m your AI assistant. How can I help you today?' }],
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const chatContainerRef = useRef(null);
    const inputRef = useRef(null);
    const { serverUrl } = useContext(authDataContext);

    useEffect(() => {
        // Scroll to the bottom of the chat window when new messages are added
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        // Focus input when chat opens
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (input.trim() === '' || isLoading) return;

        const userMessage = {
            role: 'user',
            parts: [{ text: input }],
            timestamp: new Date()
        };

        // Create history from the state *before* adding the new user message
        const history = messages.map(msg => ({
            role: msg.role,
            parts: msg.parts,
        }));

        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            const response = await axios.post(`${serverUrl}/api/ai/chat`, {
                history: history,
                prompt: currentInput,
            });
            
            const aiMessage = {
                role: 'model',
                parts: [{ text: response.data.text }],
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Error fetching AI response:', error);
            const errorMessage = {
                role: 'model',
                parts: [{ text: 'Sorry, I am having trouble connecting. Please try again later.' }],
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const clearChat = () => {
        setMessages([
            {
                role: 'model',
                parts: [{ text: 'Hello! I\'m your AI assistant. How can I help you today?' }],
                timestamp: new Date()
            }
        ]);
    };

    const copyMessage = async (text, index) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const formatTime = (timestamp) => {
        return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div>
            {isOpen && (
                <div className="fixed bottom-24 right-5 w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl text-white">
                        <div className="flex items-center space-x-2">
                            <MessageCircle size={20} />
                            <h3 className="font-bold text-lg">AI Assistant</h3>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={clearChat}
                                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                                title="Clear chat"
                            >
                                <Trash2 size={16} />
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto bg-gray-50">
                        {messages.map((msg, index) => (
                            <div key={index} className={`my-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`group relative p-3 rounded-2xl max-w-[85%] shadow-sm ${
                                    msg.role === 'user' 
                                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
                                        : 'bg-white text-gray-800 border border-gray-200'
                                }`}>
                                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                                        {msg.parts[0].text}
                                    </p>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className={`text-xs ${
                                            msg.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                                        }`}>
                                            {formatTime(msg.timestamp)}
                                        </span>
                                        {msg.role === 'model' && (
                                            <button
                                                onClick={() => copyMessage(msg.parts[0].text, index)}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
                                                title="Copy message"
                                            >
                                                {copiedIndex === index ? (
                                                    <Check size={12} className="text-green-500" />
                                                ) : (
                                                    <Copy size={12} className="text-gray-500" />
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        {/* Loading indicator */}
                        {isLoading && (
                            <div className="my-3 flex justify-start">
                                <div className="bg-white text-gray-800 border border-gray-200 p-3 rounded-2xl shadow-sm">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Form */}
                    <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
                        <div className="flex items-center space-x-2">
                            <input 
                                ref={inputRef}
                                type="text" 
                                value={input} 
                                onChange={(e) => setInput(e.target.value)} 
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
                                placeholder="Type your message..." 
                                className="flex-1 bg-gray-100 text-gray-800 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors text-sm"
                                disabled={isLoading}
                                maxLength={1000}
                            />
                            <button 
                                onClick={handleSendMessage}
                                className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white hover:from-blue-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
                                disabled={isLoading || !input.trim()}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                        <div className="text-xs text-gray-500 mt-2 text-center">
                            Press Enter to send • {input.length}/1000
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button 
                onClick={() => setIsOpen(prev => !prev)} 
                className="fixed bottom-5 right-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-full shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 z-40 hover:scale-110"
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </button>
        </div>
    );
};

export default Chatbot;