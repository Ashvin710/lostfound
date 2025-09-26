
import React from 'react';

const MapPinIcon: React.FC<{ className?: string, style?: React.CSSProperties }> = ({ className, style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} style={style} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 20l-4.95-6.05a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);


const MapPlaceholder: React.FC = () => {
    return (
        <div className="relative w-full h-[600px] rounded-lg bg-gray-300 dark:bg-gray-700 overflow-hidden border-4 border-gray-200 dark:border-gray-600 shadow-lg">
            <img 
                src="https://picsum.photos/seed/mapbg/1200/800"
                alt="Abstract map background" 
                className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                <div className="text-center text-white p-4 bg-gray-800 bg-opacity-70 rounded-lg">
                    <h3 className="text-2xl font-bold">Interactive Map View</h3>
                    <p className="mt-2">Item locations would be displayed here.</p>
                </div>
            </div>
             {/* Mock pins */}
            <MapPinIcon className="absolute text-red-500 h-10 w-10" style={{ top: '20%', left: '30%' }} />
            <MapPinIcon className="absolute text-green-500 h-10 w-10" style={{ top: '50%', left: '55%' }} />
            <MapPinIcon className="absolute text-green-500 h-10 w-10" style={{ top: '65%', left: '25%' }} />
            <MapPinIcon className="absolute text-red-500 h-10 w-10" style={{ top: '35%', left: '70%' }} />
        </div>
    );
};

export default MapPlaceholder;
