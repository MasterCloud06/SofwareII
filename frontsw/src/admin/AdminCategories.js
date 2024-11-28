/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../CartContext';
import axios from "axios";
import './Admin.css';
import { PersonaService } from '../PersonaAPI';

function AdminCategories() {

  const { categories, editCategory, deleteCategory, setAllCategories } = useContext(CartContext);
  const [categoryName, setCategoryName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const personaService = new PersonaService();

  // Obtener categorías al montar el componente
  useEffect(() => {
    personaService.getAll().then(data => {
      setAllCategories(data);

    }).catch(error => {
      console.error("Error fetching categories:", error);
    });
  }, [personaService, setAllCategories]);

  const updateCatalogoNombre = async (id, nuevoNombre) => {
    try {
      const response = await axios.put(`http://localhost:8081/catalogos/${id}`, { nombre: nuevoNombre }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error actualizando el nombre del catálogo:", error);
      throw error;
    }
  };

  const save = (newCategory) => {
    personaService.save({ nombre: categoryName }).then(data => {
      console.log(data);
    })
  }

  const handleSaveCategory = () => {
    if (!categoryName) {
      alert('El nombre de la categoría es obligatorio.');
      return;
    }

    const newCategory = {
      id: isEditing ? currentCategoryId : Date.now(),
      name: categoryName
    };

    if (isEditing) {
      editCategory(newCategory);
      setIsEditing(false);
      setCurrentCategoryId(null);
      updateCatalogoNombre(newCategory.id, newCategory.name);
    } else {
      save(newCategory);
    }
    setCategoryName('');
  };

  const handleEditCategory = (category) => {
    setCategoryName(category.name);
    setIsEditing(true);
    setCurrentCategoryId(category.id);
  };

  const deleteCatalog = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8081/catalogos/${id}`);
      if (response.status === 204) {
        console.log('Catalogo eliminado correctamente.');
        // Actualiza el estado de tu aplicación aquí si es necesario
      }
    } catch (error) {
      console.error('Error al eliminar el catálogo:', error);
    }
  };

  const handleDeleteCategory = (categoryId) => {
    deleteCategory(categoryId);
    deleteCatalog(categoryId);
  };

  return (
    <div className="admin-categories">
      <div className="admin-categories-form">
        <h2>Administrar Categorías</h2>
        <form>
          <div className="form-group">
            <label>Nombre de la Categoría</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>
          <button type="button" onClick={handleSaveCategory}>
            {isEditing ? 'Actualizar Categoría' : 'Guardar Categoría'}
          </button>
        </form>
      </div>
      <div className="admin-categories-list">
        <h3>Categorías Existentes</h3>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <div>
                <p><strong>Nombre:</strong> {category.nombre}</p>
                <button onClick={() => handleEditCategory(category)}>Editar</button>
                <button onClick={() => handleDeleteCategory(category.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminCategories;
