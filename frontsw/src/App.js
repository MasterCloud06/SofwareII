import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import Login from './login/Login';
import Register from './register/Register';
import Checkout from './checkout/Checkout';
import AdminDashboard from './admin/AdminDashboard';
import SearchResults from './SearchResults';
import PurchaseHistory from './admin/PurchaseHistory';
import ReturnProduct from './admin/ReturnProduct';
import AdminProducts from './admin/AdminProducts';
import { CartProvider } from './CartContext';
import { AuthProvider } from './AuthProvider';
import PrivateRoute from './PrivateRoute';
import Recomendador from './components/Recomendador';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/register" element={<Register />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="purchase-history" element={<PurchaseHistory />} />
                <Route path="return-product" element={<ReturnProduct />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/admin/*" element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path= "/recomendador" element={<Recomendador/>} />
                <Route path="*" element={<Navigate to="/admin" />} />
              </Route>

            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
