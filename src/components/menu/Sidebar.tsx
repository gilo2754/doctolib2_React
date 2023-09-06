import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <nav className="sidebar">
        <div className="centered-content">
      <ul>
        <li>
          <Link to="/">Clinic List</Link>
        </li>
        <li>                
          <Link to="/appointments">My appointments</Link>
        </li>
        <li>                
          <Link to="/account">My account</Link>
        </li>
      </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
