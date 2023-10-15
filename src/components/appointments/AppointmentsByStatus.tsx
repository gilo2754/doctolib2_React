import React from 'react';
import { IAppointmentWithoutDetails } from './interfaces/IAppointmentWithoutDetails';

interface AppointmentsByStatusProps {
  status: string;
  appointments?: IAppointmentWithoutDetails[]; // Ahora es opcional
}

const AppointmentsByStatus: React.FC<AppointmentsByStatusProps> = ({ appointments = [], status }) => {
  // Filtra los appointments por estado
  const filteredAppointments = appointments.filter(appointment => appointment.appointment_status === status);

  return (
    <div>
      <h2>Appointments with status: {status}</h2>
      {filteredAppointments.length === 0 ? (
          <p>No hay citas disponibles</p>
          ) : (
        <ul>
          {filteredAppointments.map(appointment => (
            <li key={appointment.appointment_id}>
              <p>Appointment ID: {appointment.appointment_id}</p>             
              <p>Status: {appointment. appointment_status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppointmentsByStatus;
