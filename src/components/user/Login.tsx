import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>(''); // Estado para el email
  const [password, setPassword] = useState<string>(''); // Estado para la contraseña
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Efecto para verificar si hay un JWT almacenado en localStorage al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setJwtToken(token);
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;
      console.log('Rol del usuario:', userRole);
    }

    // Verificar si hay credenciales guardadas en el estado local
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
    }
  }, []);

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

  const handleLogout = () => {
    // Borrar el JWT del estado y de localStorage
    setJwtToken(null);
    localStorage.removeItem('jwtToken');

    // Borrar las credenciales del estado local
    localStorage.removeItem('savedEmail');
    localStorage.removeItem('savedPassword');

    // Recargar la página
    window.location.reload();
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
          <h3>JWT esta ahi!</h3>
        </div>
      )}
    </div>
  );
};

export default Login;
