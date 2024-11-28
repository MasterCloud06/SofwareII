/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState} from 'react';
import { CartContext } from '../CartContext';
import '../App.css';
import { PersonaService } from '../PersonaAPI';
import axios from 'axios';

function PurchaseHistory() {
  const { users} = useContext(CartContext);
  const [usuarios, setUsuarios] = useState([]);
  const { returnProduct } = useContext(CartContext);
  const [compras, setCompras] = useState([]);
  const [editingCompra, setEditingCompra] = useState(null);
  const [usuarioId, setUsuarioId] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [productos, setProductos] = useState([]);
  const [cantidad, setCantidad] = useState(0);
  const [fecha, setFecha] = useState('');
  const [total, setTotal] = useState(0);
  const [products, setproduct] = useState([]);
  const personaService = new PersonaService();
  
  useEffect(() => {
    personaService.getCompras().then(data =>  {
      setCompras(data);
    }).catch(error => {
      console.error("Error fetching compras:", error);
    });
    personaService.getProducto().then(data => {
      setproduct(data);
    }).catch(error => {
      console.error("Error fetching usuarios:", error);
    });
    personaService.getUser().then(data => {
      setUsuarios(data);
    }).catch(error => {
      console.error("Error fetching usuarios:", error);
    });
  }, [personaService, setCompras, setProductos, setUsuarios]);

  const user = (userId) =>{
    const vendedor = users.find(users=> users.id === userId);
    return vendedor ? vendedor.nombre: 'Desconocido' ;
  };

  const handleEliminarCompra = (compraId) => {
    try {
      axios.delete(`http://localhost:8081/compras/${compraId}`);
      alert('Elimado con éxito.');
    } catch (error) {
      console.error('Error al eliminarlo:', error);
      alert('Error al realizarlo');
    }
  };

  const handleEditCompra = (compra) => {
    setEditingCompra(compra);
    setUsuarioId(compra.usuarioId);
    setProductos(compra.productos);
    setCantidad(compra.cantidad);
    setFecha(compra.fecha);
    setTotal(compra.total);
  };

  const handleSaveCompra = async () => {
  const compraData = {
    id: editingCompra ? editingCompra.id: Date.now(),
    usuarioId: usuarioId,
    productos: productos,
    cantidad: cantidad,
    fecha: fecha,
    total: total
  };
 console.log(compraData);
  try {
    let response;
    if (editingCompra) {
      response = await personaService.updateCompra(compraData);
      const updatedCompras = compras.map(compra =>
        compra.id === response.id ? response : compra
      );
      setCompras(updatedCompras);
    } else {
      response = personaService.crearCompra(usuarioId, compraData);
      setCompras([...compras, response]);
    }

    setUsuarioId('');
    setProductos([]);
    setCantidad(0);
    setFecha('');
    setTotal(0);
    setEditingCompra(null);

    alert('Compra guardada con éxito.');
  } catch (error) {
    console.error('Error al guardar la compra:', error);
    alert('Error al guardar la compra: ' + error.message);
  }
};

  const handleCancelEdit = () => {
    setEditingCompra(null);
    setUsuarioId('');
    setProductos([]);
    setCantidad(0);
    setFecha('');
    setTotal(0);
  };

  const handleReturn = (productId) => {
    returnProduct(productId);
  };

  const handleAddProduct = () => {
    if (selectedProduct && cantidad > 0) {
      const productData = products.find(p => p.id === selectedProduct);
      const newProduct = {
        id: selectedProduct,
        nombre: productData.nombre,
        cantidad: parseInt(cantidad, 10),
        precio: productData.precio
      };
      console.log(newProduct);
      setProductos([...productos, newProduct]);
    }
  };

  useEffect(() => {
    const newTotal = productos.reduce((acc, product) => acc + product.precio * product.cantidad, 0);
    setTotal(newTotal);
  }, [productos]);

  return (
    <div className="inventory">
      <h2>Realizar Compra</h2>
      <form onSubmit={handleReturn}>
        <div className="form-group">
          <label>Vendedor</label>
          <select
            value={usuarioId}
            onChange={(e) => setUsuarioId(e.target.value)}>
            <option value=""> Seleccione un Vendedor</option>
            {usuarios.map(usuario => (
              <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
            ))}
          </select>
        </div>
        {/* Aquí debes agregar lógica para seleccionar productos */}
        <div className="form-group">
          <label>Productos</label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value=""> Seleccione un Producto</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>{product.nombre}</option>
            ))}
          </select>
          <button type="button" onClick={handleAddProduct}>Agregar Producto</button>
        </div>
        <div className="form-group">
          <label>Cantidad</label>
          <input
            type='number'
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            placeholder='Indicar cantidad'
          />
        </div>
        <div className="form-group">
            <label>Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Total</label>
            <input
              type="text"
              value={total.toFixed(2)}
              readOnly
            />
          </div>
        <button type="button" onClick={handleSaveCompra}>
          {editingCompra ? 'Actualizar Compra' : 'Realizar Compra'}</button>
      </form>

      <h2>Compras</h2>
      <div className="inventory-list">
        <ul>
          <li className="inventory-header">
            <span>Vendedor</span>
            <span>Productos</span>
            <span>Cantidad</span>
            <span>Fecha</span>
            <span>Total</span>
            <span>Opción</span>
          </li>
          {compras.map((product) => (
            <li key={product.id} className="inventory-item">
              <span>{product.usuarioId}</span>
              <span> <ul>
                  {product.productos.map((producto, index) => (
                    <li key={index}>{producto.nombre}</li>
                  ))}
                </ul> </span>
              <span>{product.cantidad}</span>
              <span>{product.fecha}</span>
              <span>{product.total.toFixed(2)}</span>
              <span>
                {editingCompra && editingCompra.id === compras.id ? (
                  <div>
                    <button onClick={handleSaveCompra} className="btn-save">Guardar</button>
                    <button onClick={handleCancelEdit} className="btn-cancel">Cancelar</button>
                  </div>
                ) : (
                  <button onClick={() => handleEditCompra(compras)} className="btn-edit">Editar</button>
                )}
                <button onClick={() => handleEliminarCompra(compras.id)} className="btn-delete">Eliminar</button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default PurchaseHistory;

