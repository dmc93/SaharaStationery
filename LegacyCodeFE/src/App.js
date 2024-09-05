import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './pages/Navbar';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ShopPage from './pages/ShopPage';
import Admin from './pages/Admin';
import { CartProvider } from './components/CartContext'; 

// import Security pages

import LoginPage from './security/LoginPage';
import RegistrationPage from './security/RegistrationPage';
import UpdateUser from './security/UpdateUser';
import UserService from './security/UserService';
import UserManagementPage from './security/UserManagementPage';
import ProfilePage from './security/ProfilePage';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CartProvider> {}
          <Navbar />
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            <Route path="/home" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
              {/* Check if user is authenticated and admin before rendering admin-only routes */}
              {/* {UserService.adminOnly() && (
              <> */}
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/user-management" element={<UserManagementPage />} />
                <Route path="/update-user/:userId" element={<UpdateUser />} />
                <Route path="/product" element={<Admin />} />

                <Route path="/chat" element={<Chatbot />} />

                {/* </>
            )} */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
