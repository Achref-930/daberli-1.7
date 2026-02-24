import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingActionBar from '../components/FloatingActionBar';
import AuthModal from '../components/AuthModal';
import PostAdModal from '../components/PostAdModal';
import { User, Ad, Category } from '../types';
import ServiceCard from '../components/ServiceCard';
import { MOCK_ADS } from '../constants';
import { Search, Filter, ArrowLeft } from 'lucide-react';

interface CategoryPageProps {
  category: Category;
  title: string;
  subtitle: string;
  searchPlaceholder?: string;
  user: User | null;
  ads: Ad[];
  onPostAdClick: () => void;
  onPostAdSubmit: (adData: any) => void;
  onSignIn: () => void;
  onSignOut: () => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ 
  category, 
  title, 
  subtitle, 
  searchPlaceholder = "Search...",
  user,
  ads,
  onPostAdClick,
  onSignIn,
  onSignOut,
  onPostAdSubmit
}) => {
  const navigate = useNavigate();
  const [selectedWilaya, setSelectedWilaya] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPostAdModalOpen, setIsPostAdModalOpen] = useState(false);

  // Filter ads for this category
  const categoryAds = ads.filter(ad => {
    const matchesCategory = ad.category === category;
    const matchesWilaya = selectedWilaya === '' || ad.location === selectedWilaya;
    const matchesSearch = ad.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesWilaya && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar 
        selectedWilaya={selectedWilaya} 
        onWilayaChange={setSelectedWilaya} 
        user={user}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
        onPostAd={onPostAdClick}
      />

      <div className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <a href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-daberli-blue mb-4">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Home
            </a>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">{title}</h1>
                    <p className="text-gray-500 mt-1">{subtitle}</p>
                </div>
                
                <div className="relative w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-daberli-blue focus:border-transparent transition-all"
                        placeholder={searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
         </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
         <div className="flex justify-between items-center mb-6">
            <span className="font-medium text-gray-700">{categoryAds.length} Results</span>
            <button className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-daberli-blue bg-white border border-gray-200 px-4 py-2 rounded-lg">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
            </button>
         </div>

         {categoryAds.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryAds.map((ad) => (
                <ServiceCard key={ad.id} ad={ad} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
               <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 inline-block">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 mb-4">
                        <Search className="h-8 w-8 text-daberli-blue" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No listings found</h3>
                    <p className="text-gray-500 mt-1">Try adjusting your search or filters.</p>
                    <button 
                        onClick={() => {
                           setSearchQuery('');
                           setSelectedWilaya('');
                        }}
                        className="mt-4 text-daberli-blue hover:underline font-bold"
                    >
                        Clear Filters
                    </button>
               </div>
            </div>
          )}
      </main>

      <Footer />
      <FloatingActionBar 
        onHome={() => window.location.href = '/'}
        onPostAd={onPostAdClick} 
        onProfile={user ? () => navigate('/profile') : onSignIn}
      />
    </div>
  );
};

export default CategoryPage;
