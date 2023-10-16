import { Card, CardContent, Typography } from "@mui/material";
import { Clinic } from "../../App";
import "./clinic.css";
import { useState, useEffect } from "react";
import CreateAppointment from "../appointments/CreateAppointment";
import { IAppointmentWithoutDetails } from "../appointments/interfaces/IAppointmentWithoutDetails";

interface Props {
  clinic: Clinic;
}

const ClinicItem: React.FC<Props> = ({ clinic }: Props) => {
  const [appointments, setAppointments] = useState<IAppointmentWithoutDetails[] | null>([]);

  useEffect(() => {
    // Agregar dos appointments al estado 'appointments'
    /*
    const newAppointments = [
      {
        // Datos del primer appointment
        appointment_status: "AVAILABLE",
        clinic: { clinic_id: 1 },
        patient: { user_id: 1 },
        doctor: { user_id: 1 },
        endTime: "2023-03-18T12:00:00",
        startTime: "2023-03-18T11:30:00",
      },
      {
        // Datos del segundo appointment
        appointment_status: "CANCELLED_BY_DOCTOR",
        clinic: { clinic_id: 2 },
        patient: { user_id: 2 },
        doctor: { user_id: 2 },
        endTime: "2023-03-18T14:00:00",
        startTime: "2023-03-18T13:30:00",
      },
    ];

    setAppointments([...appointments, ...newAppointments]);
    */
  }, []); // Dependencias vacías para que se ejecute solo una vez

  return (
    <div>
      <Card variant="outlined">
        <CardContent>
          <div className="box">
            <Typography variant="h6">{clinic.clinic_name}</Typography>
            <Typography variant="body1">{clinic.clinic_description}</Typography>
            <Typography variant="body2">Address: {clinic.clinic_address}</Typography>
            <Typography variant="body2">Phone: {clinic.clinic_phone_number}</Typography>
            <Typography variant="body2">Speciality: {clinic.speciality}</Typography>
            <Typography variant="body2">Opening Time: {clinic.openingTime}</Typography>
            <Typography variant="body2">Closing Time: {clinic.closingTime}</Typography>
          </div>
          {/* 
          <div className="box">
            <AppointmentsByStatus appointments={appointments} status="AVAILABLE" />
            TODO: show availableAppointments for this clinic
          </div>  */}
          
          <CreateAppointment />
        </CardContent>
      </Card>
    </div>
  );
};

export default ClinicItem;
