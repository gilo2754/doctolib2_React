import React, { useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null); // Limpiar cualquier error previo al intentar iniciar sesión
    try {
      const response = await axios.post('http://localhost:8081/api/v1/login', {
        email,
        password,
      });

      // Guardar el token JWT en el estado
      setJwtToken(response.data.token);
      localStorage.setItem('jwtToken', response.data.token);

      if (jwtToken) {
        const decodedToken = jwtDecode(jwtToken);
        const userRole = decodedToken.role; // Suponiendo que 'role' es el campo que contiene el rol en el token
        console.log('Rol del usuario:', userRole);
      }

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