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
     
      {isLoggedIn && (
        <>
          <li className="nav-item">
            <Link to="/account" className="nav-link">
              Cuenta
            </Link>
              </li>
               
              {userRoles.includes('ROLE_PATIENT') && (
              <>
                <li className="nav-item">
                  <Link to="/appointments" className="nav-link">
                    Mis citas: PACIENTE
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Clínicas: PACIENTE
                  </Link>
                </li>
              </>
              )}

          {userRoles.includes('ROLE_DOCTOR') && (
            <li className="nav-item">
              <Link to="/clinic-appointments" className="nav-link">
                Administración de citas: DOCTORS
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
              <Link to="/register/patient" className="nav-link">
                Registrar paciente
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register/doctor" className="nav-link">
                Registrar doctor
              </Link>
            </li>
          </>
        )}
      </div>

      {isLoggedIn && (
        <div>
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
