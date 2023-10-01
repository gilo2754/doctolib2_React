import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useAuth } from '../Auth/AuthContext';

function Sidebar() {
  const { isLoggedIn, userRoles, jwtToken, logout, setJwtToken } = useAuth();

  return (
    <nav className="sidebar">
  <div className="centered-content">
    <ul className="nav flex-column nav-pills">
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Clinics
        </Link>
      </li>
      {isLoggedIn && (
        <>
          <li className="nav-item">
            <Link to="/account" className="nav-link">
              Account
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/appointments" className="nav-link">
              Own appointments
            </Link>
          </li>
          {userRoles.includes('ROLE_DOCTOR') && (
            <li className="nav-item">
              <Link to="/clinic-appointments" className="nav-link">
                Administration for appointments [visible para Doctores]
              </Link>
            </li>
          )}
        </>
      )}

      <div>
        {isLoggedIn ? (
          <div>
            <button onClick={logout} className="btn btn-danger">
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Iniciar Sesión
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Registrarse
              </Link>
            </li>
          </>
        )}
      </div>

      {isLoggedIn && (
        <div>
          <p>Tus roles son:</p>
          <ul>
            {userRoles.map((role, index) => (
              <li key={index}>{role}</li>
            ))}
          </ul>
        </div>
      )}
    </ul>
  </div>
</nav>

  );
}

export default Sidebar;
