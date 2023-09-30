import axios from 'axios';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: 'P123',
    firstName: 'carlo',
    lastName: 'menji',
    email: '',
    phoneNumber: '0154564351685',
    dateOfBirth: '1990-01-01',
    social_number: '',
    role: 'PATIENT',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generatePlaceholders = () => {
    const username = `carlo${Math.floor(Math.random() * 100)}`;
    const email = `carlo${Math.floor(Math.random() * 100)}@example.com`;
    setFormData({
      ...formData,
      username,
      email,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8081/api/v1/person/add', formData);
      console.log('Registro exitoso:', response.data);
      // Puedes redirigir al usuario a otra página o realizar alguna acción después del registro exitoso
    } catch (error) {
      console.error('Error en el registro:', error);
      // Manejar errores aquí (por ejemplo, mostrar un mensaje de error al usuario)
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
    <h2>Registro</h2>

      <div className="mb-3">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          className="form-control"
          placeholder="Nombre de Usuario" // Marcador de posición
          required // Campo obligatorio
        />
      </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Contraseña" // Marcador de posición
            required // Campo obligatorio
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Nombre" // Marcador de posición
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Apellido" // Marcador de posición
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Correo Electrónico" // Marcador de posición
            required // Campo obligatorio
          />
        </div>
        <div className="mb-3">
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Número de Teléfono" // Marcador de posición
          />
        </div>
        <div className="mb-3">
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Fecha de Nacimiento" // Marcador de posición
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="social_number"
            value={formData.social_number}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Número Social" // Marcador de posición
          />
        </div>
        <button type="button" className="btn btn-primary me-2" onClick={generatePlaceholders}>
          Generar Placeholders
        </button>
        <button type="submit" className="btn btn-success">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
