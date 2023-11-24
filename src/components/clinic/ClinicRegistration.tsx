import React, { useState, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';
import Swal from 'sweetalert2';
import { successMessageCreateClinic, errorMessageCreateClinic } from '../../notifications/messages';
import { IClinic } from './IClinic';

const initialClinicData: IClinic = {
  clinic_name: 'Nueva clinica',
  clinic_description: '',
  clinic_address: null,
  clinic_phone_number: '123',
  clinic_state: 'IN_REVIEW',
  speciality: 'GENERAL',
  openingTime: null,
  closingTime: null,
  doctors: [],
};

const ClinicRegistration: React.FC = () => {
  const [clinicData, setClinicData] = useState(initialClinicData);
  const [specialities, setSpecialities] = useState([]); // Estado para almacenar las especialidades
  const { userInfo } = useAuth();

  useEffect(() => {
    axios.get('http://localhost:8081/admin/api/v1/specialities')
      .then((response) => {
        setSpecialities(response.data);
    })
    .catch((error) => {
      console.error('Error al obtener las especialidades:', error);
    });
  }, []);
  
  useEffect(() => {
    // Este useEffect se ejecutará cuando userInfo cambie
    if (userInfo) {
      setClinicData({
        ...clinicData,
        doctors: [{ user_id: userInfo?.user_id, role: "DOCTOR" }],
      });
    }
  }, [userInfo]);

    
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClinicData({ ...clinicData, [name]: value });
  };
    
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClinicData({ ...clinicData, [name]: value });
  };
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setClinicData({ ...clinicData, [name]: value });
      };

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
  
      axios.post('http://localhost:8081/api/v1/clinic/add', clinicData)
        .then((response) => {
          console.log('Se va a crear esta Clínica', clinicData);

        console.log('Clínica registrada con éxito', response.data);
        
        Swal.fire({
          icon: 'success',
          ...successMessageCreateClinic,
        });
    
      })

      .catch((error) => {
        console.error('Error al registrar la clínica', error);

      Swal.fire({
        icon: 'error',
        ...errorMessageCreateClinic,
      });

      });
  };

  return (
      <div>
    <form onSubmit={handleSubmit}>
        <h2>Registra tu Clínica! Para doctor: { userInfo?.user_id}</h2>
          <div className="mb-3">
        <input
          type="text"
          name="clinic_name"
          value={clinicData.clinic_name || ''}
          onChange={handleInputChange}
          className="form-control"
          placeholder="Nombre de Clinica" 
          required 
        />
      </div>
       
        <div className="mb-3">
  <textarea
    name="clinic_description"
    value={clinicData.clinic_description}
    onChange={handleTextAreaChange}
    className="form-control"
    style={{
      maxHeight: '100px',  // Altura máxima deseada
      overflowY: 'auto',    // Agrega una barra de desplazamiento si es necesario
    }}
    placeholder="Descripción clínica"
    maxLength={512}        
  />
    </div>

    <div className="mb-3">
          <input
            type="tel"
            name="clinic_phone_number"
            value={clinicData.clinic_phone_number}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Número telefónico de clinica" 
                  />
              </div>

       
       <div className="mb-3">
          <label htmlFor="speciality" className="form-label">Especialidades []:</label>
          <select
            name="speciality"
            value={clinicData.speciality}
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
          </select>
        </div>
        <br />
        <button type="submit" className="btn btn-success">Registrar Clínica</button>
      </form>
    </div>
  );
};

export default ClinicRegistration;
