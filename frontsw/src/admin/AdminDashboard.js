import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import AdminProducts from './AdminProducts';
import AdminCategories from './AdminCategories';
import AdminUsers from './AdminUsers';
import Reports from './Reports';
import Inventory from './Inventory';
import PurchaseHistory from './PurchaseHistory';
import ReturnProduct from './ReturnProduct';
import Venta from './Venta';
import './Admin.css';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      <div className="admin-content">
        <Routes>
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="reports" element={<Reports />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="purchase-history" element={<PurchaseHistory />} />
          <Route path="return-product" element={<ReturnProduct />} />
          <Route path="*" element={<AdminProducts />} /> 
          <Route path="Venta" element={<Venta />} />
          {/* Ruta por defecto */}
        </Routes>
      </div>
    </div>
  );
}

export default AdminDashboard;
