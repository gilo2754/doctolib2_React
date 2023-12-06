import React, { createContext, useContext, useState, useEffect, SetStateAction } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { User } from '../appointments/interfaces/IAppointment';

interface AuthContextType {
  isLoggedIn: boolean;
  userRoles: string[];
  jwtToken: string | null;
  setJwtToken: (token: string | null) => void;
  logout: () => void;
  userInfo: User | null; // Change the type to User | null
  setUserInfo: (userInfo: User | null) => void; // Add the parameter type
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
  const [userInfo, setUserInfo] = useState(null); // Agrega userInfo al estado del contexto

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

    // Obtiene la información de usuario aquí y la almacena en userInfo
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get('http://localhost:8081/api/v1/user-info', config)
        .then((response) => {
          setUserInfo(response.data);
        })
        .catch((error) => {
          console.error('Error al obtener la información del usuario:', error);
        });
    }
  }, []);

  const logout = () => {
    // Realiza cualquier lógica de cierre de sesión necesaria, como eliminar el token JWT y restablecer el estado
    localStorage.removeItem('jwtToken');
    setJwtToken(null);
    setIsLoggedIn(false);
    setUserRoles([]);
    localStorage.removeItem('savedEmail');
    localStorage.removeItem('savedPassword');
    localStorage.removeItem('user_idLoggedIn');

    window.location.reload();
  };

  const value = {
    userInfo,
    isLoggedIn,
    userRoles,
    jwtToken,
    setJwtToken, 
    logout,
    setUserInfo
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
