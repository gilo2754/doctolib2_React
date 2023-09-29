import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function Sidebar() {
  const [userRoles, setUserRoles] = useState([]);
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para rastrear el estado de la sesión

  useEffect(() => {
    // Obtén el token JWT del almacenamiento local
    setJwtToken(localStorage.getItem('jwtToken'));

    if (jwtToken) {
      const decodedToken = jwtDecode(jwtToken);
      const roles = decodedToken.roles || [];
      setUserRoles(roles);
      setIsLoggedIn(true); // Si hay un token JWT, el usuario está autenticado
    } else {
      setIsLoggedIn(false); // Si no hay un token JWT, el usuario no está autenticado
    }
  }, [jwtToken]);

  const handleLogout = () => {
    // Elimina el token JWT del almacenamiento local
    localStorage.removeItem('jwtToken');
      // Recargar la página
      window.location.reload();
    // Actualiza el estado de la sesión a "cerrada"
    setIsLoggedIn(false);
  };

  return (
    <nav className="sidebar">
      <div className="centered-content">
        {isLoggedIn &&  (
        <ul>
          <li>
            <Link to="/account">Account</Link>
          </li>
         
        
          <li>
            <Link to="/appointments">Own appointments</Link>
          </li>

            <li>
              <Link to="/clinic-appointments">Administration for appointments [solo visible para Doctores]</Link>
            </li>
         
        </ul>
        )}
        <ul>
         <li>
            <Link to="/">Clinics</Link>
          </li>
          </ul>
        <div>
          {isLoggedIn ? (
            <div>
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
          ) : (
            <><button>
                <Link to="/login">Iniciar Sesión</Link>
              </button><button>
                  <Link to="/register">Registrarse</Link>
                </button></>
          )}
        </div>
        {isLoggedIn && (
          <div>
            TOFIX: Roles to show/hide components
            {userRoles.map((role, index) => (
              <li key={index}>{role}</li>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Sidebar;
