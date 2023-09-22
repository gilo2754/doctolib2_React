import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; // Importa react-modal
import Clinic from '../clinic/Clinic';
import Appointment from './appointment';
import './MyAppointmentsList.css';

const MyAppointmentsList: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState<Appointment | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/v1/appointment');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const openModal = (appointment: Appointment) => {
    setAppointmentToCancel(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCancel = async () => {
    if (appointmentToCancel) {
      try {
        const modifiedAppointment: Partial<Appointment> = {
          appointment_id: appointmentToCancel.appointment_id,
          appointment_status: "CANCELLED_BY_PATIENT",
          clinic: { clinic_id: appointmentToCancel.clinic.clinic_id },
          // TODO: Obtén el ID del usuario del paciente de alguna manera (puede ser a través de la autenticación)
          patient: { user_id: 1 },
          doctor: { user_id: appointmentToCancel.doctor.user_id },
          endTime: appointmentToCancel.endTime,
          startTime: appointmentToCancel.startTime,
        };

        const response = await axios.put(
          "http://localhost:8081/api/v1/appointment/update",
          modifiedAppointment
        );

        console.log("Appointment was changed:", response.data);
        closeModal();
        // Refresh the list of appointments after cancellation
        fetchAppointments();
      } catch (error) {
        console.error("Error changing values of appointment:", error);
      }
    }
  };

  return (
    <div>
      <h1>Mis próximas citas</h1>
      <ul>
        {appointments.map(appointment => (
          <li key={appointment.appointment_id}>
            <p>Appointment ID: {appointment.appointment_id}</p>
            <p>Clinic: {appointment.clinic.clinic_id}</p>
            <p>Start Time: {appointment.startTime}</p>
            <p>End Time: {appointment.endTime}</p>
            <p>Status: {appointment.appointment_status}</p>
            {appointment.appointment_status !== "CANCELLED_BY_DOCTOR" && appointment.appointment_status !== "CANCELLED_BY_PATIENT" && (
              <button onClick={() => openModal(appointment)}>Cancel</button>
            )}
          </li>
        ))}
      </ul>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal-container"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <h2>Confirmar cancelación</h2>
          <p>¿Estás seguro de que deseas cancelar esta cita?</p>
          <button onClick={handleCancel}>Sí, Cancelar</button>
          <button onClick={closeModal}>Conservar cita</button>
        </div>
      </Modal>
    </div>
  );
};

export default MyAppointmentsList;
