import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function Sidebar() {
  const [userRoles, setUserRoles] = useState([]);
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  useEffect(() => {
    // Obtén el token JWT del almacenamiento local
    setJwtToken( localStorage.getItem('jwtToken'));
    
    if (jwtToken) {
      const decodedToken = jwtDecode(jwtToken);
      const roles = decodedToken.roles || []; // Supongamos que los roles están en un campo 'roles' del JWT
      setUserRoles(roles);
      console.log(roles);
      //console.log(typeof userRoles);
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
          TODO: visible for Doctors
          {userRoles.includes('ROLE_DOCTOR') && (
            <li>
              <Link to="/clinic-appointments">Administration for appointments [solo visible para Doctores]</Link>
            </li>
          )}
        </ul>
        { (
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
