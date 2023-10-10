import axios from 'axios';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterDoctor : React.FC = () => {
  const [specialities, setSpecialities] = useState([]); // Estado para almacenar las especialidades
  const [formData, setFormData] = useState({
    username: '',
    password: 'P123',
    firstName: 'Monse_Doc',
    lastName: 'Guerra',
    email: '',
    phoneNumber: '0154564351685',
    dateOfBirth: '2000-12-06',
    social_number: '',
    dui: '',
    role: 'DOCTOR',
    speciality: '',
    street: '1a ave nte',         // Nuevo campo: Calle y Número
    neighborhood: 'Transito',    // Nuevo campo: Colonia
    city: 'Apopa',            // Nuevo campo: Ciudad o Municipio
    department: 'San Salvador',      // Nuevo campo: Departamento
    postalCode: '503',      // Nuevo campo: Código Postal
    additionalInfo: 'frente a Rustik',
  });

  useEffect(() => {
    // Realizar la solicitud GET para obtener las especialidades
    axios.get('http://localhost:8081/admin/api/v1/specialities')
      .then((response) => {
        // Almacenar las especialidades en el estado
        setSpecialities(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las especialidades:', error);
      });
  }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generatePlaceholders = () => {
    const username = `monse${Math.floor(Math.random() * 100)}`;
    const email = `monse${Math.floor(Math.random() * 100)}@example.com`;
    setFormData({
      ...formData,
      username,
      email,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8081/api/v1/person/add', formData);
      console.log('Registro de doctor exitoso:', response.data);
      // Puedes redirigir al usuario a otra página o realizar alguna acción después del registro exitoso
    } catch (error) {
      console.error('Error en el registro:', error);
      // Manejar errores aquí (por ejemplo, mostrar un mensaje de error al usuario)
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
    <h2>Registro Doctor</h2>

      <div className="mb-3">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          className="form-control"
          placeholder="Nombre de Usuario" 
          required 
        />
      </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Contraseña" 
            required 
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
            placeholder="Número celular" // Marcador de posición
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
            name="dui"
            value={formData.dui}
            onChange={handleInputChange}
            className="form-control"
            placeholder="DUI (opcional)" 
          />
        </div>
        <div className="mb-3">
          Dirección:
  <input
    type="text"
    name="street"
    value={formData.street}
    onChange={handleInputChange}
    className="form-control"
    placeholder="Calle y Número" // Marcador de posición
  />
</div>
<div className="mb-3">
  <input
    type="text"
    name="neighborhood"
    value={formData.neighborhood}
    onChange={handleInputChange}
    className="form-control"
    placeholder="Colonia" // Marcador de posición
  />
</div>
<div className="mb-3">
  <input
    type="text"
    name="city"
    value={formData.city}
    onChange={handleInputChange}
    className="form-control"
    placeholder="Ciudad o Municipio" // Marcador de posición
  />
</div>
<div className="mb-3">
  <input
    type="text"
    name="department"
    value={formData.department}
    onChange={handleInputChange}
    className="form-control"
    placeholder="Departamento" // Marcador de posición
  />
</div>

<div className="mb-3">
  <input
    type="text"
    name="additionalInfo"
    value={formData.additionalInfo}
    onChange={handleInputChange}
    className="form-control"
    placeholder="Referencias adicionales" // Marcador de posición
  />
</div>

<div className="mb-3">
          <label htmlFor="speciality" className="form-label">Especialidad:</label>
          <select
            name="speciality"
            value={formData.speciality}
            onChange={handleInputChange}
            className="form-select"
            required
          >
            <option value="" disabled>Selecciona una especialidad</option>
            {/* Mapear las especialidades disponibles en las opciones */}
            {specialities.map(speciality => (
              <option key={speciality.id} value={speciality.id}>
                {speciality}
              </option>
            ))}
          </select>
        </div>

        <button type="button" className="btn btn-primary me-2" onClick={generatePlaceholders}>
          Generar Placeholders
        </button>
        <button type="submit" className="btn btn-success">Registrar doctor</button>
      </form>
    </div>
  );
};

export default RegisterDoctor;


