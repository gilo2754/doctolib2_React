import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';

interface Clinic {
  clinic_id?: number;
  clinic_name: string | null;
  clinic_description: string;
  clinic_address: string | null;
  clinic_phone_number: string;
  clinic_state: string;
  speciality?: string;
  openingTime: string | null;
  closingTime: string | null;
}

const initialClinicData: Clinic = {
  clinic_name: null,
  clinic_description: '',
  clinic_address: null,
  clinic_phone_number: '123',
  clinic_state: 'IN_REVIEW',
  speciality: 'UROLOGIA',
  openingTime: null,
  closingTime: null,
};

const ClinicRegistration: React.FC = () => {
  const [clinicData, setClinicData] = useState(initialClinicData);
  const [specialities, setSpecialities] = useState([]); // Estado para almacenar las especialidades

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
        console.log('Clínica registrada con éxito', response.data);
      })
      .catch((error) => {
        console.error('Error al registrar la clínica', error);
      });
  };

  return (
      <div>
    <form onSubmit={handleSubmit}>
      <h2>Registro de Clínica. TODO: possible just if you are logged in, to assign to a Doctor</h2>
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

        <br />
       
       <div className="mb-3">
          <label htmlFor="speciality" className="form-label">Especialidad:</label>
          <select
            name="speciality"
            value={clinicData.speciality}
            onChange={handleSelectChange}
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
        <br />
        <button type="submit" className="btn btn-success">Registrar Clínica</button>
      </form>
    </div>
  );
};

export default ClinicRegistration;
