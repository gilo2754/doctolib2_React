import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Auth/AuthContext";
import Modal from 'react-modal'; // Importa react-modal
import IAppointmentWithDetails from './interfaces/IAppointment';
import './style/myAppointmentsList.css';
import { IAppointmentWithoutDetails } from './interfaces/IAppointmentWithoutDetails';
import Swal from "sweetalert2";
import { errorMessageModifyAppointment, successMessageModifyAppointment } from "../../notifications/messages";

Modal.setAppElement('#root'); // Set the app element here

function UserAppointments() {
  const [appointments, setAppointments] = useState<IAppointmentWithDetails[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState<IAppointmentWithDetails | null>(null);
  const { userInfo } = useAuth();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/v1/appointment/person/${userInfo.user_id}`);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const openModal = (appointment: IAppointmentWithDetails) => {
    setAppointmentToCancel(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCancel = async () => {
    if (appointmentToCancel) {
      try {
        const modifiedAppointment: Partial<IAppointmentWithoutDetails> = {
          appointment_id: appointmentToCancel.appointment_id,
          appointment_status: "CANCELLED_BY_PATIENT",
          clinic: {clinic_id: appointmentToCancel.clinic.clinic_id},
          doctor: {user_id: appointmentToCancel.doctor.user_id},
          endTime: appointmentToCancel.endTime,
          startTime: appointmentToCancel.startTime,
        };
        closeModal();

        Swal.fire({
          icon: 'success',
          ...successMessageModifyAppointment,
        });
        const response = await axios.put(
          "http://localhost:8081/api/v1/appointment/update",
          modifiedAppointment
        );

        console.log("Appointment was changed:", response.data);
        // Refresh the list of appointments after cancellation
        fetchAppointments();
      } catch (error) {
        console.error("Error changing values of appointment:", error);
        Swal.fire({
          icon: 'error',
          ...errorMessageModifyAppointment,
        });
      }
    }
  };

  return (
    <div>
  <h1>Mis próximas citas. PATIENT (Broken because UserDTO</h1>
  {appointments.map(appointment => (
    <div key={appointment.appointment_id} className="appointment-box">
      <h2>Appointment ID: {appointment.appointment_id}</h2>
      <p>Clinic ID: {appointment.clinic.clinic_id}</p>
      <p>{appointment.clinic.clinic_name}</p>
      <p>{appointment.clinic.clinic_address}</p>
      <p>Start Time: {appointment.startTime}</p>
      <p>Doctor: {appointment.doctor.firstName} {appointment.doctor.lastName}</p>
      <p>Status: {appointment.appointment_status}</p>
      {appointment.appointment_status !== "CANCELLED_BY_DOCTOR" &&
        appointment.appointment_status !== "CANCELLED_BY_PATIENT" && (
          <button onClick={() => openModal(appointment)}>Cancel</button>
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
      <h2>Confirmar cancelación</h2>
      <p>¿Estás seguro de que deseas cancelar esta cita?</p>
      <button onClick={handleCancel}>Sí, Cancelar</button>
      <button onClick={closeModal}>Conservar cita</button>
    </div>
  </Modal>
</div>

  );
}

export default UserAppointments;
