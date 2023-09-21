import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
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
        <li>                
          <Link to="/clinic-appointments">Administration for appointments [solo visible para Doctores]</Link>
        </li>
      </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
