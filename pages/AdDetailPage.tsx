import {
  ArrowLeft,
  BadgeCheck,
  Bath,
  BedDouble,
  Briefcase,
  Building2,
  Calendar,
  Car,
  CheckCircle,
  Clock,
  DollarSign,
  Fuel,
  Gauge,
  Home,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Square,
  Star,
  Wrench,
  Zap,
} from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Ad, User } from '../types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface AdDetailPageProps {
  user: User | null;
  ads: Ad[];
  onSignIn: () => void;
  onSignOut: () => void;
  onPostAdClick: () => void;
  selectedWilaya: string;
  onWilayaChange: (wilaya: string) => void;
  onSendMessage: (adId: string, text: string) => void;
}

// ---------------------------------------------------------------------------
// Category theme config
// ---------------------------------------------------------------------------
const CATEGORY_THEME = {
  auto: {
    label: 'Auto',
    accent: 'red',
    bg: 'bg-red-600',
    bgLight: 'bg-red-50',
    text: 'text-red-600',
    border: 'border-red-200',
    ring: 'ring-red-500',
    badge: 'bg-red-100 text-red-700',
    button: 'bg-red-600 hover:bg-red-700',
    icon: <Car className="w-5 h-5" />,
    formLabel: 'Message Seller',
    formPlaceholder: 'Hi, I\'m interested in this vehicle. Is it still available?',
    ctaLabel: 'Contact Seller',
  },
  'real-estate': {
    label: 'Real Estate',
    accent: 'emerald',
    bg: 'bg-emerald-600',
    bgLight: 'bg-emerald-50',
    text: 'text-emerald-600',
    border: 'border-emerald-200',
    ring: 'ring-emerald-500',
    badge: 'bg-emerald-100 text-emerald-700',
    button: 'bg-emerald-600 hover:bg-emerald-700',
    icon: <Home className="w-5 h-5" />,
    formLabel: 'Contact Agent',
    formPlaceholder: 'Hello, I\'d like to schedule a viewing for this property.',
    ctaLabel: 'Contact Agent',
  },
  jobs: {
    label: 'Jobs',
    accent: 'blue',
    bg: 'bg-blue-600',
    bgLight: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-200',
    ring: 'ring-blue-500',
    badge: 'bg-blue-100 text-blue-700',
    button: 'bg-blue-600 hover:bg-blue-700',
    icon: <Briefcase className="w-5 h-5" />,
    formLabel: 'Apply for This Job',
    formPlaceholder: 'Briefly describe why you\'re a great fit for this role...',
    ctaLabel: 'Apply Now',
  },
  services: {
    label: 'Services',
    accent: 'violet',
    bg: 'bg-violet-600',
    bgLight: 'bg-violet-50',
    text: 'text-violet-600',
    border: 'border-violet-200',
    ring: 'ring-violet-500',
    badge: 'bg-violet-100 text-violet-700',
    button: 'bg-violet-600 hover:bg-violet-700',
    icon: <Wrench className="w-5 h-5" />,
    formLabel: 'Request This Service',
    formPlaceholder: 'Describe what you need and the best time to reach you.',
    ctaLabel: 'Request Service',
  },
};

// ---------------------------------------------------------------------------
// Category-specific detail rows
// ---------------------------------------------------------------------------
const AutoDetails: React.FC<{ details: Ad['details'] }> = ({ details }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
    {[
      { icon: <Calendar className="w-4 h-4 text-red-500" />, label: 'Year', value: details?.Year ?? details?.year ?? '—' },
      { icon: <Fuel className="w-4 h-4 text-red-500" />, label: 'Fuel', value: details?.Fuel ?? details?.fuelType ?? '—' },
      { icon: <Gauge className="w-4 h-4 text-red-500" />, label: 'Mileage', value: details?.Mileage ?? details?.mileage ? `${details?.Mileage ?? details?.mileage} km` : '—' },
      { icon: <Car className="w-4 h-4 text-red-500" />, label: 'Transmission', value: details?.Transmission ?? details?.transmission ?? '—' },
    ].map(({ icon, label, value }) => (
      <div key={label} className="bg-red-50 rounded-xl p-3 flex flex-col items-center text-center">
        <span className="mb-1">{icon}</span>
        <span className="text-xs text-gray-500 mb-0.5">{label}</span>
        <span className="text-sm font-bold text-gray-900">{String(value)}</span>
      </div>
    ))}
  </div>
);

