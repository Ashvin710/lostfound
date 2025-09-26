
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Item, Category, ItemStatus } from '../types';
import { generateImageDescription } from '../services/geminiService';
import Spinner from '../components/Spinner';

const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

const PostItem: React.FC = () => {
    const { state, dispatch } = useAppContext();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<Category>(Category.Lost);
    const [location, setLocation] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [aiDescription, setAiDescription] = useState<string | null>(null);
    const [potentialMatches, setPotentialMatches] = useState<Item[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
            setAiDescription(null);
            setPotentialMatches([]);
        }
    };

    const handleAnalyzeImage = async () => {
        if (!imageFile) return;
        setIsAnalyzing(true);
        setAiDescription(null);
        setPotentialMatches([]);
        const result = await generateImageDescription(imageFile);
        setAiDescription(result);
        if(category === Category.Lost) {
            findPotentialMatches(result);
        }
        setIsAnalyzing(false);
    };
    
    const findPotentialMatches = useCallback((searchDescription: string) => {
        if (!searchDescription || searchDescription.startsWith("AI analysis failed")) {
            setPotentialMatches([]);
            return;
        }

        const keywords = searchDescription.toLowerCase().split(/\s+/);
        const matches = state.items.filter(item => {
            if (item.category !== Category.Found || item.status !== ItemStatus.Open) return false;
            
            const itemText = `${item.title.toLowerCase()} ${item.description.toLowerCase()} ${item.imageDescription?.toLowerCase() || ''}`;
            return keywords.some(keyword => itemText.includes(keyword));
        });
        setPotentialMatches(matches);
    }, [state.items]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!state.user || !imageFile) return;

        const newItem: Item = {
            id: `item-${Date.now()}`,
            title,
            description,
            category,
            imageUrl: imagePreview!,
            imageDescription: aiDescription || undefined,
            location,
            date: new Date(date).toISOString(),
            status: ItemStatus.Open,
            userId: state.user.id,
        };

        dispatch({ type: 'ADD_ITEM', payload: newItem });
        navigate('/');
    };

    return (
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Post an Item</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                        <select id="category" value={category} onChange={(e) => setCategory(e.target.value as Category)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600">
                            <option value={Category.Lost}>Lost</option>
                            <option value={Category.Found}>Found</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                        <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., Near Golden Gate Park" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date {category === Category.Lost ? 'Lost' : 'Found'}</label>
                        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Photo of Item</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md dark:border-gray-600">
                        <div className="space-y-1 text-center">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Item preview" className="mx-auto h-48 w-auto rounded-lg"/>
                            ) : (
                                <>
                                 <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                                 <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2">
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </>
                            )}
                        </div>
                    </div>
                    {imageFile && (
                        <div className="mt-4 text-center">
                            <button type="button" onClick={handleAnalyzeImage} disabled={isAnalyzing} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-purple-300">
                                {isAnalyzing ? <><Spinner /> <span className="ml-2">Analyzing...</span></> : '✨ Analyze with AI'}
                            </button>
                        </div>
                    )}
                </div>

                {aiDescription && (
                    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">AI Analysis Result:</h3>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 italic">"{aiDescription}"</p>
                    </div>
                )}
                
                {category === Category.Lost && potentialMatches.length > 0 && (
                     <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                        <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">Potential Matches Found!</h3>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-4">Based on your image, we found these items reported as 'Found'.</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {potentialMatches.map(match => (
                                <a href={`/#/item/${match.id}`} key={match.id} target="_blank" rel="noopener noreferrer" className="group">
                                    <img src={match.imageUrl} alt={match.title} className="rounded-md object-cover h-24 w-full group-hover:opacity-80 transition-opacity" />
                                    <p className="text-xs mt-1 truncate font-medium">{match.title}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                <div className="pt-5">
                    <div className="flex justify-end">
                        <button type="button" onClick={() => navigate(-1)} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">Cancel</button>
                        <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300" disabled={!imageFile}>
                            Submit Post
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PostItem;
