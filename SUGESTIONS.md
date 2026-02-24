# Daberli — Enhancement Suggestions
> Covering: UI/UX · Code Quality · Product & Idea
> Date: February 23, 2026

---

## Table of Contents

1. [UI & UX Enhancements](#1-ui--ux-enhancements)
   - 1.1 [Navigation & Layout](#11-navigation--layout)
   - 1.2 [Home Page](#12-home-page)
   - 1.3 [Ad Cards](#13-ad-cards)
   - 1.4 [Category Pages](#14-category-pages)
   - 1.5 [Ad Detail Page (Missing)](#15-ad-detail-page-missing-entirely)
   - 1.6 [Post Ad Flow](#16-post-ad-flow)
   - 1.7 [Mobile Experience](#17-mobile-experience)
   - 1.8 [Messaging](#18-messaging)
   - 1.9 [Dark Mode](#19-dark-mode)
2. [Code Quality Enhancements](#2-code-quality-enhancements)
   - 2.1 [Architecture](#21-architecture)
   - 2.2 [Type Safety](#22-type-safety)
   - 2.3 [File & Component Organization](#23-file--component-organization)
   - 2.4 [Performance](#24-performance)
   - 2.5 [Error Handling](#25-error-handling)
   - 2.6 [Testing](#26-testing)
   - 2.7 [Build & Config](#27-build--config)
3. [Product & Idea Enhancements](#3-product--idea-enhancements)
   - 3.1 [Core Missing Features](#31-core-missing-features)
   - 3.2 [Monetization & Growth](#32-monetization--growth)
   - 3.3 [Algerian Market-Specific](#33-algerian-market-specific)
   - 3.4 [Trust & Safety](#34-trust--safety)
   - 3.5 [Discoverability & SEO](#35-discoverability--seo)
   - 3.6 [Analytics & Admin Tools](#36-analytics--admin-tools)
   - 3.7 [Subscriptions & Notifications](#37-subscriptions--notifications)
4. [Quick Wins Table](#4-quick-wins-table)

---

## 1. UI & UX Enhancements

### 1.1 Navigation & Layout

- **Sticky category tabs** — Add a horizontal scrollable pill-row of categories (Auto, Real Estate, Jobs, Services) directly below the navbar on all pages so users never lose context of where they are.

- **Breadcrumbs** — On category and detail pages, show `Home > Auto > Renault Clio 4` so users always know their position in the hierarchy.

- **Active nav link highlighting** — The navbar currently has no active state indicator for the current route. Switch from `<Link>` to `<NavLink>` from React Router and apply an underline or accent color to the active route.

- **Navbar search result dropdown** — Instead of navigating away on `Enter`, show a live floating dropdown of matching ad titles as the user types, similar to a real search engine autocomplete.

- **Persistent wilaya filter chip** — Once a wilaya is selected it should appear as a dismissible chip (e.g., `📍 Algiers ×`) visible below the navbar on all pages, making it clear the filter is active and easy to remove.

---

### 1.2 Home Page

- **"Latest Listings" section is missing** — The home page only shows boosted ads. Add a second section showing the most recently approved ads across all categories, with a "See all →" link per category.

- **Category stats counters** — Under each category card in the Hero, show a live count of available ads (e.g., "142 listings") to build trust and urgency.

- **Map view toggle** — Next to the ad grid, offer a map view (using Leaflet.js) where pins represent wilaya clusters of available listings.

- **Recently viewed ads strip** — Add a horizontal scroll strip showing the last 5 ads the user clicked, stored in `localStorage`, so returning users can pick up where they left off.

---

### 1.3 Ad Cards

- **Image carousel** — Allow multiple images per ad and show a dot-navigation carousel on card hover or swipe (mobile).

- **Save / Heart button on every card** — A small heart icon in the top-right corner of each card that saves the ad to a local favorites list. The FloatingActionBar "Saved" tab would display these.

- **"Contact Seller" CTA on the card** — A direct button that opens a contact drawer or navigates to the message thread, instead of only showing details.

- **Price reduced badge** — If the ad price was lowered since initial posting, show a prominent green `"Price reduced ↓"` badge on the card.

- **Time & social proof indicators** — Show `"Posted 2 hours ago"` in color-coded text (green = fresh, amber = a few days, gray = older) and optionally `"3 people viewed today"` to create urgency.

---

### 1.4 Category Pages

- **Filter sidebar / bottom sheet** — Replace the single wilaya dropdown with a full filter panel:
  - **Auto**: price range, year range, mileage, fuel type, transmission, brand
  - **Real Estate**: price range, area (m²), number of rooms, furnished/unfurnished
  - **Jobs**: salary range, contract type (full-time / freelance / internship), experience level
  - **Services**: minimum rating, specialty/trade, availability

- **Sort options** — Add a sort dropdown with: `"Newest"`, `"Price: Low → High"`, `"Price: High → Low"`, `"Most relevant"`.

- **Grid vs. List view toggle** — Let users switch between a card grid (current) and a compact list view showing more results per screen.

- **Empty state with smart suggestions** — When no results match, show:  
  *"No Vehicle listings in Oran — try searching All Algeria?"*  
  with a one-click button to clear the wilaya filter.

- **Skeleton loaders** — Replace instant card renders with skeleton animation placeholders to simulate a loading state and feel more polished.

---

### 1.5 Ad Detail Page (Missing Entirely)

> **This is the single biggest missing UI feature in the entire project.**

Currently, clicking any ad card does nothing. Every marketplace needs a dedicated detail page. A `/ad/:id` route should include:

- **Full image gallery** — Swipeable carousel with thumbnail strip
- **Complete ad description** — Full text, all category-specific details in a structured table
- **Seller profile card** — Avatar, name, verified badge, member since, average rating, link to public profile
- **Contact / Message form** — Inline form that initiates a message thread or reveals the seller's phone number
- **Wilaya map** — An embedded map (Leaflet.js) showing the approximate Wilaya location
- **Related listings** — `"You might also like"` grid of 4 similar ads in the same category and wilaya
- **Share button** — Uses the native Web Share API to share to WhatsApp, Messenger, or copy the link
- **Report button** — Flags the ad for admin review

---

### 1.6 Post Ad Flow

- **Multi-step wizard** — Replace the single long modal with a clear step-by-step flow:
  1. Choose Category
  2. Category-specific details (fields change per category)
  3. Upload photos
  4. Price & Location
  5. Review & Submit

- **Category-specific fields** — Each category should collect different data:
  - **Auto**: Brand, Model, Year, Mileage, Fuel, Transmission, Color
  - **Real Estate**: Type (apartment/villa/studio), Area m², Rooms, Floor, Furnished
  - **Jobs**: Company, Contract type, Salary, Experience required
  - **Services**: Specialty, Rate (hourly/fixed), Availability, Experience years

- **Image upload preview grid** — Allow up to 10 images with thumbnail previews, drag-to-reorder, and per-image delete buttons.

- **Draft auto-saving** — Save the form state to `localStorage` every few seconds so users don't lose progress if they close the tab or navigate away.

- **Price suggestions** — Based on the category and wilaya, show a subtle hint: *"Similar listings in Algiers average 45,000 DZD/month"*.

---

### 1.7 Mobile Experience

- **Wire the FloatingActionBar** — The "Saved" and "Search" buttons have no handlers. They should navigate to a favorites page and open a search sheet respectively.

- **Bottom sheet modals** — On mobile screen sizes, the `AuthModal` and `PostAdModal` should animate up from the bottom as a sheet rather than appearing as a centered dialog, which often feels cramped on small screens.

- **Pull-to-refresh gesture** — On listing pages, a swipe-down gesture should re-apply filters and refresh the visible ads list.

- **Haptic feedback** — When posting an ad or sending a message successfully, call `navigator.vibrate(50)` for a subtle tactile confirmation on supported devices.

- **Swipe to dismiss modals** — Bottom sheet modals on mobile should be dismissible with a downward swipe gesture.

---

### 1.8 Messaging

- **Buyer message initiation** — Currently there is no way for a buyer to start a conversation from an ad. A `"Contact Seller"` button on the ad detail page should create a new thread in the messaging system.

- **Typing indicator** — Show an animated 3-dot indicator while the other party is composing a reply.

- **Read receipts** — Show a small `"Seen"` label or a double-checkmark under the owner's sent messages.

- **Unread count badge** — Display an unread message count badge on the Messages link in the navbar user dropdown.

- **Message notifications** — Send a browser Push Notification when a new message arrives, even if the user is on a different tab.

- **WhatsApp fallback** — Offer `"Chat on WhatsApp"` as an alternative contact method alongside the in-app messenger, since WhatsApp is the dominant communication channel in Algeria.

---

### 1.9 Dark Mode

- **The SettingsPage already has a dark mode toggle — but it does nothing.** Wire it to a `data-theme="dark"` attribute on the `<html>` element and apply Tailwind's `dark:` variant classes across all components.

- Store the user's theme preference in `localStorage` so it persists between sessions.

- Respect the OS preference by default using `window.matchMedia('(prefers-color-scheme: dark)')`.

---

## 2. Code Quality Enhancements

### 2.1 Architecture

- **Move to Context + useReducer** — The current prop drilling from `App` → Pages → Components passes 8–12 props per component. Create dedicated contexts:
  - `AuthContext` — user, signIn, signOut, updateUser
  - `AdsContext` — ads, postAd, approveAd, rejectAd, boostAd
  - `MessagesContext` — adMessages, sendReply
  - `UIContext` — selectedWilaya, modal states

- **Custom hooks** — Extract business logic into reusable hooks:
  ```typescript
  useAuth()       // reads AuthContext
  useAds()        // reads AdsContext, exposes filtered helpers
  useMessages()   // reads MessagesContext
  useWilaya()     // reads/writes wilaya filter
  useFavorites()  // localStorage-backed favorites
  ```

- **Separate API/service layer** — Create a `services/` folder with files like `adsService.ts` and `authService.ts`. Even as mock implementations now, this pattern makes swapping in a real backend trivial later.

- **Environment-aware API base URL** — Use `import.meta.env.VITE_API_URL` so the same codebase points to `localhost` in dev and the real backend in production.

---

### 2.2 Type Safety

- **Eliminate all `any`** — Replace `adData: any` in `App.tsx` and `PostAdModal.tsx` with a proper type:
  ```typescript
  // types.ts
  export interface PostAdFormData {
    title: string;
    category: Category;
    price: number;
    currency: string;
    location: string;
    image: string;
    description: string;
  }
  ```

- **Category-specific detail types** — Instead of `details: Record<string, string | number>`, define typed schemas per category:
  ```typescript
  export interface AutoDetails {
    brand: string;
    model: string;
    year: number;
    mileage: number;
    fuelType: 'Essence' | 'Diesel' | 'Électrique' | 'Hybride';
    transmission: 'Manual' | 'Automatic';
  }

  export interface RealEstateDetails {
    areaSqm: number;
    rooms: number;
    floor: number;
    furnished: boolean;
  }

  export interface JobDetails {
    company: string;
    contractType: 'CDI' | 'CDD' | 'Freelance' | 'Stage';
    salaryMin: number;
    salaryMax: number;
    experienceYears: number;
  }
  ```

- **Discriminated union for Ad** — Use a discriminated union so TypeScript narrows the `details` type based on `category`:
  ```typescript
  export type Ad =
    | { category: 'auto'; details: AutoDetails; } & AdBase
    | { category: 'real-estate'; details: RealEstateDetails; } & AdBase
    | { category: 'jobs'; details: JobDetails; } & AdBase
    | { category: 'services'; details: ServiceDetails; } & AdBase;
  ```

- **Enable strict TypeScript** — Ensure `"strict": true` is in `tsconfig.json` and resolve all resulting type errors. This catches a large class of runtime bugs at compile time.

---

### 2.3 File & Component Organization

- **Delete dead code** — Remove `pages/CategoryPage.tsx` (137 lines, never routed) and `components/ServiceGrid.tsx` (77 lines, never imported). Clean up the unused `NavItem` type from `types.ts`.

- **Fix `AdminPage.tsx`** — Remove the orphaned SettingsPage stub code from the top of the file (everything before `import { CheckCircle2, Clock3...`). The actual AdminPage logic is intact from that line onward.

- **Shared `<PageLayout>` component** — Extract the repeated pattern across 8 pages:
  ```tsx
  // components/PageLayout.tsx
  const PageLayout: React.FC<{ children: React.ReactNode; navbarProps: NavbarProps }> = ...
  // wraps: min-h-screen bg-gray-50, Navbar, main content slot
  ```

- **Shared `<RequireAuth>` guard** — Extract the repeated "Sign in required" screen into a reusable wrapper:
  ```tsx
  // components/RequireAuth.tsx
  const RequireAuth: React.FC<{ user: User | null; onSignIn: () => void; children: React.ReactNode }> = ...
  ```

- **Co-locate interfaces** — Each category page independently re-declares `interface CategoryPageProps`. Define one shared interface and import it.

- **Rename `cards/ServiceCard.tsx`** — It shares a name with `components/ServiceCard.tsx`, creating import confusion. Rename it to `ServiceProviderCard.tsx`.

---

### 2.4 Performance

- **Route-level code splitting** — Lazy-load each page so the initial JS bundle only includes the home page:
  ```tsx
  const AutoPage = React.lazy(() => import('./pages/AutoPage'));
  const AdminPage = React.lazy(() => import('./pages/AdminPage'));
  // wrap <Routes> in <Suspense fallback={<PageSkeleton />}>
  ```

- **Image lazy loading** — Add `loading="lazy"` and `decoding="async"` to all `<img>` tags in ad cards.

- **`useMemo` for all ad filtering** — Every category page filters the full `ads` array on each render. Wrap with `useMemo`:
  ```tsx
  const autoAds = useMemo(
    () => ads.filter(ad => ad.category === 'auto' && (!selectedWilaya || ad.location === selectedWilaya)),
    [ads, selectedWilaya]
  );
  ```

- **Virtualized lists** — When the ads list grows large (100+ items), use `react-virtual` or `@tanstack/react-virtual` to only render visible cards in the viewport.

- **Debounce search input** — Wrap the search `onChange` handler with a 300ms debounce to avoid filtering on every keystroke.

---

### 2.5 Error Handling

- **React Error Boundaries** — Add a `<ErrorBoundary>` wrapper around each route in `App.tsx` so a crash in one page doesn't bring down the entire app.

- **Inline form validation errors** — The PostAdModal has HTML `required` attributes but no visual error messages. On failed submission, show red text under each invalid field.

- **Image load error fallback** — Add an `onError` handler to every ad card `<img>` tag:
  ```tsx
  <img
    src={ad.image}
    alt={ad.title}
    onError={(e) => { e.currentTarget.src = '/placeholder-ad.png'; }}
  />
  ```

- **Network error states** — When real API calls are added, show user-friendly error states ("Something went wrong. Try again.") rather than silent failures.

---

### 2.6 Testing

- **Zero tests currently exist.** Add the following setup:
  - `vitest` — fast Vite-native test runner
  - `@testing-library/react` — component tests
  - `@testing-library/user-event` — simulates real user interactions

- **Priority test cases**:
  - `visibleAds` filter logic (approved vs. pending visibility)
  - `handleSignIn` / `handleSignOut` state transitions
  - `handleApproveAd` / `handleRejectAd` state mutations
  - Navbar renders correct variant theme
  - PostAdModal form submission flow
  - AuthModal sign-in with valid and invalid inputs

- **Snapshot tests** for the Navbar (all 5 variants) and ad cards (all 4 types).

---

### 2.7 Build & Config

- **Remove `GEMINI_API_KEY` from `vite.config.ts`** — No AI feature exists in this codebase. The current config exposes any key present in `.env` directly into the client bundle.

- **Add ESLint** — No linter is configured. Add:
  ```bash
  npm install -D eslint eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/eslint-plugin @typescript-eslint/parser
  ```

- **Add Prettier** — Enforce consistent code formatting across the team.

- **Add `.env.example`** — Document all required environment variables for new developers:
  ```
  VITE_API_URL=http://localhost:8000
  VITE_WHATSAPP_ENABLED=true
  ```

- **Add `public/404.html`** — For deployment on Netlify or GitHub Pages, a redirect file is needed so SPA client-side routes don't 404 on refresh.

- **Add a `404` route** — In `App.tsx`, add a catch-all route so unknown URLs show a friendly Not Found page instead of a blank screen:
  ```tsx
  <Route path="*" element={<NotFoundPage />} />
  ```

---

## 3. Product & Idea Enhancements

### 3.1 Core Missing Features

| Feature | Priority | Description |
|---|---|---|
| Ad Detail Page (`/ad/:id`) | 🔴 Critical | Full listing view — gallery, description, seller info, contact form, map, related ads |
| Buyer message initiation | 🔴 Critical | Buyers have no way to contact a seller — needs a "Contact Seller" button wired to the messaging system |
| Favorites / Saved ads | 🟠 High | Heart button on cards, stored in `localStorage`, dedicated Saved page |
| Ad editing | 🟠 High | Users can post but can never modify or fix an existing listing |
| Ad deletion | 🟠 High | Users can post but can never remove their own listing |
| Admin boost/unboost toggle | 🟠 High | The Featured section is driven by `isBoosted` but admins have no UI to set it |
| Ad expiry | 🟡 Medium | Ads should auto-expire after 30/60 days with owner renewal prompts |

---

### 3.2 Monetization & Growth

- **Self-serve ad boosting** — Let sellers pay to feature their own ads. Add a `"Boost this Ad"` button in `MyAdsPage` with pricing tiers (e.g., 500 DZD for 7 days, 1000 DZD for 30 days). Revenue comes from the seller, not just admin manual selection.

- **Verified seller badge** — Sellers who complete ID verification get a green checkmark badge on all their listings. Charge a one-time verification fee (e.g., 2000 DZD). This both generates revenue and builds trust.

- **Business / Pro accounts** — Car dealerships, real estate agencies, and staffing firms post many ads. Offer a Pro plan with:
  - Unlimited listings (free tier limited to 5/month)
  - Analytics dashboard (views, messages, conversion rate per ad)
  - Logo on listings instead of avatar
  - Dedicated account manager

- **Ad package bundles**:
  - Free: 3 ads/month, standard listing
  - Basic (500 DZD/month): 10 ads, photo limit 5/ad
  - Pro (2000 DZD/month): unlimited ads, 20 photos, 1 free boost/month, analytics

---

### 3.3 Algerian Market-Specific

- **Arabic (العربية) language support** — Algeria's official language is Arabic. Add full RTL support and an Arabic translation of all UI text. The `Wilaya` type already has an `ar_name?` field — use it. Use `i18next` or `react-intl` for internationalization.

- **Dinar formatting** — Algerians write large numbers with spaces as thousand separators: `3 500 000 DA`. Replace the default `toLocaleString()` with a proper Algerian format:
  ```typescript
  const formatDZD = (amount: number) =>
    amount.toLocaleString('fr-DZ') + ' DA';
  ```

- **WhatsApp "Contact" button** — WhatsApp is the dominant business communication channel in Algeria. On every ad detail page, add:
  ```tsx
  <a href={`https://wa.me/213${sellerPhone}?text=Bonjour, je suis intéressé par votre annonce: ${ad.title}`}>
    Contact via WhatsApp
  </a>
  ```

- **"Show phone number" button** — A common pattern on Algerian sites like Ouedkniss: blur the phone number by default and reveal it on button tap (optionally requiring login first).

- **Wilaya + Commune filtering** — Currently only wilaya-level. For real estate especially, users want neighborhood-level filtering within Algiers, Oran, or Constantine. Add a second `commune` filter dropdown that populates based on the selected wilaya.

- **Tamazight (ⵜⴰⵎⴰⵣⵉⵖⵜ) support** — A third official language spoken in Kabylie, Aurès, etc. Including it as a language option signals inclusivity.

- **Ramadan mode** — During Ramadan, show a seasonal banner and highlight relevant service categories (caterers, decorators, event planners) with boosted prominence.

---

### 3.4 Trust & Safety

- **Report an ad** — Every listing needs a `"Report"` flag button that submits the ad to the admin moderation queue with a reason (spam, fraud, inappropriate, duplicate).

- **Spam/duplicate detection** — If the same user posts more than 3 ads with >70% similar titles within 24 hours, auto-flag them for admin review.

- **Identity verification flow** — A step in Settings where users upload a photo of their national ID (CIN) to get the `isVerified` badge. Admins review and approve.

- **Seller ratings (real, not mock)** — After a transaction, both buyer and seller rate each other with 1–5 stars and a comment. The `ProfilePage` already has a reviews UI — wire it to real data.

- **Blacklist / Block users** — Allow users to block sellers or buyers they've had bad experiences with.

- **Charte d'utilisation** — A clear Terms of Service in French and Arabic that sellers must accept before posting their first ad.

---

### 3.5 Discoverability & SEO

- **SEO-ready pages** — The current SPA cannot be indexed by Google (no SSR). Options:
  - Migrate to **Next.js** for server-side rendering of ad detail and category pages
  - Use **react-helmet** to set dynamic `<title>` and `<meta description>` tags per page
  - Pre-render static pages at build time using Vite SSG plugins

- **Open Graph meta tags** — Each ad detail page should have OG tags so sharing on Facebook and WhatsApp shows a rich card with the ad photo and title:
  ```html
  <meta property="og:title" content="Renault Clio 4 GT Line 2019 — Daberli" />
  <meta property="og:image" content="https://..." />
  <meta property="og:description" content="3 500 DZD/day · Algiers" />
  ```

- **XML sitemap** — Auto-generate a sitemap of all approved ad URLs so search engines can crawl them.

- **Canonical URLs** — Ensure each ad has a canonical URL to prevent duplicate content penalties.

- **Structured data (JSON-LD)** — Add `Product`, `JobPosting`, and `RealEstateListing` schema markup to ad detail pages for rich Google Search results.

---

### 3.6 Analytics & Admin Tools

- **Admin dashboard with KPIs** — Replace the current moderation-only AdminPage with a proper dashboard:
  - Total ads (by status, by category, by wilaya)
  - New users this week / month
  - Top 10 searched keywords
  - Ad approval rate and average review time
  - Revenue (when monetization is added)

- **Ad view counter** — Track how many times each ad's detail page was visited. Show the owner: `"Your listing was viewed 47 times this week"` in MyAdsPage.

- **Search analytics** — Log what users search for. A search for `"Toyota Hilux"` with 0 results tells you there's an unfilled demand in that category.

- **Reported ads queue** — A dedicated admin section showing flagged ads with the report reason, reporter info, and one-click Dismiss / Reject actions.

- **User management panel** — Admins should be able to view user accounts, suspend abusive ones, and promote others to admin.

---

### 3.7 Subscriptions & Notifications

- **Wire SettingsPage notification toggles** — The Settings page already has beautifully designed toggle controls for push, email, and SMS notifications — but they only update local state. Connect them to:
  - `localStorage` immediately (free, no backend)
  - A user preferences API call (when the backend exists)

- **Email notifications** — When someone sends a message on an owner's ad, send an email:  
  *"You have a new message on your listing: Renault Clio 4"*

- **Weekly digest email** — A weekly summary of new ads matching the user's saved searches and preferred wilaya.

- **Browser push notifications** — Use the Web Push API so users get a notification when they receive a new message, even if the browser tab is closed.

- **In-app notification center** — A bell icon in the navbar with a dropdown of recent activity (new messages, ad approved/rejected, price drops on saved ads).

---

## 4. Quick Wins Table

> Ranked by impact vs. implementation effort — do these first.

| # | Enhancement | Effort | Impact |
|---|---|---|---|
| 1 | Fix `AdminPage.tsx` corruption (remove stub code) | ⚡ Very Low | 🔴 Critical |
| 2 | Add `<Route path="*">` 404 fallback | ⚡ Very Low | 🔴 Critical |
| 3 | Delete dead files (`CategoryPage.tsx`, `ServiceGrid.tsx`) | ⚡ Very Low | 🟡 Medium |
| 4 | Clear pre-filled auth credentials in `AuthModal.tsx` | ⚡ Very Low | 🟡 Medium |
| 5 | Remove `GEMINI_API_KEY` from `vite.config.ts` | ⚡ Very Low | 🟡 Medium |
| 6 | Fix Hero Vehicle card duplicate subtitle | ⚡ Very Low | 🟢 Low |
| 7 | Wire FloatingActionBar "Saved" and "Search" buttons | 🔧 Low | 🟠 High |
| 8 | Make AutoPage search input functional | 🔧 Low | 🟠 High |
| 9 | Heart/Save button on cards (localStorage) | 🔧 Low | 🟠 High |
| 10 | "Contact via WhatsApp" link on ad cards | 🔧 Low | 🔴 Very High (Algeria) |
| 11 | Algerian Dinar (DA) number formatting | 🔧 Low | 🔴 Very High (Algeria) |
| 12 | Skeleton loaders on card grids | 🔧 Low | 🟡 Medium |
| 13 | Add `loading="lazy"` to all ad card images | 🔧 Low | 🟡 Medium |
| 14 | Persist Settings toggles to `localStorage` | 🔧 Low | 🟡 Medium |
| 15 | Add ESLint + Prettier | 🔧 Low | 🟡 Medium |
| 16 | Admin boost/unboost toggle | 🔨 Medium | 🟠 High |
| 17 | Ad edit + delete buttons in MyAdsPage | 🔨 Medium | 🟠 High |
| 18 | Wire dark mode toggle to `data-theme` on `<html>` | 🔨 Medium | 🟠 High |
| 19 | Replace `adData: any` with typed `PostAdFormData` | 🔨 Medium | 🟡 Medium |
| 20 | Add `/ad/:id` detail page | 🏗️ Large | 🔴 Critical |
| 21 | Multi-step Post Ad wizard with category-specific fields | 🏗️ Large | 🟠 High |
| 22 | Arabic language + RTL support | 🏗️ Large | 🔴 Very High (Algeria) |
| 23 | Context + useReducer refactor (remove prop drilling) | 🏗️ Large | 🟡 Medium |
| 24 | Route-level code splitting with `React.lazy` | 🏗️ Large | 🟡 Medium |
| 25 | Next.js migration for SEO | 🏗️ Very Large | 🟠 High (long-term) |

---

*End of suggestions document.*
