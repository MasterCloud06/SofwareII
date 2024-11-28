/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../CartContext';
import '../App.css';
import axios from "axios";
import { PersonaService } from '../PersonaAPI';


function AdminProducts() {
  const { addProduct, editProduct, deleteProduct, categories, setproduct, setAllCategories } = useContext(CartContext);
  const [productName, setProductName] = useState('');
  const { products } = useContext(CartContext);
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [discount, setDiscount] = useState('');
  const personaService = new PersonaService();

  useEffect(() => {
    personaService.getProducto().then(data => {
      setproduct(data);
    }).catch(error => {
      console.error("Error fetching categories:", error);
    });
  }, [personaService]);

  useEffect(() => {
    personaService.getAll().then(data => {
      setAllCategories(data);

    }).catch(error => {
      console.error("Error fetching categories:", error);
    });
  }, [personaService, setAllCategories]);

  const saveP = (newProduct) => {
    personaService.saveP({
      nombre: newProduct.name,          // Nombre del producto
      precio: newProduct.price,         // Precio del producto
      cantidad: newProduct.stock,       // Cantidad o stock del producto
      imagen: newProduct.image,         // URL de la imagen del producto
      categoria: newProduct.category
    })
      .then(data => {
        console.log('Producto guardado:', data);
      })
      .catch(error => {
        console.error('Error al guardar el producto:', error);
      });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const response = await axios.put(`http://localhost:8081/productos/editar/${id}`, {
        nombre: updatedProduct.name,
        precio: updatedProduct.price,
        cantidad: updatedProduct.stock,
        imagen: updatedProduct.image,
        categoria: updatedProduct.category
      });
      console.log('Producto actualizado:', response.data);
      editProduct(response.data); // Actualizar el producto en el estado local
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      throw error;
    }
  };

  const handleSaveProduct = async () => {
    if (!productName || !productPrice || !productCategory || !productStock || !productImage) {
      alert('Todos los campos son obligatorios.');
      return;
    }
  
    const formData = new FormData();
    formData.append('imagen', productImage);
    formData.append('nombre', productName);
    formData.append('descripcion', 'Descripción del producto');
    formData.append('precio', productPrice);
    formData.append('cantidad', productStock);
    formData.append('categoria', productCategory);
  
    try {
      const response = await axios.post('http://localhost:8081/productos/crear', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log('Producto guardado:', response.data);
      addProduct(response.data);
  
      // Resetear los campos del formulario
      setProductName('');
      setProductPrice('');
      setProductCategory('');
      setProductStock('');
      setProductImage(null);
      document.getElementById('product-image').value = null;
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }
  };
  
  const handleEditProduct = (product) => {
    setProductName(product.name);
    setProductPrice(product.price);
    setProductCategory(product.category);
    setProductStock(product.stock);
    setProductImage(null);
    setIsEditing(true);
    setCurrentProductId(product.id);
  };

  const deleteProduc = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8081/productos/${id}`);
      if (response.status === 204) {
        console.log('Producto eliminado correctamente.');
        // Actualiza el estado de tu aplicación aquí si es necesario
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };
  const handleDeleteProduct = (productId) => {
    deleteProduct(productId);
    deleteProduc(productId);
  };

  const handleDiscount = (product) => {//descuento
    if (!discount) {
      alert('Ingrese un porcentaje de descuento.');
      return;
    }

    const discountedPrice = (product.price - (product.price * (discount / 100))).toFixed(2);
    const updatedProduct = {
      ...product,
      price: discountedPrice,
      isDiscounted: true
    };

    editProduct(updatedProduct);
    setDiscount(''); // Resetear el campo de descuento
  };

  const handleRemoveDiscount = (product) => {
    const updatedProduct = {
      ...product,
      price: product.originalPrice,
      isDiscounted: false
    };

    editProduct(updatedProduct);
  };

  return (
    <div className="admin-products">
      <div className="admin-products-form">
        <h2>Administrar Productos</h2>
        <form>
          <div className="form-group">
            <label>Nombre del Producto</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Precio</label>
            <input
              type="text"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Categoría</label>
            <select
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              required
            >
              <option value="">Seleccione una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.nombre}>
                  {category.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              value={productStock}
              onChange={(e) => setProductStock(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Agregar Imagen</label>
            <input id="product-image" type="file" onChange={handleImageChange} required={!isEditing} />
          </div>
          <button type="button" onClick={handleSaveProduct}>
            {isEditing ? 'Actualizar Producto' : 'Guardar Producto'}
          </button>
        </form>
      </div>
      <div className="admin-products-list">
        <h3>Productos Nuevos</h3>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <img src={product.imagen} alt={product.nombre} className="product-image" />
              <div>
                <p><strong>Nombre:</strong> {product.nombre}</p>
                <p>
                  <strong>Precio:</strong> {product.isDiscounted ? (
                    <>
                      <span className="original-price">${product.originalPrice}</span>
                      <span className="discounted-price">${product.precio}</span>
                    </>
                  ) : (
                    `$${product.precio}`
                  )}
                </p>
                <p><strong>Categoría:</strong> {product.categoria}</p>
                <p><strong>Stock:</strong> {product.cantidad}</p>
                <button onClick={() => handleEditProduct(product)}>Editar</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
                <input
                  type="number"
                  value={discount}
                  placeholder="Descuento (%)"
                  onChange={(e) => setDiscount(e.target.value)}
                  className="discount-input"
                />
                <button onClick={() => handleDiscount(product)}>Aplicar Descuento</button>
                {product.isDiscounted && (
                  <button onClick={() => handleRemoveDiscount(product)}>Quitar Descuento</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminProducts;
