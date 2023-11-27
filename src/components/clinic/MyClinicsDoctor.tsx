import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext'; // Import the appropriate authentication context
import Swal from 'sweetalert2';
import { successMessage, errorMessage } from '../../notifications/messages';
import { IClinic } from './IClinic';

const MyClinicsDoctor = () => {
  const { userInfo } = useAuth(); // Replace with your context hook
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [specialities, setSpecialities] = useState([]); // Estado para almacenar las especialidades
  const [isEditing, setIsEditing] = useState(false);
  const [editedClinic, setEditedClinic] = useState<IClinic>(null);


  const [clinicData, setClinicData] = useState<IClinic>(null);

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
    if (userInfo && userInfo.user_id) {
      // Fetch clinics for the current user using user_id
      axios
        .get(`http://localhost:8081/api/v1/clinicsByUser/${userInfo.user_id}`)
        .then((response) => {
          setClinics(response.data);
        })
        .catch((error) => {
          console.error('Error fetching clinics:', error);
        });
    }
  }, [userInfo]);

  const handleEditClinic = (clinicId) => {
    // Set the selected clinic for editing
    setSelectedClinic(clinicId);
  };

  const handleCancelEdit = () => {
    // Clear the selected clinic for editing
    setSelectedClinic(null);
    setIsEditing(false);
  };


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof IClinic) => {
    const updatedEditedClinic = { ...editedClinic, [field]: event.target.value };
    setClinicData(updatedEditedClinic);
  };

  const handleTextAreaChange = (e) => {
    const { name, value } = e.target;
    setClinicData({
      ...clinicData,
      [name]: value,
    });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setClinicData({
      ...clinicData,
      [name]: value,
    });
  };

  const handleSaveClick = async (e: FormEvent) => {
    e.preventDefault();
  
    // Verifica si editedUserInfo no es nulo
    if (editedClinic) {
      try {
        console.log(editedClinic);
        // Realiza una solicitud PUT a la API para actualizar los datos del usuario
        const response = await axios.put(`http://localhost:8081/api/v1/clinic/1`, editedClinic);
  
        Swal.fire({
          icon: 'success',
          ...successMessage,
        });
        
        if (response.status === 200) {
          // Actualización exitosa, puedes realizar acciones adicionales si es necesario
          setClinicData(response.data);
          setIsEditing(false);
          console.log('Clinica actualizada correctamente');
        } else {
          // Maneja cualquier otro caso según tus necesidades
          console.error('Error al actualizar los datos ');
        }
      } catch (error) {
        // Maneja errores de la solicitud, por ejemplo, problemas de red o errores en la API
        console.error('Error en la solicitud de actualización:', error);
        Swal.fire({
          icon: 'error',
          ...errorMessage,
        });
      }
    }
  
    setIsEditing(false);
  };


  return (
    <div>
      <form>
        <h2>Clinicas del doctor {userInfo?.user_id}</h2>
         <ul>
        {clinics.map((clinic) => (
          <li key={clinic.clinic_id}>
            {clinic.clinic_name}
            <div className="mb-3">
  <label htmlFor="username">Clinica:</label>
  <div className="mb-3">
  <label htmlFor="clinicName">Nombre</label>
   
</div>
</div>

            {selectedClinic === clinic.clinic_id ? (
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
      {selectedClinic && (
        <div>
          {/* Render the form for editing the clinic data */}
          <h3>Edit Clinic Data</h3>
          {/* You can use a form or other components for editing */}
          <button className="btn btn-primary" onClick={handleSaveClick}>Guardar cambios</button>

        </div>
      )}
      </form>
    </div>
  );
};

export default MyClinicsDoctor;