const RealEstateDetails: React.FC<{ details: Ad['details'] }> = ({ details }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
    {[
      { icon: <BedDouble className="w-4 h-4 text-emerald-600" />, label: 'Bedrooms', value: details?.Bedrooms ?? details?.bedrooms ?? '—' },
      { icon: <Bath className="w-4 h-4 text-emerald-600" />, label: 'Bathrooms', value: details?.Bathrooms ?? details?.bathrooms ?? '—' },
      { icon: <Square className="w-4 h-4 text-emerald-600" />, label: 'Area', value: details?.Area ?? details?.area ? `${details?.Area ?? details?.area} m²` : '—' },
      { icon: <Home className="w-4 h-4 text-emerald-600" />, label: 'Type', value: details?.Type ?? details?.type ?? '—' },
      { icon: <Calendar className="w-4 h-4 text-emerald-600" />, label: 'Floor', value: details?.Floor ?? details?.floor ?? '—' },
    ].map(({ icon, label, value }) => (
      <div key={label} className="bg-emerald-50 rounded-xl p-3 flex flex-col items-center text-center">
        <span className="mb-1">{icon}</span>
        <span className="text-xs text-gray-500 mb-0.5">{label}</span>
        <span className="text-sm font-bold text-gray-900">{String(value)}</span>
      </div>
    ))}
  </div>
);

const JobDetails: React.FC<{ details: Ad['details'] }> = ({ details }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
    {[
      { icon: <Briefcase className="w-4 h-4 text-blue-600" />, label: 'Type', value: details?.Type ?? details?.jobType ?? '—' },
      { icon: <Building2 className="w-4 h-4 text-blue-600" />, label: 'Company', value: details?.Company ?? details?.company ?? 'Confidential' },
      { icon: <DollarSign className="w-4 h-4 text-blue-600" />, label: 'Experience', value: details?.Experience ?? details?.experience ?? '—' },
      { icon: <MapPin className="w-4 h-4 text-blue-600" />, label: 'Mode', value: details?.Mode ?? details?.remote ?? 'On-site' },
    ].map(({ icon, label, value }) => (
      <div key={label} className="bg-blue-50 rounded-xl p-3 flex flex-col items-center text-center">
        <span className="mb-1">{icon}</span>
        <span className="text-xs text-gray-500 mb-0.5">{label}</span>
        <span className="text-sm font-bold text-gray-900">{String(value)}</span>
      </div>
    ))}
  </div>
);

const ServiceDetails: React.FC<{ ad: Ad }> = ({ ad }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
    {[
      { icon: <Star className="w-4 h-4 text-violet-600" />, label: 'Rating', value: ad.rating ? `${ad.rating} / 5` : 'New' },
      { icon: <MessageSquare className="w-4 h-4 text-violet-600" />, label: 'Reviews', value: ad.details?.reviews ?? ad.details?.Reviews ?? '0' },
      { icon: <Wrench className="w-4 h-4 text-violet-600" />, label: 'Experience', value: ad.details?.Exp ?? ad.details?.experience ?? '—' },
      { icon: <ShieldCheck className="w-4 h-4 text-violet-600" />, label: 'Verified', value: ad.isVerified ? 'Yes' : 'No' },
    ].map(({ icon, label, value }) => (
      <div key={label} className="bg-violet-50 rounded-xl p-3 flex flex-col items-center text-center">
        <span className="mb-1">{icon}</span>
        <span className="text-xs text-gray-500 mb-0.5">{label}</span>
        <span className="text-sm font-bold text-gray-900">{String(value)}</span>
      </div>
    ))}
  </div>
);

