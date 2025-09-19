'use client';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { communities } from '../../lib/api';
import { getImageUrl } from '../../utils/image';
import { Send } from 'lucide-react';

export default function CommunityChatInterface({ community }) {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (community?.id) {
            fetchMessages();
        }
    }, [community?.id]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchMessages = async () => {
        try {
            const data = await communities.getCommunityMessages(community.id);
            setMessages(Array.isArray(data) ? data : data.messages || []);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            const message = await communities.sendCommunityMessage(community.id, newMessage);
            setMessages(prev => [...prev, message]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-full">Loading chat...</div>;
    }

    return (
        <div className="flex flex-col h-full bg-surface/50 rounded-lg border border-border">
            <div className="p-4 border-b border-border">
                <h3 className="font-display font-semibold text-text-primary">
                    {community.title} Chat
                </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div key={message.id} className="flex gap-3">
                        {message.user?.avatar ? (
                            <img
                                src={getImageUrl(message.user.avatar)}
                                alt={message.user.first_name}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-8 h-8 bg-primary-gradient rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-semibold">
                                    {message.user?.first_name?.[0]}{message.user?.last_name?.[0]}
                                </span>
                            </div>
                        )}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-text-primary text-sm">
                                    {message.user?.first_name} {message.user?.last_name}
                                </span>
                                <span className="text-xs text-text-secondary">
                                    {new Date(message.created_at).toLocaleTimeString()}
                                </span>
                            </div>
                            <p className="text-text-primary text-sm bg-background/50 rounded-lg p-2">
                                {message.content}
                            </p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 p-3 bg-background border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all duration-normal"
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="px-4 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg transition-all duration-normal disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </form>
        </div>
    );
}