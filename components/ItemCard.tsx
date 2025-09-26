
import React from 'react';
import { Link } from 'react-router-dom';
import { Item, Category, ItemStatus } from '../types';

interface ItemCardProps {
  item: Item;
}

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


const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const categoryColor = item.category === Category.Lost ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
  const statusColor = item.status === ItemStatus.Resolved ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800';

  return (
    <Link to={`/item/${item.id}`} className="block group">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="relative">
                <img className="h-56 w-full object-cover" src={item.imageUrl} alt={item.title} />
                <div className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded-full ${categoryColor}`}>
                    {item.category.toUpperCase()}
                </div>
                 {item.status !== ItemStatus.Open && (
                    <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${statusColor}`}>
                        {item.status.toUpperCase()}
                    </div>
                 )}
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate group-hover:text-indigo-500">{item.title}</h3>
                <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <LocationIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    <span className="truncate">{item.location}</span>
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    </Link>
  );
};

export default ItemCard;
