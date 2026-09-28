# Second-Hand Vehicle Selling Website (B.Tech Major Project)

An interactive, responsive frontend marketplace web application for buying and selling secondhand vehicles (cars, bikes, SUVs, sedans, hatchbacks, and electric vehicles). Built with React, Vite, Tailwind CSS, Lucide Icons, and React Router v6.

---

## 📌 Project Objectives

- **Frontend Marketplace Simulation**: Provide a complete, modern web portal where users can browse, search, filter, compare, favorite, and list secondhand vehicles.
- **Client-Side Data Persistence**: Utilize browser `localStorage` to save user favorites, comparison lists, seller listings, user profiles, and enquiries without requiring a complex backend database.
- **Zero Real Data / Privacy First**: Ensure 100% demo data compliance for college project evaluation without real user contact details or external services.

---

## ✨ Key Features

1. **Vehicle Search & Filter Engine**:
   - Keyword search across vehicle title, brand, model, location, and seller details.
   - Dual **Minimum Price** and **Maximum Price** filtering controls.
   - SRS Preset filters: Vehicle Type (Car, Bike, SUV, Sedan, Hatchback), Price Ranges, Fuel Type (Petrol, Diesel, Electric, CNG, Hybrid), Transmission (Manual, Automatic), Manufacturing Year, Location.
   - 6 Sorting Options (Price Low/High, Newest/Oldest, Lowest/Highest Kilometers).

2. **Vehicle Details & Media**:
   - High-resolution image gallery with thumbnail switcher and full-screen Lightbox modal preview.
   - Full technical specs matrix and complete equipment checklist (Air Conditioning, Power Windows, ABS, Airbags, Parking Sensors, Rear Camera, Bluetooth, Touchscreen, Sunroof).
   - Seller information card with click-to-reveal phone & email controls and direct seller contact form modal.

3. **Sell Vehicle Listing Form**:
   - Comprehensive form for listing vehicles with input validation.
   - **Local File Selector**: Select vehicle image files directly from your computer with live `FileReader` preview.
   - **Save Draft**: Saves draft in `localStorage` for automatic restore on page refresh.
   - **Preview Listing**: Displays a live preview modal of how the vehicle card will appear on the marketplace.

4. **Side-by-Side Comparison**:
   - Compare up to 4 vehicles side by side in a scrollable matrix covering all specs, prices, mileage, and features checklist.

5. **Saved Favorites Wishlist**:
   - Heart icon toggle on all cards with instant `localStorage` persistence (`favoriteVehicles`).

6. **User Authentication & Dashboard**:
   - Custom mock login and registration system with client-side field validation.
   - User Dashboard featuring Profile overview, My Listings manager (with delete capability), Saved Favorites, Compared Vehicles, Enquiries log, Edit Profile form, and Logout.

7. **Accessibility & Responsive Design**:
   - Responsive mobile navigation with hamburger drawer.
   - Accessible form labels, image `alt` attributes, keyboard navigation, loading indicators, and custom empty states.

---

## 🛠️ Technologies Used

- **Framework**: React 18, Vite 6
- **Routing**: React Router v6 (`BrowserRouter`)
- **Styling**: Tailwind CSS v4, PostCSS, Custom Utility Classes
- **Icons**: Lucide React
- **State Management & Persistence**: React Context API (`VehicleContext`), Browser `localStorage`

---

## 🗺️ Application Routes

| Route | Page Component | Description |
| :--- | :--- | :--- |
| `/` | `Home.jsx` | Hero search, categories, featured/recent vehicles, brand logos, testimonials |
| `/vehicles` | `Vehicles.jsx` | Full vehicle marketplace search, filters, sorting, and pagination |
| `/vehicles/:id` | `VehicleDetails.jsx` | Full vehicle specifications, gallery lightbox, seller info, and contact form |
| `/sell` | `SellVehicle.jsx` | Vehicle posting form with image picker, draft save, and preview modal |
| `/compare` | `Compare.jsx` | Side-by-side spec comparison table matrix for up to 4 vehicles |
| `/favorites` | `Favorites.jsx` | Saved wishlist page persistent in `localStorage` |
| `/login` | `Login.jsx` | Custom mock login page with frontend validation & password reset modal |
| `/register` | `Register.jsx` | Custom mock registration page with complete field validation |
| `/dashboard` | `Dashboard.jsx` | User profile, My Listings, Favorites, Compared, Enquiries, Edit Profile |
| `/contact` | `Contact.jsx` | Support details card & message feedback form |
| `/404` | `NotFound.jsx` | Custom Page Not Found screen |

---

## 🚀 Setup & Local Execution

### Prerequisites
- Node.js (v18+ or higher)
- npm (v9+ or higher)

### Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Local Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173/` or `http://localhost:5174/`.

3. **Build Production Bundle**:
   ```bash
   npm run build
   ```
   Generates optimized static build files in the `/dist` directory.

---

## 💾 Mock Data & Storage Architecture

This project is a 100% frontend marketplace using structured mock data and browser `localStorage`.
- **`MOCK_VEHICLES`**: 22 mock vehicle records in `src/data/vehicles.js`.
- **`favoriteVehicles`**: Saved vehicle IDs array.
- **`compareVehicles`**: Active comparison vehicle IDs array.
- **`userData`**: Active demo logged-in user profile object.
- **`sellerListings`**: Array of user-created vehicle listings.
- **`enquiries`**: Direct messages sent to vehicle sellers.

> [!NOTE]
> All contact details use safe demo data (`1234567890`, `seller@example.com`, `aditya@example.com`). No real personal data or external APIs are used.

---

## 🖼️ Screenshots Placeholder

*(Insert screenshots of Home Page, Vehicle Listing Page, Vehicle Details Lightbox, Comparison Matrix, and Sell Form here for project presentation)*

---

## 🔮 Future Enhancements (Future Scope)

The following features represent potential future expansions beyond the scope of this frontend major project:
- Database integration (PostgreSQL / MongoDB)
- Real user authentication (OAuth 2.0 / JWT)
- Admin moderation dashboard
- Live buyer-seller instant chat
- Automated SMS / Email notification service
- Online token payment gateway integration
- AI-based vehicle valuation & price estimation
