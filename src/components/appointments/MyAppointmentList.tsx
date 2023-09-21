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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const modifiedAppointment: Appointment = {
      ...appointment, appointment_status: "CANCELLED"
    };

    try {
      const response = await axios.post(
        "http://localhost:8081/api/v1/appointment/modify",
        modifiedAppointment
      );
      console.log("Appointment was changed:", response.data);
    } catch (error) {
      console.error("Error changing values of appointment:", error);
    }
  };

  return (
    <div>
      <h1>Mis próximas citas</h1>
      <ul>
        {appointments.map(appointment => (
        <form onSubmit={handleSubmit(appointment)}>

          <li key={appointment.appointment_id}>
            <p>Appointment ID: {appointment.appointment_id}</p>
            <p>Clinic: "appointment.clinic/To be defined"</p>
            <p>Start Time: {appointment.startTime}</p>
            <p>End Time: {appointment.endTime}</p>
            <p>Status: {appointment.appointment_status}</p>
            <button type="submit">Cancel</button>
          </li>
          </form>

        ))}
      </ul>
    </div>
  );
};

export default MyAppointmentsList;
