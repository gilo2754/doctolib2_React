import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useAuth } from '../Auth/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>(''); // Estado para el email
  const [password, setPassword] = useState<string>(''); // Estado para la contraseña
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn, userRoles, jwtToken, logout, setJwtToken } = useAuth();

  const handleLogin = async () => {
    setError(null); // Limpiar cualquier error previo al intentar iniciar sesión
    try {
      const response = await axios.post('http://localhost:8081/api/v1/login', {
        email,
        password,
      });

      // Guardar el token JWT en el estado y en localStorage
      const token = response.data.token;
      setJwtToken(token);
      localStorage.setItem('jwtToken', token);

      // Guardar las credenciales en el estado local
      localStorage.setItem('savedEmail', email);
      localStorage.setItem('savedPassword', password);

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

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {jwtToken ? (
        <div>
          <p>¡Has iniciado sesión! </p>
          <button onClick={logout}>Cerrar Sesión</button>
        </div>
      ) : (
        <div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          <button onClick={handleLogin}>Iniciar Sesión</button>

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
