import { Home } from 'lucide-react';
import React from 'react';
import Navbar from '../components/Navbar';
import RealEstateCard from '../components/cards/RealEstateCard';
import { Ad, User } from '../types';

interface CategoryPageProps {
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
  onPostAdClick: () => void;
  ads: Ad[];
  selectedWilaya: string;
  onWilayaChange: (wilaya: string) => void;
}

const RealEstatePage: React.FC<CategoryPageProps> = ({ user, onSignIn, onSignOut, onPostAdClick, ads, selectedWilaya, onWilayaChange }) => {
  const reAds = ads.filter(ad => ad.category === 'real-estate' && (!selectedWilaya || ad.location === selectedWilaya));

  return (
    <div className="min-h-screen bg-stone-50 font-serif">
      <Navbar 
          user={user} 
          onSignIn={onSignIn} 
          onSignOut={onSignOut} 
          onPostAd={onPostAdClick} 
          variant="real-estate"
          selectedWilaya={selectedWilaya} 
          onWilayaChange={onWilayaChange}
      />
      
      {/* Real Estate Hero */}
      <div className="bg-emerald-900 py-16 px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
              <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
                <circle id="pattern-circle" cx="10" cy="10" r="2" fill="currentColor"></circle>
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10 text-center">
              <div className="inline-block p-3 rounded-full bg-emerald-800/50 mb-4 border border-emerald-700">
                  <Home className="w-8 h-8 text-emerald-300" />
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 tracking-tight">Find Your Dream Home</h1>
              <p className="text-emerald-200 text-lg mb-8 max-w-2xl mx-auto font-sans">Discover apartments, villas, and commercial properties across Algeria.</p>
              
              <div className="bg-white p-4 rounded-lg shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row gap-4 font-sans">
                  <div className="flex-1 bg-gray-50 rounded px-4 border border-gray-200">
                      <input type="text" placeholder="City, Neighborhood..." className="bg-transparent w-full py-3 focus:outline-none text-gray-900" />
                  </div>
                  <div className="w-full md:w-48 bg-gray-50 rounded px-4 border border-gray-200">
                       <select className="bg-transparent w-full py-3 focus:outline-none text-gray-600" aria-label="Property type" title="Select property type">
                           <option>For Sale</option>
                           <option>For Rent</option>
                       </select>
                  </div>
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded font-bold transition-colors">
                      Search
                  </button>
              </div>
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 font-sans">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 border-b border-gray-200 pb-4">Featured Properties</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reAds.map(ad => (
                    <RealEstateCard key={ad.id} ad={ad} />
                ))}
            </div>
      </div>
    </div>
  );
};

export default RealEstatePage;
