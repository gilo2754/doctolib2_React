import axios from 'axios';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { errorMessageRegisterUser, successMessageRegisterUser } from '../../notifications/messages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faBuilding, faCity, faEnvelope, faInfoCircle, faLock, faMapMarkedAlt, faMobilePhone, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';

const RegisterDoctor: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState(''); // Estado para la confirmación de contraseña
  const [passwordsMatch, setPasswordsMatch] = useState(true); // Estado para verificar si las contraseñas coinciden
  const [specialities, setSpecialities] = useState([]); 
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
    speciality: 'GENERAL',
    street: '1a ave nte',         // Nuevo campo: Calle y Número
    neighborhood: 'Transito',    // Nuevo campo: Colonia
    city: 'Apopa',            // Nuevo campo: Ciudad o Municipio
    department: 'San Salvador',      // Nuevo campo: Departamento
    postalCode: '503',      // Nuevo campo: Código Postal
    additionalInfo: 'frente a Rustik',
  });

  useEffect(() => {
    axios.get('http://localhost:8081/admin/api/v1/specialities')
      .then((response) => {
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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generatePlaceholders = () => {
    const username = `d${Math.floor(Math.random() * 100)}`;
    const email = `d${Math.floor(Math.random() * 100)}@example.com`;
    setFormData({
      ...formData,
      username,
      email,
    });
  };

  const handlePasswordConfirmationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPasswordConfirmation(e.target.value);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Evitar la recarga de la página

    if (formData.password === passwordConfirmation) {
      try {
        const response = await axios.post('http://localhost:8081/api/v1/person/add', formData);
        console.log('Registro de doctor exitoso:', response.data);

        Swal.fire({
          icon: 'success',
          ...successMessageRegisterUser,
        });
        navigate('/login');
      } catch (error) {
        console.error('Error en el registro:', error);
        Swal.fire({
          icon: 'error',
          ...errorMessageRegisterUser,
        });
      }
    } else {
      // Las contraseñas no coinciden, muestra un mensaje de error
      setPasswordsMatch(false);
    }
  };

  return (
    <div>
    <form>
    <h2>Registro Doctor</h2>

    <div className="input-group mb-3">
        <span className="input-group-text">
          <FontAwesomeIcon icon={faUser} />
        </span>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          className="form-control"
          placeholder="Nombre de usuario para iniciar sesión"
          required
          autoComplete="username"
        />
      </div>

      <div className="input-group mb-3">
          <span className="input-group-text">
            <FontAwesomeIcon icon={faLock} />
          </span>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="form-control"
            required
            placeholder="Contraseña"
            autoComplete="new-password"
          />
        </div>
        
        <div className="input-group mb-3">
          <span className="input-group-text">
            <FontAwesomeIcon icon={faLock} />
          </span>
          <input
            type={showPassword ? 'text' : 'password'}
            name="passwordConfirmation"
            value={passwordConfirmation}
            onChange={handlePasswordConfirmationChange}
            className="form-control"
            required
            placeholder="Confirmar Contraseña"
            autoComplete="new-password"
          />
       <button type="button" className="btn btn-primary ms-2" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? 'Ocultar' : 'Mostrar'}
        </button>
          </div> 
        
        {!passwordsMatch && (
          <div className="alert alert-danger" role="alert">
            Las contraseñas no coinciden. Por favor, inténtalo de nuevo.
          </div>
        )}

      <div className="input-group mb-3">
        <span className="input-group-text">
          <FontAwesomeIcon icon={faUser} />
        </span>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          className="form-control"
          placeholder="Nombre"
          autoComplete="given-name"
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">
          <FontAwesomeIcon icon={faUser} />
        </span>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          className="form-control"
          placeholder="Apellido"
          autoComplete="family-name"
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="form-control"
          placeholder="Correo Electrónico"
          required
          autoComplete="email"
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">
          <FontAwesomeIcon icon={faPhone} />
        </span>
  <input
    type="tel"
    name="phoneNumber"
    value={formData.phoneNumber}
    onChange={handleInputChange}
    className="form-control"
    placeholder="Número celular" 
    autoComplete="tel" 
  />
        </div>
        {/*
<div className="mb-3">
  <input
    type="date"
    name="dateOfBirth"
    value={formData.dateOfBirth}
    onChange={handleInputChange}
    className="form-control"
    placeholder="Fecha de Nacimiento"
    autoComplete="bday" // Añadir atributo autocomplete con el valor "bday"
  />
</div>
*/}
<div className="input-group mb-3">
        <span className="input-group-text">
          <FontAwesomeIcon icon={faAddressCard} />
        </span>  <input
    type="text"
    name="dui"
    value={formData.dui}
    onChange={handleInputChange}
    className="form-control"
    placeholder="DUI (opcional)" 
  />
</div>
   Dirección:         
    <div className="input-group mb-3">
  <span className="input-group-text">
    <FontAwesomeIcon icon={faMapMarkedAlt} />
  </span>  
  <input
    type="text"
    name="street"
    value={formData.street}
    onChange={handleInputChange}
    className="form-control"
    placeholder="Calle y Número"
  />
</div>
          
        <div className="input-group mb-3">
  <span className="input-group-text">
    <FontAwesomeIcon icon={faBuilding} />
  </span>  
  <input
    type="text"
    name="neighborhood"
    value={formData.neighborhood}
    onChange={handleInputChange}
    className="form-control"
    placeholder="Colonia"
  />
</div>
<div className="input-group mb-3">
  <span className="input-group-text">
            <FontAwesomeIcon icon={faCity} />
            </span>  
  <input
    type="text"
    name="city"
    value={formData.city}
    onChange={handleInputChange}
    className="form-control"
    placeholder="Ciudad o Municipio"
  />
</div>
<div className="input-group mb-3">
  <span className="input-group-text">
            <FontAwesomeIcon icon={faCity} />
          </span>
          <input
    type="text"
    name="department"
    value={formData.department}
    onChange={handleInputChange}
    className="form-control"
    placeholder="Departamento"
  />
</div>

<div className="input-group mb-3">
  <span className="input-group-text">
            <FontAwesomeIcon icon={faInfoCircle } />
          </span>
  <input
    type="text"
    name="additionalInfo"
    value={formData.additionalInfo}
    onChange={handleInputChange}
    className="form-control"
    placeholder="Referencias adicionales para la dirección"
  />
</div>

<div className="mb-3">
  <label htmlFor="speciality" className="form-label">Especialidad:</label>
  <select
    name="speciality"
    value={formData.speciality}
    onChange={handleSelectChange}
    className="form-select"
    required
  >
    <option value="" disabled>Selecciona una especialidad</option>
    {specialities.map(speciality => (
  <option key={speciality.id} value={speciality.id}>
    {speciality}
  </option>
    ))}
     {specialities.map((speciality, index) => (
  <option key={index} value={speciality}>
    {speciality}
  </option>
))}

  </select>
</div>


        <button type="button" className="btn btn-primary me-2" onClick={generatePlaceholders}>
          Generar Placeholders
        </button>
        <button type="button" className="btn btn-success" onClick={handleSubmit}>
            Registrar doctor
          </button>

      </form>
      
      </div>      
  );
};

export default RegisterDoctor;


