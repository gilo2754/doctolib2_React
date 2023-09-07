import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios'; // Importa AxiosError para manejar errores específicos de Axios

interface ClinicAppointment {
  appointment_id: number;
  clinic: {
    clinic_id: number;
    clinic_name: string;
    clinic_description: string;
    clinic_address: string;
    clinic_phone_number: string;
    clinic_state: string;
    speciality: string;
    openingTime: string;
    closingTime: string;
  };
  doctor: {
    user_id: number;
    role: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    speciality: string;
  };
}

const ClinicAppointments: React.FC = () => {
  const [clinicAppointments, setClinicAppointments] = useState<ClinicAppointment[]>([]);
  const [loading, setLoading] = useState(true); // Agrega un estado de carga
  const [error, setError] = useState<string | null>(null); // Agrega un estado de error

  useEffect(() => {
    // Realiza la solicitud GET a la API para obtener las citas clínicas de la clínica con ID 4
    axios.get('http://localhost:8081/api/v1/appointment/clinic/1')
      .then((response) => {
        setClinicAppointments(response.data);
        setLoading(false); // Establece el estado de carga en falso cuando se completa la solicitud con éxito
        setError(null); // Limpia el estado de error
      })
      .catch((error: AxiosError) => {
        if (error.response && error.response.status === 404) {
          // Maneja el error 404 específicamente
          setClinicAppointments([]); // Establece la lista de citas en vacío
          setLoading(false); // Establece el estado de carga en falso
          setError('No se encontraron citas clínicas para esta clínica.'); // Establece un mensaje de error
        } else {
          // Maneja otros errores
          console.error('Error al obtener las citas clínicas:', error);
          setLoading(false); // Establece el estado de carga en falso
          setError('Ocurrió un error al obtener las citas clínicas.'); // Establece un mensaje de error general
        }
      });
  }, []);

  return (
    <div>
      <h2>Citas Clínicas de la Clínica San Juan</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : clinicAppointments.length === 0 ? (
        <p>No se encontraron citas clínicas para esta clínica.</p>
      ) : (
        <ul>
          {clinicAppointments.map((appointment) => (
            <li key={appointment.appointment_id}>
              <strong>Cita ID:</strong> {appointment.appointment_id}
              <br />
              <strong>Doctor:</strong> {appointment.doctor.firstName} {appointment.doctor.lastName}
              <br />
              <strong>Especialidad:</strong> {appointment.doctor.speciality}
              <br />
              <strong>Descripción de la Clínica:</strong> {appointment.clinic.clinic_description}
              <br />
              {/* Agrega aquí más detalles de la cita clínica */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClinicAppointments;
