
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { MOCK_USERS, MOCK_CHAT_MESSAGES } from '../constants';
import { ChatMessage } from '../types';

const Chat: React.FC = () => {
    const { userId: otherUserId } = useParams<{ userId: string }>();
    const { state } = useAppContext();
    const currentUser = state.user;
    const otherUser = MOCK_USERS.find(u => u.id === otherUserId);
    
    // Filter messages for this specific conversation
    const conversationMessages = MOCK_CHAT_MESSAGES.filter(
        msg => (msg.senderId === currentUser?.id && msg.receiverId === otherUserId) ||
               (msg.senderId === otherUserId && msg.receiverId === currentUser?.id)
    ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    const [messages, setMessages] = useState<ChatMessage[]>(conversationMessages);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !currentUser || !otherUser) return;

        const message: ChatMessage = {
            id: `msg-${Date.now()}`,
            senderId: currentUser.id,
            receiverId: otherUser.id,
            text: newMessage.trim(),
            timestamp: new Date().toISOString()
        };
        
        setMessages([...messages, message]);
        setNewMessage('');
    };

    if (!currentUser || !otherUser) {
        return <div className="text-center py-10">User not found.</div>;
    }

    return (
        <div className="flex flex-col h-[calc(100vh-10rem)] max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-lg">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                    <img src={otherUser.avatarUrl} alt={otherUser.name} className="w-10 h-10 rounded-full mr-3" />
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{otherUser.name}</h2>
                </div>
                <Link to="/" className="text-sm text-indigo-600 hover:text-indigo-500">Close</Link>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="text-center p-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-md text-sm">
                    <p><strong>Safety Tip:</strong> Do not share personal financial information. Arrange to meet in a public place.</p>
                </div>
                {messages.map(message => (
                    <div key={message.id} className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${message.senderId === currentUser.id ? 'bg-indigo-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200'}`}>
                           <p>{message.text}</p>
                           <p className={`text-xs mt-1 ${message.senderId === currentUser.id ? 'text-indigo-200' : 'text-gray-500 dark:text-gray-400'}`}>
                             {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                           </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold p-3 rounded-full shadow transition-colors disabled:bg-indigo-300" disabled={!newMessage.trim()}>
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                       </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
