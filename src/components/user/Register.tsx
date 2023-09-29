import axios from 'axios';
import React, { useState } from 'react';

const SignUp = () => {
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
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de Usuario*:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required // Campo obligatorio
          />
        </div>
        <div>
          <label>Contraseña*:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required // Campo obligatorio
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Correo Electrónico*:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required // Campo obligatorio
          />
        </div>
        <div>
          <label>Número de Teléfono:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Fecha de Nacimiento:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Número Social:</label>
          <input
            type="text"
            name="social_number"
            value={formData.social_number}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={generatePlaceholders}>
          Generar Placeholders
        </button>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default SignUp;
