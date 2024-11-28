import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Admin.css';

function AdminNavbar() {
  const location = useLocation();
  
  return (
    <div className="admin-navbar">
      <ul>
        <li className={location.pathname === '/admin/products' ? 'active' : ''}>
          <Link to="/admin/products">Productos</Link>
        </li>
        <li className={location.pathname === '/admin/categories' ? 'active' : ''}>
          <Link to="/admin/categories">Categorías</Link>
        </li>
        <li className={location.pathname === '/admin/users' ? 'active' : ''}>
          <Link to="/admin/users">Usuarios</Link>
        </li>
        <li className={location.pathname === '/admin/reports' ? 'active' : ''}>
          <Link to="/admin/reports">Reporte</Link>
        </li>
        <li className={location.pathname === '/admin/inventory' ? 'active' : ''}>
          <Link to="/admin/inventory">Inventario</Link>
        </li>
        <li className={location.pathname === '/admin/Venta' ? 'active' : ''}>
          <Link to="/admin/Venta">Ventas</Link>
        </li>
        <li className={location.pathname === '/admin/purchase-history' ? 'active' : ''}>
          <Link to="/admin/purchase-history">Compras</Link>
        </li>
        <li className={location.pathname === '/admin/return-product' ? 'active' : ''}>
          <Link to="/admin/return-product">Devoluciones</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminNavbar;
