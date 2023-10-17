import React, { useState, useEffect } from "react";
import axios from "axios";
import { IAppointmentWithoutDetails } from "./interfaces/IAppointmentWithoutDetails";
import { useAuth } from '../Auth/AuthContext';
import Swal from "sweetalert2";
import { successMessageCreateAppointment, errorMessageCreateAppointment } from "../../notifications/messages";

interface CreateAppointmentProps {
  clinicIdFromClinic: number; // Define the clinicId prop
}
const CreateAppointment: React.FC<CreateAppointmentProps> = ({ clinicIdFromClinic }) => {
  const [startTime, setStartTime] = useState<Date | null>(new Date('2023-10-17T18:06:00.000Z'));
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [clinicId, setClinicId] = useState<number>();
  const [patientId, setPatientId] = useState<number>();
  const [doctorId, setDoctorId] = useState<number>(1);
  const { userInfo, isLoggedIn } = useAuth();

  const duration = 15; //In minutes

  useEffect(() => {
    if (startTime) {
      const endTimeDate = new Date(startTime);
      endTimeDate.setMinutes(endTimeDate.getMinutes() + duration);
      setEndTime(endTimeDate);
    }

    if (clinicIdFromClinic) { setClinicId(clinicIdFromClinic) }
    
  }, [startTime, duration]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Creating an appointment for clinic ${clinicIdFromClinic}`);

    if (!startTime || !endTime) {
      console.error("Start time or end time is not valid.");
      return;
    }

    if (isLoggedIn) {
      const newAppointment: IAppointmentWithoutDetails = {
        appointment_status: "PENDING",
        clinic: {
          clinic_id: clinicId,
        },
        doctor: { user_id: doctorId },
        patient: userInfo ? { user_id: userInfo.user_id } : 1,
        startTime: startTime.toISOString(), // Convierte a cadena ISO8601
        endTime: endTime.toISOString(), // Convierte a cadena ISO8601
      };

      try {
        console.log(newAppointment);
        const response = await axios.post(
          "http://localhost:8081/api/v1/appointment/create",
          newAppointment
        );
        console.log("Appointment created:", response.data);

        Swal.fire({
          icon: 'success',
          ...successMessageCreateAppointment,
        });
        
      } catch (error) {
        console.error("Error creating appointment:", error);
        Swal.fire({
          icon: 'error',
          ...errorMessageCreateAppointment,
        });
      }
    }
  };

  return (
    <div>
      <h2>Creando cita para UsuarioID: {userInfo?.user_id}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Start Time:
          <input
            type="datetime-local"
            value={startTime ? startTime.toISOString().substring(0, 16) : ""}
            onChange={(e) => setStartTime(new Date(e.target.value))}
            required
            placeholder=""
          />
        </label>
        <br />
        {/* <label>
          End Time:
          <input
            type="datetime-local"
            value={endTime ? endTime.toISOString().substring(0, 16) : ""}
            onChange={(e) => setEndTime(new Date(e.target.value))}
            required
          />
        </label>
  <br />*/}
        <button type="submit">Create Appointment</button>
      </form>
    </div>
  );
};

export default CreateAppointment;
