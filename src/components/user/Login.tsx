import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useAuth } from '../Auth/AuthContext';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn, userRoles, jwtToken, logout, setJwtToken } = useAuth();

  const handleLogin = async () => {
    setError(null); // Limpiar cualquier error previo al intentar iniciar sesión
    try {
      const response = await axios.post('http://localhost:8081/api/v1/login', {
        email: formData.email,
        password: formData.password,
      });

      // Guardar el token JWT en el estado y en localStorage
      const token = response.data.token;
      setJwtToken(token);
      localStorage.setItem('jwtToken', token);

      // Guardar las credenciales en el estado local
      localStorage.setItem('savedEmail', formData.email);
      localStorage.setItem('savedPassword', formData.password);

      // Recargar la página
      window.location.reload();
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un estado de error (por ejemplo, credenciales incorrectas)
        setError('Credenciales incorrectas');
      } else {
        // Error de red o problema en la solicitud
        setError('Error en la solicitud');
      }
      setJwtToken(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {jwtToken ? (
        <div>
          <p>¡Has iniciado sesión! </p>
          <button className="btn btn-danger" onClick={logout}>Cerrar Sesión</button>
        </div>
      ) : (
        <div>
      <div className="mb-3">
              <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-control"
            required
            placeholder="E-Mail" 

          />
          </div>
          <div className="mb-3 d-flex align-items-center">
  <input
    type={showPassword ? 'text' : 'password'}
    id="password"
    name="password"
    value={formData.password}
    onChange={handleInputChange}
    onKeyDown={handlePasswordKeyPress}
    className="form-control"
    required
    placeholder="Contraseña"
  />
  <button className="btn btn-primary ms-2" onClick={() => setShowPassword(!showPassword)}>
    {showPassword ? 'Ocultar' : 'Mostrar'}
  </button>
</div>

          <button className="btn btn-dark" onClick={handleLogin}>Iniciar Sesión</button>

          {error && (
            <div>
              <p>{error}</p>
            </div>
          )}
        </div>
      )}
      {jwtToken && (
        <div>
          <h3>JWT esta ahi!</h3>
        </div>
      )}
    </div>
  );
};

export default Login;
