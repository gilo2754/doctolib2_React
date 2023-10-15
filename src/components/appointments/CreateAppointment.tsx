import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IAppointmentWithoutDetails } from "./interfaces/IAppointmentWithoutDetails";
import { useAuth } from '../Auth/AuthContext';


const CreateAppointment: React.FC = () => {
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [clinicId, setClinicId] = useState<number>();
  const [patientId, setPatientId] = useState<number>();
  const [doctorId, setDoctorId] = useState<number>(3);
  const { userInfo, isLoggedIn } = useAuth();

  const { selectedDate } = useParams();

 


  useEffect(() => {

    if (selectedDate) {
      // Mantén la fecha en el formato que recibes de la API
      setStartTime(selectedDate);

      // Calcula endTime agregando 30 minutos a startTime
      const startTimeDate = new Date(selectedDate);
      startTimeDate.setMinutes(startTimeDate.getMinutes() + 30);
      setEndTime(startTimeDate.toISOString().substring(0, 16));
    }
  }, [selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startTime || !endTime) {
      console.error("Start time or end time is not valid.");
      return;
    }
if(isLoggedIn){
    const newAppointment: IAppointmentWithoutDetails = {
      appointment_status: "PENDING",
      clinic: {
        clinic_id: clinicId 
      },  
      doctor: {user_id: doctorId},
      patient: userInfo ? { user_id: userInfo.user_id } : 1,
      startTime,
      endTime,
    };
    
    
    try {
      console.log(newAppointment)
      const response = await axios.post(
        "http://localhost:8081/api/v1/appointment/create",
        newAppointment
      );
      console.log("Appointment created:", response.data);
    } catch (error) {
      console.error("Error creating appointment:", error);
  }
}
  };

  return (
    <div>
      <h2>Create Appointment for {userInfo?.user_id}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Start Time:
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          End Time:
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Create Appointment. TODO: getting the correct values?</button>
      </form>
    </div>
  );
};

export default CreateAppointment;
