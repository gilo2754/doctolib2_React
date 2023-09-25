import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Efecto para verificar si hay un JWT almacenado en localStorage al cargar el componente
  useEffect(() => {
    setJwtToken( localStorage.getItem('jwtToken'));
    if (jwtToken) {
      setJwtToken(jwtToken);
      const decodedToken = jwtDecode(jwtToken);
      const userRole = decodedToken.role; // Suponiendo que 'role' es el campo que contiene el rol en el token
      console.log('Rol del usuario:', userRole);
    }
  }, [jwtToken]); //CHECK: puse jwtToken en el arreglo

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

  const handleLogout = () => {
    // Borrar el JWT del estado y de localStorage
    setJwtToken(null);
    localStorage.removeItem('jwtToken');
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {jwtToken ? (
        <div>
          <p>¡Has iniciado sesión! </p>
          <button onClick={handleLogout}>Cerrar Sesión</button>
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
          <h3>Token JWT:</h3>
          <p>{jwtToken}</p>
        </div>
      )}
    </div>
  );
};

export default Login;
