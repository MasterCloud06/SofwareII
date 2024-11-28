import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica de registro
    console.log('Registrando usuario:', { firstName, lastName, email, password, newsletter });
    // Redirigir al inicio de sesión después del registro
    navigate('/login');
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Bienvenido</h2>
        <p>Por favor complete la información a continuación</p>
        <label>Nombre</label>
        <input
          type="text"
          placeholder="Tu Nombre"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label>Apellido</label>
        <input
          type="text"
          placeholder="Tu Apellido"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <label>Correo Electrónico</label>
        <input
          type="email"
          placeholder="nombre@empresa.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Contraseña</label>
        <input
          type="password"
          placeholder="Tu Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="register-options">
          <label>
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
            />
            Mantenerme actualizado con noticias y ofertas exclusivas
          </label>
        </div>
        <button type="submit">Crear Cuenta</button>
        <p className="login-link">¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a></p>
      </form>
    </div>
  );
}

export default Register;
