/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { PersonaService } from '../PersonaAPI';
import axios from 'axios';

function Ventas() {
  const [usuarios, setUsuarios] = useState([]);
  const [vendedorId, setVendedorId] = useState('');
  const [venta, setVentas] = useState([]);
  const [productosVenta, setProductosVenta] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVenta, setCurrentVenta] = useState(null);
  const [products, setproduct] = useState([]);
  const [cantidad, setCantidad] = useState(0);
  const [total, setTotal] = useState(0);
  const [clienteId, setClienteId] = useState('');
  const [montoPagado, setMontoPagado] = useState('');
  const [estadoPago, setEstadoPago] = useState('');
  const [pagoCompleto, setPagoCompleto] = useState(false);
  const [pagoParcial, setPagoParcial] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(''); // Producto seleccionado
  const personaService = new PersonaService();

  useEffect(() => {
    personaService.getUser().then(data => {
      setUsuarios(data);
    }).catch(error => {
      console.error("Error fetching usuarios:", error);
    });

    personaService.getProducto().then(data => {
      setproduct(data);
    }).catch(error => {
      console.error("Error fetching usuarios:", error);
    });

    personaService.getVentas().then(data => {
      setVentas(data);
    }).catch(error => {
      console.error("Error fetching ventas:", error);
    });
  }, [personaService, setVentas, setUsuarios, setproduct]);

  const handleEditVenta = (venta) => {
    setIsEditing(true);
    setCurrentVenta(venta);
    setVendedorId(venta.vendedorId);
    setClienteId(venta.clienteId);
    setProductosVenta(JSON.parse(venta.productos));
    setCantidad(venta.cantidad);
    setTotal(venta.total);
    setMontoPagado(venta.montoPagado);
    setEstadoPago(venta.estadoPago);
  };

  const handleRealizarVenta = async (e) => {
    e.preventDefault();

    const productosVenta = products.map(producto => ({
      id: products.id,  // Aquí debes cambiar por el campo id correcto del producto
      cantidad: products.cantidad, // Ajusta según cómo manejes la cantidad
      precioUnitario: products.precioUnitario  // Ajusta según cómo obtengas el precio unitario
    }));

    const cantidad = products.reduce((acc, products) => acc + 1, 0);
    const total = products.reduce((acc, products) => acc + 1 * products.precioUnitario, 0);

    const ventaData = {
      vendedorId,
      clienteId,
      productos: JSON.stringify(productosVenta),
      cantidad,
      total,
      montoPagado: parseFloat(montoPagado),
      estadoPago
    };

    try {
      personaService.realizarVenta(ventaData);
      console.log('Venta realizada:', ventaData);
      setVentas([...venta, ventaData]);
      setVendedorId('');
      setClienteId('');
      setproduct([]);
      setMontoPagado('');
      setEstadoPago('');
      console.log('Venta realizada:');
    } catch (error) {
      console.error('Error al realizar la venta:', error);
      // Aquí podrías manejar el error
    } 
    setVendedorId('');
    setClienteId('');
    setProductosVenta([]);
    setCantidad(0);
    setTotal(0);
    setMontoPagado('');
    setEstadoPago('');
  };

  const user = (vendedorId) =>{
    const vendedor = usuarios.find(usuarios=> usuarios.id === vendedorId);
    return vendedor ? vendedor.nombre: 'Desconocido' ;
  };
  
  const handleDevolucion = async (ventaId) => {
    try {
      await axios.post('http://localhost:8081/devoluciones/crear', { productoId: ventaId }).then(
        responde => {
          console.log('Resouesta del servidor:', responde.data);
        }).catch(error => {
          if (error.responde) {
            console.error('Error en la respuesta del servidor:', error.responde.data);
          }
        })
      await axios.delete(`http://localhost:8081/ventas/${ventaId}`);
      alert('Devolución realizada con éxito.');
    } catch (error) {
      console.error('Error al realizar la devolución:', error);
      alert('Error al realizar la devolución.');
    }
  };

  const handleEliminar = async (ventaId) => {
    try {
      await axios.delete(`http://localhost:8081/ventas/${ventaId}`);
      alert('Eliminado realizada con éxito.');
    } catch (error) {
      console.error('Error al realizar la devolución:', error);
      alert('Error al realizar la eliminacion.');
    }

  };
  return (
    <div>
      <h2>Realizar Venta</h2>
      <form onSubmit={handleRealizarVenta}>
        <div className="form-group">
          <label>Vendedor</label>
          <select
            value={vendedorId}
            onChange={(e) => setVendedorId(e.target.value)}
          >
            <option value=""> Seleccione un Vendedor</option>
            {usuarios.map(usuario => (
              <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Cliente</label>
          <select
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
          >
            <option value=""> Seleccione un Cliente</option>
            {usuarios.map(usuario => (
              <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
            ))}
          </select>
        </div>
        {/* Aquí debes agregar lógica para seleccionar productos */}
        <div className="form-group">
          <label>Producto</label>
          <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
            <option value="">Seleccione un Producto</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.nombre} - Precio: {product.precio}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Monto Pagado</label>
          <input
            type="text"
            value={montoPagado}
            onChange={(e) => setMontoPagado(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Estado de Pago</label>
          <div>
            <input
              type="checkbox"
              id="pagoCompleto"
              checked={pagoCompleto}
              onChange={(e) => setPagoCompleto(e.target.checked)}
            />
            <label htmlFor="pagoCompleto">Pago Completo</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="pagoParcial"
              checked={pagoParcial}
              onChange={(e) => setPagoParcial(e.target.checked)}
            />
            <label htmlFor="pagoParcial">Pago Parcial</label>
          </div>
        </div>
        <button onClick={() => handleRealizarVenta}>Realizar Venta</button>
      </form>

      <div className="inventory">
        <h3>Ventas Realizadas</h3>
        <div className="inventory-list">
          <ul>
            <li className="inventory-header">
              <span>Vendedor</span>
              <span>Cliente</span>
              <span>MontoPagado</span>
              <span>Total</span>
              <span>Fecha</span>
              <span>Estado de Pago</span>
              <span>Acciones</span>
            </li>
            {venta.map((venta) => (
              <li key={venta.id} className="inventory-item">
                <span>{user(venta.vendedorId)}</span>
                <span>{user(venta.clienteId)}</span>
                <span>{venta.montoPagado}</span>
                <span>{venta.total}</span>
                <span>{venta.fecha}</span>
                <span>{venta.estadoPago}</span>
                <span>
                <button onClick={() => handleEditVenta(venta)} className='btn-edit'>Editar</button>
                <button onClick={() => handleEliminar(venta.id)} className="btn-delete">Eliminar</button>
                <button onClick={() => handleDevolucion(venta.id)} className="btn-devolucion">Devolución</button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Ventas;