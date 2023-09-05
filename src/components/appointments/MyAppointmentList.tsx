import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Clinic from '../clinic/Clinic';

// Interface for Appointment
interface Appointment {
  appointment_id: number;
  clinic: string; // Assuming you have a Clinic interface defined
  patient: string; // Assuming you have a Patient interface defined
  doctor: string; // Assuming you have a Doctor interface defined
  startTime: string; // Use string or Date type based on API response
  endTime: string; // Use string or Date type based on API response
  appointment_status: string;
}

const MyAppointmentsList: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

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

  return (
    <div>
      <h1>Appointments List</h1>
      <ul>
        {appointments.map(appointment => (
          <li key={appointment.appointment_id}>
            <p>Appointment ID: {appointment.appointment_id}</p>
            <p>Start Time: {appointment.startTime}</p>
            <p>End Time: {appointment.endTime}</p>
            <p>Status: {appointment.appointment_status}</p>
            {/* Render other appointment details here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyAppointmentsList;
