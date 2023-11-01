import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext'; // Import the appropriate authentication context
import { Clinic } from '../appointments/interfaces/IAppointment';

const MyClinicsDoctor = () => {
  const { userInfo } = useAuth(); // Replace with your context hook
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [specialities, setSpecialities] = useState([]); // Estado para almacenar las especialidades
  const [isEditing, setIsEditing] = useState(false);
  const [editedClinic, setEditedClinic] = useState<Clinic>(null);

  const initialClinicData = {
    clinic_name: '',
    clinic_description: '',
    clinic_phone_number: '',
    speciality: '',
  };
  const [clinicData, setClinicData] = useState(initialClinicData);

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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClinicData({
      ...clinicData,
      [name]: value,
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar la solicitud para registrar la clínica con los datos de clinicData
    axios
      .post('http://localhost:8081/api/v1/clinic', clinicData)
      .then((response) => {
        // Manejar la respuesta si es necesario
        console.log('Clínica registrada:', response.data);
        // Puedes actualizar la lista de clínicas si es necesario
        setClinicData(initialClinicData);
      })
      .catch((error) => {
        console.error('Error registrando clínica:', error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Clinicas de este doctor {userInfo?.user_id}</h2>
         <ul>
        {clinics.map((clinic) => (
          <li key={clinic.clinic_id}>
            {clinic.clinic_name}
            <div className="mb-3">
  <label htmlFor="username">Clinica:</label>
 
</div>

            {selectedClinic === clinic.clinic_id ? (
              <button onClick={handleCancelEdit}>Cancel Edit</button>
            ) : (
                <button className="btn btn-primary" onClick={() =>  handleEditClinic(clinic.clinic_id)}>Editar(Abrir clinic en /clinic/clinicId nueva pagina)</button>
            )}


          </li>
        ))}
      </ul>
      {selectedClinic && (
        <div>
          {/* Render the form for editing the clinic data */}
          <h3>Edit Clinic Data</h3>
          {/* You can use a form or other components for editing */}
          <button onClick={() => handleEditClinic(null)}>Save Changes</button>
        </div>
      )}
      </form>
    </div>
  );
};

export default MyClinicsDoctor;