import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRoles, setUserRoles] = useState([]);
  const [jwtToken, setJwtToken] = useState(null);

  useEffect(() => {
    // Obtén el token JWT del almacenamiento local
    const token = localStorage.getItem('jwtToken');

    if (token) {
      const decodedToken = jwtDecode(token);
      const roles = decodedToken.roles || [];
      setUserRoles(roles);
      setIsLoggedIn(true); // Si hay un token JWT, el usuario está autenticado
    } else {
      setIsLoggedIn(false); // Si no hay un token JWT, el usuario no está autenticado
    }
    setJwtToken(token);
  }, []);

  const logout = () => {
    // Realiza cualquier lógica de cierre de sesión necesaria, como eliminar el token JWT y restablecer el estado
    localStorage.removeItem('jwtToken');
    setJwtToken(null);
    setIsLoggedIn(false);
    setUserRoles([]);
    // Borrar las credenciales del estado local
    localStorage.removeItem('savedEmail');
    localStorage.removeItem('savedPassword');
    window.location.reload();
  };

  const value = {
    isLoggedIn,
    userRoles,
    jwtToken,
    setJwtToken, // Agrega setJwtToken al contexto
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
