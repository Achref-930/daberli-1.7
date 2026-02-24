import { Zap } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingActionBar from '../components/FloatingActionBar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import ServiceCard from '../components/ServiceCard';
import { Ad, Category, User } from '../types';

interface HomePageProps {
  selectedWilaya: string;
  onWilayaChange: (wilaya: string) => void;
  user: User | null;
  ads: Ad[];
  onSignIn: () => void;
  onSignOut: () => void;
  onPostAd: () => void;
  onSearch: (query: string, category: Category | 'all') => void;
  activeCategory: Category | 'all';
  setActiveCategory: (category: Category | 'all') => void;
}

const HomePage: React.FC<HomePageProps> = ({
  selectedWilaya,
  onWilayaChange,
  user,
  ads,
  onSignIn,
  onSignOut,
  onPostAd,
  onSearch,
  activeCategory,
  setActiveCategory
}) => {
  const navigate = useNavigate();
  // Only show admin-boosted ads in the featured section
  const boostedAds = ads.filter((ad) => ad.isBoosted);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar 
        selectedWilaya={selectedWilaya} 
        onWilayaChange={onWilayaChange} 
        user={user}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
        onPostAd={onPostAd}
      />
      
      <main className="grow">
        <Hero />
        
        {/* Boosted / Sponsored Ads Section */}
        <div id="featured-listings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex justify-between items-end mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-xl">
                <Zap className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Featured Listings</h2>
                <p className="text-gray-500 mt-1">Hand-picked and promoted by Daberli.</p>
              </div>
            </div>
          </div>

          {boostedAds.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {boostedAds.map((ad) => (
                <ServiceCard key={ad.id} ad={ad} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
              <div className="p-4 bg-amber-50 rounded-2xl mb-4">
                <Zap className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">No Featured Ads Yet</h3>
              <p className="text-sm text-gray-400">Admins can boost listings to appear here.</p>
            </div>
          )}
        </div>
        
        {/* Option 3 — Slim trust bar */}
        <div className="bg-slate-900 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <span className="text-emerald-400 text-lg font-bold">✓</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Verified Professionals & Listings</p>
                  <p className="text-slate-400 text-xs mt-0.5">
                    The <span className="text-emerald-400 font-semibold">green badge</span> means identity & credentials confirmed.
                  </p>
                </div>
              </div>
              <button className="shrink-0 text-xs font-semibold text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 px-5 py-2 rounded-full transition-colors">
                Learn about Trust →
              </button>
            </div>
          </div>
        </div>

        {/* Option 2 — Trust cards */}
        <div className="bg-gray-50 border-y border-gray-100 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 text-center mb-6">
              Why trust Daberli?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: '🛡️', title: 'Verified Identities', desc: 'Every pro badge means we checked their ID and credentials.' },
                { icon: '💬', title: 'Real Reviews', desc: 'Ratings come from confirmed buyers and renters only.' },
                { icon: '🔒', title: 'Secure Contact', desc: 'Your number stays private until you choose to share it.' },
              ].map(item => (
                <div key={item.title} className="flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>

      <Footer />
      <FloatingActionBar 
        onHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onPostAd={onPostAd} 
        onProfile={user ? () => navigate('/profile') : onSignIn}
      />
    </div>
  );
};

export default HomePage;
