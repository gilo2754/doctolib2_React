import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function Sidebar() {
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    // Obtén el token JWT del almacenamiento local
    const token = localStorage.getItem('jwtToken');
    
    if (token) {
      const decodedToken = jwtDecode(token);
      const roles = decodedToken.roles || []; // Supongamos que los roles están en un campo 'roles' del JWT
      setUserRoles(roles);
      console.log(roles);
    }
  }, []); // Este efecto se ejecutará solo una vez al montar el componente

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
          TOFIX: visible for Doctors
          {userRoles.includes('ROLE_DOCTOR') && (
            <li>
              <Link to="/clinic-appointments">Administration for appointments [solo visible para Doctores]</Link>
            </li>
          )}
        </ul>
        {userRoles.length > 0 && (
          <div>
            <p>Tus Roles: {userRoles.join(', ')}</p>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Sidebar;
