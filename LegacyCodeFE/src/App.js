import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ShopPage from './pages/ShopPage';
import Admin from './pages/Admin';
import OrderHistory from './pages/OrderHistory'; 
import { CartProvider } from './components/CartContext'; 
import Footer from './components/Footer';

// import Security pages

import LoginPage from './security/LoginPage';
import RegistrationPage from './security/RegistrationPage';
import UpdateUser from './security/UpdateUser';
import UserService from './security/UserService';
import UserManagementPage from './security/UserManagementPage';
import ProfilePage from './security/ProfilePage';
import Chatbot from './components/Chatbot';
// import Security pages end


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CartProvider>
          <Navbar />
          <Routes>
  {/*            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin" element={<Admin />} />
  */}
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            <Route path="/home" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/user-management" element={<UserManagementPage />} />
            <Route path="/update-user/:userId" element={<UpdateUser />} />
            <Route path="/product" element={<Admin />} />

            <Route path="/chat" element={<Chatbot />} />
            <Route path="*" element={<Navigate to="/login" />} />
    
            <Route path="/order-history" element={<OrderHistory />} /> 
          </Routes>
        </CartProvider>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
