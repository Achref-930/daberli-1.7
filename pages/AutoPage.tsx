import React from 'react';
import Navbar from '../components/Navbar';
import AutoCard from '../components/cards/AutoCard';
import { User, Ad } from '../types';
import { Filter, Search, Car } from 'lucide-react';

interface CategoryPageProps {
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
  onPostAdClick: () => void;
  ads: Ad[];
  selectedWilaya: string;
  onWilayaChange: (wilaya: string) => void;
}

const AutoPage: React.FC<CategoryPageProps> = ({ user, onSignIn, onSignOut, onPostAdClick, ads, selectedWilaya, onWilayaChange }) => {
  const autoAds = ads.filter(ad => ad.category === 'auto' && (!selectedWilaya || ad.location === selectedWilaya));

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar 
          user={user} 
          onSignIn={onSignIn} 
          onSignOut={onSignOut} 
          onPostAd={onPostAdClick} 
          variant="auto"
          selectedWilaya={selectedWilaya} 
          onWilayaChange={onWilayaChange}
      />
      
      {/* Auto Hero */}
      <div className="bg-slate-900 py-16 px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%">
                <pattern id="pattern-auto" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="2" fill="currentColor"></circle>
                </pattern>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-auto)"></rect>
              </svg>
          </div>

          <div className="max-w-7xl mx-auto relative z-10 text-center">
              <div className="inline-block p-3 rounded-full bg-slate-800/50 mb-4 border border-slate-700">
                  <Car className="w-8 h-8 text-red-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Find Your Next Ride</h1>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">Browse cars, trucks, and motorcycles across all 58 wilayas of Algeria.</p>

              <div className="bg-white p-4 rounded-lg shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
                  <div className="flex-1 bg-gray-50 rounded px-4 border border-gray-200 flex items-center gap-2">
                      <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      <input type="text" placeholder="Make, Model, or Year..." className="bg-transparent w-full py-3 focus:outline-none text-slate-900" />
                  </div>
                  <div className="w-full md:w-48 bg-gray-50 rounded px-4 border border-gray-200">
                      <label htmlFor="vehicle-type" className="sr-only">Vehicle Type</label>
                      <select id="vehicle-type" title="Vehicle Type" className="bg-transparent w-full py-3 focus:outline-none text-gray-600">
                          <option>All Types</option>
                          <option>Car</option>
                          <option>Truck</option>
                          <option>Motorcycle</option>
                      </select>
                  </div>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-bold transition-colors">
                      Search Cars
                  </button>
              </div>
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Latest Listings</h2>
                <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900 border border-slate-200 px-4 py-2 rounded-lg bg-white">
                    <Filter className="w-4 h-4" /> Filters
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {autoAds.map(ad => (
                    <AutoCard key={ad.id} ad={ad} />
                ))}
            </div>
      </div>
    </div>
  );
};

export default AutoPage;
