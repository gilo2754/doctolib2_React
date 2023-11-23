import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useAuth } from '../Auth/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface DecodedToken {
  sub?: string;
  // Add any other properties you expect in the decoded token here
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn, userRoles, jwtToken, logout, setJwtToken } = useAuth();
  const [username, setUsername] = useState<string | undefined>(); // Provide a type for 'username'
  const navigate = useNavigate();

  useEffect(() => {
    // Obtén el token JWT del almacenamiento local
    const token = localStorage.getItem('jwtToken');

    if (token) {
      const decodedToken: { sub?: string } = jwtDecode(token);
      setUsername(decodedToken.sub || '');
      console.log('Username:', username);
    }
    setJwtToken(token);
  }, []);

  const handleLogin  = async (e: FormEvent) => {
    e.preventDefault();

    setError(null); // Limpiar cualquier error previo al intentar iniciar sesión
    try {
      const response = await axios.post('http://localhost:8081/api/v1/login', {
        email: formData.email,
        password: formData.password,
      });

      navigate('/account');
      const token = response.data.token;
      setJwtToken(token);
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('savedEmail', formData.email);
      localStorage.setItem('savedPassword', formData.password);
      window.location.reload();
    
    } catch (error) {
      if (error.response) {
        setError('Credenciales incorrectas');
      } else {
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
      handleLogin(event);
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {jwtToken ? (
        <div>
          <p>¡Bienvenid@ {username}! {String.fromCodePoint(0x1F603)}</p>
          <p> Has iniciado sesión</p>
          <p> Tu rol es:  {userRoles}</p>
          <button className="btn btn-danger" onClick={logout}>Cerrar Sesión</button>
          </div>
  ) : (
    <form onSubmit={handleLogin}> 
    <div className="input-group mb-3">
        <span className="input-group-text">
          <FontAwesomeIcon icon={faUser} />
    </span>
    <input
        type="text"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        className="form-control"
        required
        placeholder="Nombre de usuario"
        autoComplete="email" 

      />
            </div>
            <div className="input-group mb-3">
        <span className="input-group-text">
          <FontAwesomeIcon icon={faLock} />
              </span>
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
          autoComplete="current-password" 
              />
              <button className="btn btn-primary ms-2" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>
      <button type="submit" className="btn btn-dark">Iniciar Sesión</button>


      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}

<div>
          <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
        </div>
    </form>
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
