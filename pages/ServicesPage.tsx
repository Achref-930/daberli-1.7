import { Search, Wrench } from 'lucide-react';
import React from 'react';
import Navbar from '../components/Navbar';
import ServiceCard from '../components/cards/ServiceCard';
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

const ServicesPage: React.FC<CategoryPageProps> = ({ user, onSignIn, onSignOut, onPostAdClick, ads, selectedWilaya, onWilayaChange }) => {
  const serviceAds = ads.filter(ad => ad.category === 'services' && (!selectedWilaya || ad.location === selectedWilaya));

  return (
    <div className="min-h-screen bg-violet-50/50">
      <Navbar 
          user={user} 
          onSignIn={onSignIn} 
          onSignOut={onSignOut} 
          onPostAd={onPostAdClick} 
          variant="services"
          selectedWilaya={selectedWilaya} 
          onWilayaChange={onWilayaChange}
      />
      
      {/* Services Hero */}
      <div className="bg-violet-900 py-16 px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%">
                <pattern id="pattern-services" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="2" fill="currentColor"></circle>
                </pattern>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-services)"></rect>
              </svg>
          </div>

          <div className="max-w-7xl mx-auto relative z-10 text-center">
              <div className="inline-block p-3 rounded-full bg-violet-800/50 mb-4 border border-violet-700">
                  <Wrench className="w-8 h-8 text-violet-300" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Hire Great Pros</h1>
              <p className="text-violet-200 text-lg mb-8 max-w-2xl mx-auto">From plumbers to designers, find the right verified professional.</p>

              <div className="bg-white p-4 rounded-lg shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
                  <div className="flex-1 bg-gray-50 rounded px-4 border border-gray-200 flex items-center gap-2">
                      <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      <input type="text" placeholder="Service, expert name..." className="bg-transparent w-full py-3 focus:outline-none text-gray-900" />
                  </div>
                  <div className="w-full md:w-48 bg-gray-50 rounded px-4 border border-gray-200">
                      <label htmlFor="service-filter" className="sr-only">Filter by service type</label>
                      <select id="service-filter" title="Filter by service type" className="bg-transparent w-full py-3 focus:outline-none text-gray-600">
                          <option>All Services</option>
                          <option>Plumbing</option>
                          <option>Electrical</option>
                          <option>Moving</option>
                          <option>Design</option>
                      </select>
                  </div>
                  <button className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded font-bold transition-colors">
                      Find Pros
                  </button>
              </div>
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {serviceAds.map(ad => (
                    <ServiceCard key={ad.id} ad={ad} />
                ))}
            </div>
      </div>
    </div>
  );
};

export default ServicesPage;
