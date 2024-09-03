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


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/order-history" element={<OrderHistory />} /> 
          </Routes>
        </CartProvider>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
