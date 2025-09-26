
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ItemCard from '../components/ItemCard';
import MapPlaceholder from '../components/MapPlaceholder';
import { Category } from '../types';

const ListIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
);

const MapIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13v-6m0-4V3l5.553 2.776a1 1 0 01.447.894v10.764a1 1 0 01-1.447.894L15 17m-6 3v-6m6 0V7" />
    </svg>
);


const Dashboard: React.FC = () => {
    const { state } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState<Category | 'All'>('All');
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

    const filteredItems = useMemo(() => {
        return state.items
            .filter(item => {
                if (filterCategory === 'All') return true;
                return item.category === filterCategory;
            })
            .filter(item => {
                if (searchTerm.trim() === '') return true;
                return item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.location.toLowerCase().includes(searchTerm.toLowerCase());
            });
    }, [state.items, searchTerm, filterCategory]);

    return (
        <div className="space-y-6">
            <div className="md:flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">Browse and report lost & found items in your community.</p>
                </div>
                <Link to="/post" className="mt-4 md:mt-0 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow transition-colors">
                    + Post an Item
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Search by keyword, location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value as Category | 'All')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="All">All Categories</option>
                        <option value={Category.Lost}>Lost</option>
                        <option value={Category.Found}>Found</option>
                    </select>
                     <div className="flex items-center justify-center md:justify-end bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`w-full flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${viewMode === 'list' ? 'bg-white dark:bg-gray-800 shadow text-indigo-600' : 'text-gray-600 dark:text-gray-300'}`}
                        >
                            <ListIcon className="h-5 w-5" />
                            List
                        </button>
                        <button
                            onClick={() => setViewMode('map')}
                            className={`w-full flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${viewMode === 'map' ? 'bg-white dark:bg-gray-800 shadow text-indigo-600' : 'text-gray-600 dark:text-gray-300'}`}
                        >
                            <MapIcon className="h-5 w-5" />
                            Map
                        </button>
                    </div>
                </div>
            </div>

            <div>
                {viewMode === 'list' ? (
                    filteredItems.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredItems.map(item => (
                                <ItemCard key={item.id} item={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
                            <h3 className="text-xl font-semibold">No items found</h3>
                            <p className="mt-2 text-gray-500">Try adjusting your search or filter.</p>
                        </div>
                    )
                ) : (
                    <MapPlaceholder />
                )}
            </div>
        </div>
    );
};

export default Dashboard;
