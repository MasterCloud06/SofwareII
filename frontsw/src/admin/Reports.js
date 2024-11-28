import React, { useRef, useEffect, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';
import './Admin.css';

const Reports = () => {
  const printRef = useRef();
  const [salesToday, setSalesToday] = useState([]);
  const [salesThisWeek, setSalesThisWeek] = useState([]);
  const [salesThisMonth, setSalesThisMonth] = useState([]);
  const [salesThisYear, setSalesThisYear] = useState([]);

  useEffect(() => {
    fetchSalesData('ventas/diarias', setSalesToday);
    fetchSalesData('ventas/semanales', setSalesThisWeek);
    fetchSalesData('ventas/mensuales', setSalesThisMonth);
    fetchSalesData('ventas/anuales', setSalesThisYear);
  }, []);

  console.log(salesThisMonth.totalCompras);

  const fetchSalesData = async (endpoint, setData) => {
    try {
      const response = await axios.get(`http://localhost:8081/reportes/${endpoint}`);
      setData(response.data);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    }
  };

const calculateSales = (sales) => {
  if (!Array.isArray(sales)) {
    return sales; // Handle cases where sales is not an array
  }
  return sales.reduce((total, sale) => total + sale.amount, 0);
};

const handlePrint = useReactToPrint({
  content: () => printRef.current,
  documentTitle: 'Reporte de Ventas',
});

  return (
    <div className="reports">
      <h2>Reporte de Ventas</h2>
      <div ref={printRef}>
        <h3>Ventas por Día</h3>
        <p>Total: ${calculateSales(salesToday.totalCompras)}</p>
        <h3>Ventas por Semana</h3>
        <p>Total: ${calculateSales(salesThisWeek.totalCompras)}</p>
        <h3>Ventas por Mes</h3>
        <p>Total: ${calculateSales(salesThisMonth.totalCompras)}</p>
        <h3>Ventas por Año</h3>
        <p>Total: ${calculateSales(salesThisYear.totalCompras)}</p>
      </div>
      <button className="btn-export" onClick={handlePrint}>Exportar en PDF</button>
    </div>
  );
};

export default Reports;
