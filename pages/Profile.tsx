
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import ItemCard from '../components/ItemCard';
import { ItemStatus } from '../types';

const Profile: React.FC = () => {
    const { state } = useAppContext();
    const { user, items } = state;
    const [activeTab, setActiveTab] = useState<'myPosts' | 'resolved'>('myPosts');

    if (!user) {
        return <div className="text-center py-10">Please log in to view your profile.</div>;
    }

    const myPosts = items.filter(item => item.userId === user.id && item.status === ItemStatus.Open);
    const resolvedPosts = items.filter(item => item.userId === user.id && item.status === ItemStatus.Resolved);

    const renderItems = (itemList: any[]) => {
        if (itemList.length === 0) {
            return <p className="text-gray-500 mt-4">No items to display here.</p>;
        }
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {itemList.map(item => <ItemCard key={item.id} item={item} />)}
            </div>
        );
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 mb-8">
                <div className="flex flex-col md:flex-row items-center">
                    <img className="h-32 w-32 rounded-full object-cover shadow-md border-4 border-indigo-500" src={user.avatarUrl} alt={user.name} />
                    <div className="mt-4 md:mt-0 md:ml-8 text-center md:text-left">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">{user.email}</p>
                        <p className="text-gray-600 dark:text-gray-300">{user.location}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
                <div className="border-b border-gray-200 dark:border-gray-700">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        <button
                            onClick={() => setActiveTab('myPosts')}
                            className={`${activeTab === 'myPosts' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            My Open Posts
                        </button>
                        <button
                            onClick={() => setActiveTab('resolved')}
                            className={`${activeTab === 'resolved' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Resolved Items
                        </button>
                    </nav>
                </div>

                <div className="mt-6">
                    {activeTab === 'myPosts' ? renderItems(myPosts) : renderItems(resolvedPosts)}
                </div>
            </div>
        </div>
    );
};

export default Profile;
