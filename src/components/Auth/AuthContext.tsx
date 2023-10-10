import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

interface AuthContextType {
  isLoggedIn: boolean;
  userRoles: string[];
  jwtToken: string | null;
  setJwtToken: (token: string | null) => void;
  logout: () => void;
}
interface DecodedToken {
  role: string[];
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRoles, setUserRoles] = useState([]);
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      const decodedToken: DecodedToken = jwtDecode(token); // Use the DecodedToken interface
      const roles = decodedToken.role || [];
      
      setUserRoles(roles);
      console.log('Roles del usuario:', roles);
      console.log('Roles del usuario de useState:', userRoles);

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
