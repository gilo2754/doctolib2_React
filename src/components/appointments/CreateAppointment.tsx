import React, { useState } from "react";
import axios from "axios";

interface Clinic {
  clinic_id: number;
}

interface User {
  user_id: number;
}

interface Appointment {
  appointment_status: string;
  clinic: Clinic;
  patient: User;
  doctor: User;
  startTime: string;
  endTime: string;
}

const CreateAppointment: React.FC = () => {
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [clinicId, setClinicId] = useState<number>(1);
  const [patientId, setPatientId] = useState<number>(1);
  const [doctorId, setDoctorId] = useState<number>(4);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newAppointment: Appointment = {
      appointment_status: "PENDING",
      clinic: { clinic_id: clinicId },
      patient: { user_id: patientId },
      doctor: { user_id: doctorId },
      startTime,
      endTime,
    };

    try {
      const response = await axios.post("http://localhost:8081/api/v1/appointment/add", newAppointment);
      console.log("Appointment created:", response.data);
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  return (
    <div>
      <h2>Create Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Start Time:
          <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
        </label>
        <br />
        <label>
          End Time:
          <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Create Appointment</button>
      </form>
    </div>
  );
};

export default CreateAppointment;
