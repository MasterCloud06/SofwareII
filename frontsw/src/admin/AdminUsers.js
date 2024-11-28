import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../CartContext';
import './Admin.css';
import { PersonaService } from '../PersonaAPI';
import axios from 'axios';

function AdminUsers() {
  const { users, addUser, editUser, deleteUser, setAllUsers } = useContext(CartContext);
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const personaService = new PersonaService();

  useEffect(() => {
    personaService.getUser().then(data => {
      setAllUsers(data);
    }).catch(error => {
      console.error("Error fetching categories:", error);
    });
  }, [personaService, setAllUsers]);

  const registrar = (User) => {
    personaService.registrar({
      nombre: User.name,
      username: User.email,
      password: User.password,
      role: User.role
    })
      .then(newUser => {
        console.log('Usuario guardado:', newUser);
        console.log(newUser);
      })
      .catch(error => {
        console.error('Error al guardar el usuario:', error);
      });
  };

  const updateUser = (User) => {
    axios.put(`http://localhost:8081/auth/${User.id}`, {
      nombre: User.name,
      username: User.email,
      password: User.password,
      role: User.role
    })
      .then(response => {
        console.log('Usuario actualizado:', response.data);
        editUser(response.data); // Actualizar el estado local con el usuario actualizado
        setIsEditing(false); // Desactivar el modo de edición
        setCurrentUserId(null); // Limpiar el ID del usuario actualmente editado
      })
      .catch(error => {
        console.error('Error al actualizar el usuario:', error);
      });
  };

  const handleImageChange = (e) => {
    setUserImage(e.target.files[0]);
  };

  const handleSaveUser = () => {
    if (!userName || !userPassword || !userEmail || !userRole) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    const newUser = {
      id: isEditing ? currentUserId : Date.now(),
      name: userName,
      password: userPassword,
      email: userEmail,
      role: userRole,
      image: URL.createObjectURL(userImage)
    };

    if (isEditing) {
      updateUser(newUser);
    } else {
      addUser(newUser);
      registrar(newUser);
    }

    // Resetear los campos del formulario
    setUserName('');
    setUserPassword('');
    setUserEmail('');
    setUserRole('');
    setUserImage(null);
    document.getElementById('user-image').value = null;
  };

  const handleEditUser = (user) => {
    setUserName(user.name);
    setUserPassword(user.password);
    setUserEmail(user.email);
    setUserRole(user.role);
    setUserImage(null); // Assuming you want to re-upload the image
    setIsEditing(true);
    setCurrentUserId(user.id);
  };

  const deleteUsr = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8081/auth/${id}`);
      if (response.status === 204) {
        console.log('Usuario eliminado correctamente.');
        // Actualiza el estado de tu aplicación aquí si es necesario
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const handleDeleteUser = (userId) => {
    deleteUser(userId);
    deleteUsr(userId);
  };

  return (
    <div className="admin-users">
      <div className="admin-users-form">
        <h2>Administrar Usuarios</h2>
        <form>
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="text"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Correo</label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Rol</label>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              required
            >
              <option value="">Seleccione un rol</option>
              <option value="Cliente">Cliente</option>
              <option value="Administrador">Administrador</option>
            </select>
          </div>
          <div className="form-group">
            <label>Agregar Foto</label>
            <input id="user-image" type="file" onChange={handleImageChange} required={!isEditing} />
          </div>
          <button type="button" onClick={handleSaveUser}>
            {isEditing ? 'Actualizar Usuario' : 'Guardar Usuario'}
          </button>
        </form>
      </div>
      <div className="admin-users-list">
        <h3>Usuarios Existentes</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <img src={user.image} alt={user.nombre} className="user-image" />
              <div>
                <p><strong>Nombre:</strong> {user.nombre}</p>
                <p><strong>Correo:</strong> {user.username}</p>
                <p><strong>Rol:</strong> {user.role}</p>
                <button onClick={() => handleEditUser(user)}>Editar</button>
                <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminUsers;
