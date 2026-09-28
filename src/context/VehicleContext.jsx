import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_VEHICLES } from '../data/vehicles';

const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  // Favorites persistence
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('favoriteVehicles');
      return saved ? JSON.parse(saved) : ["v-1", "v-3"];
    } catch {
      return ["v-1", "v-3"];
    }
  });

  // Comparison list persistence (max 4 items)
  const [compareList, setCompareList] = useState(() => {
    try {
      const saved = localStorage.getItem('compareVehicles');
      return saved ? JSON.parse(saved) : ["v-1", "v-2"];
    } catch {
      return ["v-1", "v-2"];
    }
  });

  // User session state persistence
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('userData');
      return saved ? JSON.parse(saved) : {
        name: "Aditya Kumar",
        email: "aditya@example.com",
        mobile: "1234567890",
        city: "Hyderabad",
        memberSince: "Jan 2024"
      };
    } catch {
      return null;
    }
  });

  // Seller custom listings persistence
  const [sellerListings, setSellerListings] = useState(() => {
    try {
      const saved = localStorage.getItem('sellerListings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Enquiries sent by user
  const [enquiries, setEnquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('enquiries');
      return saved ? JSON.parse(saved) : [
        {
          id: 'enq-1',
          vehicleId: 'v-1',
          vehicleTitle: 'Toyota Innova Crysta 2.4 ZX',
          sellerName: 'Rajesh Sharma',
          buyerName: 'Aditya Kumar',
          message: 'Is this vehicle still available for inspection this weekend?',
          date: '2026-09-05'
        }
      ];
    } catch {
      return [];
    }
  });

  // Active Toast notification state
  const [toast, setToast] = useState(null);

  // Trigger Toast Notification
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Sync to LocalStorage on updates
  useEffect(() => {
    localStorage.setItem('favoriteVehicles', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('compareVehicles', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('userData', JSON.stringify(user));
    } else {
      localStorage.removeItem('userData');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('sellerListings', JSON.stringify(sellerListings));
  }, [sellerListings]);

  useEffect(() => {
    localStorage.setItem('enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  // Combined Vehicles dataset (Mock + User Listings)
  const allVehicles = [...sellerListings, ...MOCK_VEHICLES];

  // Actions
  const toggleFavorite = (vehicleId) => {
    setFavorites(prev => {
      const exists = prev.includes(vehicleId);
      if (exists) {
        showToast("Removed from Favorites", "info");
        return prev.filter(id => id !== vehicleId);
      } else {
        showToast("Added to Favorites!", "success");
        return [...prev, vehicleId];
      }
    });
  };

  const toggleCompare = (vehicleId) => {
    setCompareList(prev => {
      const exists = prev.includes(vehicleId);
      if (exists) {
        showToast("Removed from Comparison", "info");
        return prev.filter(id => id !== vehicleId);
      } else {
        if (prev.length >= 4) {
          showToast("You can compare up to 4 vehicles at a time", "warning");
          return prev;
        }
        showToast("Added to Comparison list", "success");
        return [...prev, vehicleId];
      }
    });
  };

  const removeFromCompare = (vehicleId) => {
    setCompareList(prev => prev.filter(id => id !== vehicleId));
    showToast("Vehicle removed from comparison", "info");
  };

  const clearCompare = () => {
    setCompareList([]);
    showToast("Comparison list cleared", "info");
  };

  const addVehicleListing = (newListing) => {
    const createdListing = {
      ...newListing,
      id: `user-v-${Date.now()}`,
      isFeatured: false,
      isRecent: true,
      rating: 5.0,
      reviewsCount: 1,
      sellerInfo: {
        name: user ? user.name : newListing.sellerName || "Seller",
        phone: "1234567890",
        email: "seller@example.com",
        location: `${newListing.city || 'City'}, ${newListing.state || 'State'}`,
        verified: false,
        type: "Demo Listing",
        memberSince: "2026"
      }
    };
    setSellerListings(prev => [createdListing, ...prev]);
    showToast("Your vehicle listing has been published successfully!", "success");
    return createdListing;
  };

  const deleteVehicleListing = (listingId) => {
    setSellerListings(prev => prev.filter(v => v.id !== listingId));
    setFavorites(prev => prev.filter(id => id !== listingId));
    setCompareList(prev => prev.filter(id => id !== listingId));
    showToast("Listing deleted successfully", "info");
  };

  const loginUser = (email, password, rememberMe = true) => {
    const mockUser = {
      name: email.split('@')[0].toUpperCase(),
      email: email,
      mobile: "1234567890",
      city: "Hyderabad",
      memberSince: "2026"
    };
    setUser(mockUser);
    showToast(`Welcome back, ${mockUser.name}!`, "success");
    return true;
  };

  const registerUser = (userData) => {
    const newUser = {
      name: userData.fullName,
      email: userData.email,
      mobile: userData.mobile,
      city: userData.city || "Hyderabad",
      memberSince: "2026"
    };
    setUser(newUser);
    showToast("Account created successfully! Welcome to AutoMarket.", "success");
    return true;
  };

  const updateUserProfile = (updatedProfile) => {
    setUser(prev => ({ ...prev, ...updatedProfile }));
    showToast("Profile details updated!", "success");
  };

  const logoutUser = () => {
    setUser(null);
    showToast("Logged out successfully", "info");
  };

  const sendEnquiry = (enquiryData) => {
    const newEnq = {
      id: `enq-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      ...enquiryData
    };
    setEnquiries(prev => [newEnq, ...prev]);
    showToast("Message sent to seller! They will contact you shortly.", "success");
  };

  return (
    <VehicleContext.Provider value={{
      vehicles: allVehicles,
      favorites,
      compareList,
      user,
      sellerListings,
      enquiries,
      toast,
      showToast,
      toggleFavorite,
      toggleCompare,
      removeFromCompare,
      clearCompare,
      addVehicleListing,
      deleteVehicleListing,
      loginUser,
      registerUser,
      updateUserProfile,
      logoutUser,
      sendEnquiry
    }}>
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicles = () => useContext(VehicleContext);
