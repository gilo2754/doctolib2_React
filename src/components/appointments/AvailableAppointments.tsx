import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./AvailableAppointments.css";
import { Link } from "react-router-dom";

interface AppointmentFormProps {
  onDateClick: (selectedDate: Date) => void;
}

const AvailableAppointments: React.FC<AppointmentFormProps> = ({ onDateClick }) => {
  const [selectedDate, setSelectedDate] = useState<string | Date | null>(null);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [clinicId, setClinicId] = useState<number>(1);
  const [patientId, setPatientId] = useState<number>(1);
  const [doctorId, setDoctorId] = useState<number>(4);

  const { selectedDate: routeSelectedDate } = useParams();

  useEffect(() => {
    if (routeSelectedDate) {
      setStartTime(routeSelectedDate);

      const startTimeDate = new Date(routeSelectedDate);
      startTimeDate.setMinutes(startTimeDate.getMinutes() + 30);
      setEndTime(startTimeDate.toISOString().substring(0, 16));
    }
  }, [routeSelectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startTime || !endTime) {
      console.error("Start time or end time is not valid.");
      return;
    }

    const newAppointment = {
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

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onDateClick(date);
  };

  const availableAppointments = [
    "Lunes 4 de septiembre 2023 - 10:00 AM",
    "Martes 5 de septiembre 2023 - 2:00 PM",
    "Miércoles 6 de septiembre 2023 - 11:30 AM",
    "Jueves 7 de septiembre 2023 - 4:00 PM",
    "Viernes 8 de septiembre 2023 - 9:00 AM",
  ];

  const datePlaceholder = "2023-03-18T10:30:00";

  return (
    <div>
      <div style={{ marginLeft: "20px" }}>
        <h3>Citas disponibles:</h3>
        {availableAppointments.length === 0 ? (
          <p>No hay citas disponibles</p>
        ) : (
          <ul>
            {availableAppointments.map((appointment, index) => (
              <li key={index}>
                <button
                  className="small-button"
                  onClick={() => handleDateClick(new Date(appointment))}
                >
                  <Link to={`/create-appointment/${datePlaceholder}`}>
                    {datePlaceholder}
                  </Link>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AvailableAppointments;
