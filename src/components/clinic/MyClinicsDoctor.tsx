import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext'; // Import the appropriate authentication context
import Swal from 'sweetalert2';
import { successMessage, errorMessage } from '../../notifications/messages';
import { IClinic, IClinicNoDoctors } from './IClinic';

const MyClinicsDoctor = () => {
  const { userInfo } = useAuth(); // Replace with your context hook
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [specialities, setSpecialities] = useState([]); // Estado para almacenar las especialidades
  const [isEditing, setIsEditing] = useState(false);
  const [editedClinic, setEditedClinic] = useState<IClinicNoDoctors>(null);
  const [clinicsThisDoctor, setClinicsThisDoctor] = useState<IClinicNoDoctors[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8081/admin/api/v1/specialities')
      .then((response) => {
        setSpecialities(response.data);
    })
    .catch((error) => {
      console.error('Error al obtener las especialidades:', error);
    });

    if (clinicsThisDoctor.length > 0) {
      setSelectedClinic(clinicsThisDoctor[0]);
    }
    
  }, []);

  useEffect(() => {
    if (userInfo && userInfo.user_id) {
      axios
        .get(`http://localhost:8081/api/v1/clinicsByUser/${userInfo.user_id}`)
        .then((response) => {
          //Get all Clinics
          setClinicsThisDoctor(response.data);
        
          //Use the for now the firtst clinic of the array
          setEditedClinic(clinicsThisDoctor[0]);

          console.log(editedClinic.clinic_name);
        })
        .catch((error) => {
          console.error('Error fetching clinics:', error);
        });
    }
  }, []);

  //TODO: need this?
  
  useEffect(() => {
    setEditedClinic(clinicsThisDoctor[0]);
  }, [clinicsThisDoctor]);

  const handleSaveClick = async (e: FormEvent) => {
    e.preventDefault();
  
    if (editedClinic) {
      console.log(selectedClinic.clinic_id);

      try {
        console.log(editedClinic.clinic_id);
        const response = await axios.put(`http://localhost:8081/api/v1/clinic/${editedClinic?.clinic_id}`, editedClinic);
  
        Swal.fire({
          icon: 'success',
          ...successMessage,
        });
        
          if (response.status === 200) {
            setClinicsThisDoctor(prevClinics => {
              const updatedClinics = prevClinics.map(clinic => {
                if (clinic.clinic_id === editedClinic.clinic_id) {
                  return editedClinic;
                }
                return clinic;
              });
              return updatedClinics;
            });

          setIsEditing(false);
          console.log('Clinica actualizada correctamente');
        } else {
          console.error('Error al actualizar los datos ');
        }
      } catch (error) {
        console.error('Error en la solicitud de actualización:', error);
        Swal.fire({
          icon: 'error',
          ...errorMessage,
        });
      }
      
    }
  
    setIsEditing(false);
  };

  const handleEditClinic = (clinicId) => {
    setSelectedClinic(clinicId);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setSelectedClinic(null);
    setIsEditing(false);
  };

  const handleInputAndTextAreaChange = (event: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>, field: keyof IClinic) => {
    const updatedEditedClinic = { ...editedClinic, [field]: event.target.value };
    setEditedClinic(updatedEditedClinic);
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    selectedClinic({
      ...editedClinic,
      [name]: value,
    });
  };

  return (
    <div className="clinic-form">
      <h2>Clinicas del doctor {userInfo?.user_id} Clinic: </h2>
      <div>
      <form>
         <ul>
        {clinicsThisDoctor.map((clinic) => (
          <li key={clinic?.clinic_id}>
            
            <div className="mb-3">

        <div className="mb-3">
          <label htmlFor="clinic_name">Clinica: {clinic?.clinic_id}</label>
          <input
          className={`mb-3 form-control ${isEditing ? 'editing' : ''}`}
            type="text"
            value={isEditing ? editedClinic?.clinic_name : clinic?.clinic_name}
            onChange={(e) => handleInputAndTextAreaChange(e, 'clinic_name')}
            placeholder="Nombre clinica"
            readOnly={!isEditing}
            />
        </div>

        <div className="mb-3">
          <label htmlFor="clinic_description">Descripción de la clínica:</label>
          <textarea
            className={`mb-3 form-control ${isEditing ? 'editing' : ''}`}
            value={isEditing ? editedClinic?.clinic_description : clinic?.clinic_description}
            onChange={(e) => handleInputAndTextAreaChange(e, 'clinic_description')}
            placeholder="Descripción de la clínica"
            readOnly={!isEditing}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="clinic_address">Dirección de la clínica:</label>
          <input
            className={`mb-3 form-control ${isEditing ? 'editing' : ''}`}
            type="text"
            value={isEditing ? editedClinic?.clinic_address : clinic?.clinic_address}
            onChange={(e) => handleInputAndTextAreaChange(e, 'clinic_address')}
            placeholder="Dirección de la clínica"
            readOnly={!isEditing}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="clinic_phone_number">Número de teléfono de la clínica:</label>
          <input
            className={`mb-3 form-control ${isEditing ? 'editing' : ''}`}
            type="text"
            value={isEditing ? editedClinic?.clinic_phone_number : clinic?.clinic_phone_number}
            onChange={(e) => handleInputAndTextAreaChange(e, 'clinic_phone_number')}
            placeholder="Número de teléfono de la clínica"
            readOnly={!isEditing}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="clinic_state">Estado de la clínica: </label>
          {clinic?.clinic_state}
        </div>

        <label htmlFor="clinic_state">Apertura: TODO </label>

          {clinic?.openingTime}
          <br />
          <label htmlFor="clinic_state">Cierre:  </label>

          {clinic?.closingTime}

        <div className="mb-3">
          <label htmlFor="speciality" className="form-label">Especialidades []:</label>
          <select
            name="speciality"
            value={clinic?.speciality}
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

</div>

            {selectedClinic === clinic.clinic_id &&
            isEditing ? (
              <><button className="btn btn-primary" onClick={handleCancelEdit}>Cancelar</button>
              <button className="btn btn-primary" onClick={handleSaveClick}>Guardar cambios</button>
              </>

            ) : (
                <button className="btn btn-primary" onClick={() =>  handleEditClinic(clinic.clinic_id)}>
                  Editar</button>
            )}


          </li>
        ))}
      </ul>
     
      </form>
      </div>

    </div>
  );
};

export default MyClinicsDoctor;