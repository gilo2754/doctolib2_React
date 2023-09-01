import React, { useState } from "react";
import "./AvailableAppointments.css";
import { Link } from "react-router-dom";

interface AppointmentFormProps {
  onSubmit: (startTime: Date) => void;
}

const AvailableAppointments: React.FC<AppointmentFormProps> = ({ onSubmit }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    console.log(date)
  };
  // Placeholder citas disponibles (puedes reemplazar con tus propias fechas)
  const availableAppointments = [
    "Lunes 4 de septiembre 2023 - 10:00 AM",
    "Martes 5 de septiembre 2023 - 2:00 PM",
    "Miércoles 6 de septiembre 2023 - 11:30 AM",
    "Jueves 7 de septiembre 2023 - 4:00 PM",
    "Viernes 8 de septiembre 2023 - 9:00 AM",
  ];

const datePlaceholder = "2023-03-18T10:00:00";
const timePlaceholder = "10:00:00";

  return (
    <div>
      <div style={{ marginLeft: "20px" }}>
        <h3>Citas disponibles:</h3>
        {availableAppointments.length === 0 ? (
          <p>No hay citas disponibles</p>
        ) : (
          <ul>
            {availableAppointments.map((appointment, index) => (
              <li  key={appointment.id}><button class="small-button" key={index} onClick={() => handleDateClick(appointment)}>
                <Link to={`/create-appointment/${datePlaceholder}`}>
              {datePlaceholder} 
            </Link>
                </button></li>
                 ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AvailableAppointments;
