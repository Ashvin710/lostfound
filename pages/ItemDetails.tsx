
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { MOCK_USERS } from '../constants';
import { ItemStatus, Category } from '../types';

const LocationIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const ItemDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { state, dispatch } = useAppContext();
    const navigate = useNavigate();
    const item = state.items.find(i => i.id === id);
    const poster = MOCK_USERS.find(u => u.id === item?.userId);

    if (!item || !poster) {
        return <div className="text-center py-10">Item not found.</div>;
    }

    const handleMarkAsResolved = () => {
        dispatch({ type: 'UPDATE_ITEM_STATUS', payload: { id: item.id, status: ItemStatus.Resolved } });
    };
    
    const isOwner = state.user?.id === item.userId;
    const categoryColor = item.category === Category.Lost ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
    const statusColor = item.status === ItemStatus.Open ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800';

    return (
        <div className="max-w-5xl mx-auto">
            <button onClick={() => navigate(-1)} className="mb-6 text-indigo-600 hover:text-indigo-800 font-medium">
                &larr; Back to Dashboard
            </button>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/2">
                        <img className="h-full w-full object-cover" src={item.imageUrl} alt={item.title} />
                    </div>
                    <div className="md:w-1/2 p-8">
                        <div className="flex items-center gap-4 mb-2">
                             <span className={`px-3 py-1 text-sm font-semibold rounded-full ${categoryColor}`}>
                                {item.category}
                            </span>
                             <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusColor}`}>
                                {item.status}
                            </span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{item.title}</h1>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">{item.description}</p>
                        
                        <div className="mt-6 space-y-3">
                            <div className="flex items-center text-gray-700 dark:text-gray-300">
                                <LocationIcon className="h-6 w-6 mr-3 text-gray-500" />
                                <span>{item.location}</span>
                            </div>
                            <div className="flex items-center text-gray-700 dark:text-gray-300">
                                <CalendarIcon className="h-6 w-6 mr-3 text-gray-500" />
                                <span>{new Date(item.date).toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="mt-8 border-t pt-6 border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Posted by</h2>
                             <div className="flex items-center">
                                <img className="h-12 w-12 rounded-full object-cover" src={poster.avatarUrl} alt={poster.name} />
                                <div className="ml-4">
                                    <p className="text-md font-medium text-gray-900 dark:text-white">{poster.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Member since 2024</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            {isOwner ? (
                                item.status === ItemStatus.Open ? (
                                    <button onClick={handleMarkAsResolved} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-colors">
                                        Mark as Resolved
                                    </button>
                                ) : (
                                    <div className="text-center p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-lg">
                                        This item has been marked as resolved.
                                    </div>
                                )
                            ) : (
                                <Link to={`/chat/${poster.id}`} className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-colors">
                                    Contact {poster.name}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetails;