// ---------------------------------------------------------------------------
// Related ad mini-card
// ---------------------------------------------------------------------------
const RelatedCard: React.FC<{ ad: Ad }> = ({ ad }) => (
  <Link
    to={`/ad/${ad.id}`}
    className="group flex gap-3 bg-white rounded-xl border border-gray-100 p-3 hover:shadow-md transition-all"
  >
    <img src={ad.image} alt={ad.title} className="w-20 h-16 object-cover rounded-lg shrink-0" />
    <div className="min-w-0">
      <p className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">{ad.title}</p>
      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><MapPin className="w-3 h-3" />{ad.location}</p>
      <p className="text-sm font-bold text-gray-900 mt-1">{ad.price.toLocaleString()} <span className="text-xs font-normal text-gray-500">{ad.currency}</span></p>
    </div>
  </Link>
);

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
const AdDetailPage: React.FC<AdDetailPageProps> = ({
  user,
  ads,
  onSignIn,
  onSignOut,
  onPostAdClick,
  selectedWilaya,
  onWilayaChange,
  onSendMessage,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const ad = ads.find((a) => a.id === id);

  const [message, setMessage] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  // 404
  if (!ad) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} onSignIn={onSignIn} onSignOut={onSignOut} onPostAd={onPostAdClick} selectedWilaya={selectedWilaya} onWilayaChange={onWilayaChange} showBackButton />
        <div className="max-w-lg mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-500 mb-6">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Ad not found</h1>
          <p className="text-gray-500 mb-6">This listing may have been removed or the link is invalid.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const theme = CATEGORY_THEME[ad.category];
  const relatedAds = ads.filter((a) => a.category === ad.category && a.id !== ad.id).slice(0, 3);
  const isJob = ad.category === 'jobs';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { onSignIn(); return; }
    const text = isJob
      ? `Application from ${applicantName || user.name}:\n\n${message}`
      : message;
    if (!text.trim()) return;
    onSendMessage(ad.id, text);
    setSent(true);
    setMessage('');
    setApplicantName('');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        user={user}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
        onPostAd={onPostAdClick}
        selectedWilaya={selectedWilaya}
        onWilayaChange={onWilayaChange}
        showBackButton
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
          <span>/</span>
          <Link to={`/${ad.category}`} className={`hover:text-gray-900 transition-colors capitalize`}>{theme.label}</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium line-clamp-1">{ad.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── LEFT COLUMN (2/3) ─────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-gray-200 shadow-sm">
              <img src={ad.image} alt={ad.title} className="w-full h-full object-cover" />

              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Top badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white ${theme.bg}`}>
                  {theme.icon} {theme.label}
                </span>
                {ad.isBoosted && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-amber-900">
                    <Zap className="w-3 h-3 fill-current" /> Sponsored
                  </span>
                )}
              </div>

              {/* Share button */}
              <button
                onClick={handleShare}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors"
                title="Copy link"
              >
                {copied ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Share2 className="w-5 h-5" />}
              </button>

              {/* Bottom info */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <p className="text-white/70 text-xs mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {ad.location}
                  </p>
                  <p className="text-white text-2xl font-bold drop-shadow-md">
                    {ad.price > 0 ? `${ad.price.toLocaleString()} ${ad.currency}` : 'Negotiable'}
                  </p>
                </div>
                {ad.isVerified && (
                  <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <BadgeCheck className="w-4 h-4 text-blue-300" />
                    <span className="text-white text-xs font-semibold">Verified</span>
                  </div>
                )}
              </div>
            </div>

            {/* Title + meta */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-start gap-3 justify-between flex-wrap">
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">{ad.title}</h1>
                <span className="text-xs text-gray-400 flex items-center gap-1 shrink-0 mt-1">
                  <Clock className="w-3.5 h-3.5" /> {ad.datePosted}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-gray-500 text-sm">
                <MapPin className="w-4 h-4" /> {ad.location}
              </div>

              {/* Category-specific stats */}
              {ad.rating && ad.category === 'services' && (
                <div className="flex items-center gap-1 mt-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${s <= Math.round(ad.rating!) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`}
                    />
                  ))}
                  <span className="text-sm font-bold text-gray-900 ml-1">{ad.rating}</span>
                  <span className="text-sm text-gray-400">({ad.details?.reviews ?? 0} reviews)</span>
                </div>
              )}
            </div>

            {/* Category-specific detail chips */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-base font-bold text-gray-900 mb-4">Details</h2>
              {ad.category === 'auto' && <AutoDetails details={ad.details} />}
              {ad.category === 'real-estate' && <RealEstateDetails details={ad.details} />}
              {ad.category === 'jobs' && <JobDetails details={ad.details} />}
              {ad.category === 'services' && <ServiceDetails ad={ad} />}

              {/* All raw detail entries as fallback chips */}
              {ad.details && Object.keys(ad.details).length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-50">
                  {Object.entries(ad.details).map(([key, val]) => (
                    <span key={key} className="inline-flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700">
                      <span className="font-semibold text-gray-500">{key}:</span> {String(val)}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Description placeholder */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-base font-bold text-gray-900 mb-3">About this listing</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {ad.details?.description as string ||
                  `This is a ${theme.label.toLowerCase()} listing in ${ad.location}. ` +
                  (isJob
                    ? `We are looking for a qualified candidate to join our team. Apply below with your details.`
                    : `Contact the seller for more information about this listing.`)}
              </p>
            </div>

            {/* Related ads */}
            {relatedAds.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h2 className="text-base font-bold text-gray-900 mb-4">Similar listings</h2>
                <div className="space-y-3">
                  {relatedAds.map((r) => <RelatedCard key={r.id} ad={r} />)}
                </div>
                <Link
                  to={`/${ad.category}`}
                  className={`mt-4 flex items-center justify-center gap-2 text-sm font-semibold ${theme.text} hover:underline`}
                >
                  View all {theme.label} listings →
                </Link>
              </div>
            )}
          </div>

          {/* ── RIGHT COLUMN (1/3) ───────────────────────────────────────── */}
          <div className="space-y-5">

            {/* Price card */}
            <div className={`bg-white rounded-2xl border ${theme.border} p-6 shadow-sm`}>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
                {isJob ? 'Salary' : 'Price'}
              </p>
              <p className="text-3xl font-extrabold text-gray-900">
                {ad.price > 0 ? ad.price.toLocaleString() : 'Negotiable'}
              </p>
              {ad.price > 0 && <p className="text-sm text-gray-500 mt-0.5">{ad.currency}</p>}
            </div>

            {/* Seller / Poster info */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">
                {isJob ? 'Employer' : 'Seller'}
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(ad.details?.company as string || ad.title.split(' ')[0])}&background=0D8ABC&color=fff&rounded=true&bold=true`}
                  alt="Seller"
                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm shrink-0"
                />
                <div>
                  <p className="font-bold text-gray-900 text-sm">
                    {ad.details?.company as string || ad.title.split(' ')[0]}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" /> {ad.location}
                  </p>
                  {ad.isVerified && (
                    <span className="inline-flex items-center gap-1 mt-1 text-xs text-blue-600 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Contact / Apply form */}
            <div className={`bg-white rounded-2xl border ${theme.border} p-5 shadow-sm`}>
              <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                {isJob ? <Briefcase className={`w-4 h-4 ${theme.text}`} /> : <Phone className={`w-4 h-4 ${theme.text}`} />}
                {theme.formLabel}
              </h2>

              {sent ? (
                <div className="flex flex-col items-center gap-3 py-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <p className="font-semibold text-gray-900">
                    {isJob ? 'Application sent!' : 'Message sent!'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {isJob
                      ? 'The employer will review your application and get back to you.'
                      : 'The seller will reply to you shortly.'}
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-2 text-sm text-blue-600 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : !user ? (
                <div className="flex flex-col items-center gap-3 py-6 text-center">
                  <p className="text-sm text-gray-600">Sign in to {isJob ? 'apply for this job' : 'contact the seller'}.</p>
                  <button
                    onClick={onSignIn}
                    className={`w-full py-2.5 rounded-xl text-white font-semibold text-sm transition-colors ${theme.button}`}
                  >
                    Sign In to {theme.ctaLabel}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {isJob && (
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Your Name</label>
                      <input
                        type="text"
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder={user.name}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      {isJob ? 'Cover Letter / Message' : 'Message'}
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={theme.formPlaceholder}
                      required
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!message.trim()}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${theme.button}`}
                  >
                    <Send className="w-4 h-4" />
                    {theme.ctaLabel}
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    Replies will appear in your{' '}
                    <Link to="/messages" className="text-blue-500 hover:underline">Messages</Link>
                  </p>
                </form>
              )}
            </div>

            {/* Safety tip */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <p className="text-xs font-semibold text-amber-800 mb-1 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" /> Safety Tip
              </p>
              <p className="text-xs text-amber-700 leading-relaxed">
                Never pay in advance without seeing the listing in person. Meet in a public place and verify the seller's identity before any transaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdDetailPage;
