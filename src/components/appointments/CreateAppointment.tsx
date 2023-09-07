import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
  startTime: Date;
  endTime: Date;
}

const CreateAppointment: React.FC = () => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [clinicId, setClinicId] = useState<number>(1);
  const [patientId, setPatientId] = useState<number>(1);
  const [doctorId, setDoctorId] = useState<number>(4);

  const { selectedDate } = useParams();

  useEffect(() => {
    if (selectedDate) {
      const parsedDate = new Date(selectedDate);
      if (!isNaN(parsedDate.getTime())) {
        setStartTime(parsedDate);

        // Calculate endTime by adding 30 minutes to startTime
        const calculatedEndTime = new Date(parsedDate.getTime() + 30 * 60 * 1000);
        setEndTime(calculatedEndTime);
      }
    }
  }, [selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startTime || !endTime) {
      console.error("Start time or end time is not valid.");
      return;
    }

    const newAppointment: Appointment = {
      appointment_status: "PENDING",
      clinic: { clinic_id: clinicId },
      patient: { user_id: patientId },
      doctor: { user_id: doctorId },
      startTime,
      endTime,
    };

    try {
      const response = await axios.post(
        "http://localhost:8081/api/v1/appointment/create",
        newAppointment
      );
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
          <input
            type="datetime-local"
            value={startTime?.toISOString().substring(0, 16) || ""}
            onChange={(e) =>
              setStartTime(new Date(e.target.value.replace("T", " ")))
            }
            required
          />
        </label>
        <br />
        <label>
          End Time:
          <input
            type="datetime-local"
            value={endTime?.toISOString().substring(0, 16) || ""}
            onChange={(e) =>
              setEndTime(new Date(e.target.value.replace("T", " ")))
            }
            required
          />
        </label>
        <br />
        <button type="submit">Create Appointment</button>
      </form>
    </div>
  );
};

export default CreateAppointment;
