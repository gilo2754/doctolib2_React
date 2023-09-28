import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate()

  const [userRoles, setUserRoles] = useState([]);
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  useEffect(() => {
    // Obtén el token JWT del almacenamiento local
    setJwtToken(localStorage.getItem('jwtToken'));

    if (jwtToken) {
      const decodedToken = jwtDecode(jwtToken);
      const roles = decodedToken.roles || []; // Supongamos que los roles están en un campo 'roles' del JWT
      setUserRoles(roles);
      console.log(roles);
    }
  }, [jwtToken]); // Este efecto se ejecutará solo una vez al montar el componente

  const handleSessionToggle = () => {
    // Implementa la lógica para terminar o iniciar la sesión aquí
    if (jwtToken) {
      // Si el token JWT está presente, el usuario ya ha iniciado sesión, así que podemos terminar la sesión
      // Puedes eliminar el token JWT del almacenamiento local y realizar otras tareas de limpieza si es necesario
      localStorage.removeItem('jwtToken');
      setJwtToken(null); // Limpia el token JWT en el estado local
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="sidebar">
      <div className="centered-content">
        <ul>
          <li>
            <Link to="/account">Account</Link>
          </li>
          <li>
            <Link to="/">Clinics</Link>
          </li>
          <li>
            <Link to="/appointments">Own appointments</Link>
          </li>
          {/* TODO: visible for Doctors  userRoles.includes('ROLE_DOCTOR') */}
          {true && (
            <li>
              <Link to="/clinic-appointments">Administration for appointments [solo visible para Doctores]</Link>
            </li>
          )}
        </ul>
        <div>
          {/* Add a button to toggle the session */}
          <button onClick={handleSessionToggle}>
            {jwtToken ? 'Terminar Sesión BROKEN!' : 'Iniciar Sesión BROKEN!'}
          </button>
        </div>
        {(
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
