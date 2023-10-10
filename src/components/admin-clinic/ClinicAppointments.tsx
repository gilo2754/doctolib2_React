import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios'; // Importa AxiosError para manejar errores específicos de Axios
import Clinic from '../clinic/Clinic';
import Appointment from '../appointments/appointment';
import Modal from 'react-modal'; // Importa react-modal
import { useAuth } from '../Auth/AuthContext';

Modal.setAppElement('#root'); // Set the app element here


const ClinicAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [appointmentToHandle, setAppointmentToHandle] = useState<Appointment | null>(null);
  interface AuthData {
    jwtToken: string;
    isLoggedIn: boolean;
    userRoles: string[];
    logout: void;
  }
  const { isLoggedIn, userRoles, jwtToken, logout, setJwtToken } = useAuth() as AuthData;

  useEffect(() => {
    if (jwtToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      // Llamada a la función fetchAppointments dentro del useEffect
      fetchAppointments(config);
    }
  }, [jwtToken]);

  const fetchAppointments = async (config: any) => {
    try {
      const response = await axios.get('http://localhost:8081/api/v1/appointment/clinic/1', config);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      console.error('Respuesta del servidor:', error.response.data);
    }
  };

  const openModal = (appointment: Appointment) => {
    setAppointmentToHandle(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAppointment = async (appointment: Appointment, appointmentStatus: string) => {
    if (appointment) {
      try {
        const modifiedAppointment: Partial<Appointment> = {
          appointment_id: appointment.appointment_id,
          appointment_status: appointmentStatus,
          clinic: { clinic_id: appointment.clinic.clinic_id },
          // TODO: Obtén el ID del usuario del paciente de alguna manera (puede ser a través de la autenticación)
          patient: { user_id: 1 },
          doctor: { user_id: appointment.doctor.user_id },
          endTime: appointment.endTime,
          startTime: appointment.startTime,
        };

        // Envía una solicitud al servidor para modificar el estado de la cita
        const response = await axios.put(
          'http://localhost:8081/api/v1/appointment/update',
          modifiedAppointment
        );

        console.log('Appointment was changed:', response.data);
        closeModal();
        // Refresca la lista de citas después del cambio de estado
        fetchAppointments({ headers: { Authorization: `Bearer ${jwtToken}` } });
      } catch (error) {
        console.error('Error changing appointment status:', error);
      }
    }
  };

  return (
    <div>
      <h1>Mis próximas citas</h1>
      {appointments.map(appointment => (
        <div key={appointment.appointment_id} className="appointment-box">
          <h2>Appointment ID: {appointment.appointment_id}</h2>
          <p>Clinic ID: {appointment.clinic.clinic_id}</p>
          <p>{appointment.clinic.clinic_name}</p>
          <p>{appointment.clinic.clinic_address}</p>
          <p>Start Time: {appointment.startTime}</p>
          <p>Doctor: {appointment.doctor.firstName} {appointment.doctor.lastName}</p>
          <p>Status: {appointment.appointment_status}</p>
          {appointment.appointment_status !== 'CANCELLED_BY_DOCTOR' &&
            appointment.appointment_status !== 'CANCELLED_BY_PATIENT' && (
              <button onClick={() => openModal(appointment)}>Cancelar</button>
            )}
          {appointment.appointment_status !== 'COMPLETED' &&
            appointment.appointment_status !== 'CONFIRMED' && (
              <button onClick={() => openModal(appointment)}>Confirmar</button>
            )}
        </div>
      ))}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal-container"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <h2>Confirmar acción</h2>
          {appointmentToHandle && (
            <p>{`¿Estás seguro de que deseas ${
              /* Mostrar un mensaje diferente según la acción */
              appointmentToHandle.appointment_status === 'CANCELLED_BY_DOCTOR'
                ? 'cancelar esta cita?'
                : 'aprobar esta cita?'
            }`}</p>
          )}
          <button onClick={() => handleAppointment(appointmentToHandle, 'CANCELLED_BY_DOCTOR')}>Sí, Cancelar</button>
          <button onClick={() => handleAppointment(appointmentToHandle, 'CONFIRMED')}>Aprobar</button>
          <button onClick={closeModal}>No modificar</button>
        </div>
      </Modal>
    </div>
  );
};

export default ClinicAppointments;
