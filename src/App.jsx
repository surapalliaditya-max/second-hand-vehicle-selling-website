import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

import { Home } from './pages/Home';
import { Vehicles } from './pages/Vehicles';
import { VehicleDetails } from './pages/VehicleDetails';
import { SellVehicle } from './pages/SellVehicle';
import { Favorites } from './pages/Favorites';
import { Compare } from './pages/Compare';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

export const App = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900">
      
      {/* Top Header Navbar */}
      <Navbar />

      {/* Floating Toast Notification */}
      <Toast />

      {/* Main Page View Routes */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicles/:id" element={<VehicleDetails />} />
          <Route path="/sell" element={<SellVehicle />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />

    </div>
  );
};

export default App;
