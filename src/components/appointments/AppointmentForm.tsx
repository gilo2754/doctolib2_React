import React, { useState } from "react";
import "./appointmentForm.css";

interface AppointmentFormProps {
  onSubmit: (startTime: Date) => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
/*
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = event.target.value;
    const date = new Date(inputDate);
    setSelectedDate(date);
    console.log("Selected date:", date);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputTime = event.target.value;
    const [hours, minutes] = inputTime.split(":");
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setHours(parseInt(hours, 10));
      newDate.setMinutes(parseInt(minutes, 10));
      setSelectedDate(newDate);
      console.log("Selected time:", newDate);
    }
  };

  const handleSubmit = () => {
    if (selectedDate) {
      onSubmit(selectedDate);
      console.log("Form submitted with date:", selectedDate);
    }
  };
*/
  // Placeholder citas disponibles (puedes reemplazar con tus propias fechas)
  const availableAppointments = [
    "Lunes 4 de septiembre 2023 - 10:00 AM",
    "Martes 5 de septiembre 2023 - 2:00 PM",
    "Miércoles 6 de septiembre 2023 - 11:30 AM",
    "Jueves 7 de septiembre 2023 - 4:00 PM",
    "Viernes 8 de septiembre 2023 - 9:00 AM",
  ];

  return (
    <div>
      {/*
      <h2>Definir fecha y hora de la cita médica:</h2>
      <label>
        Fecha:
        <input
          type="date"
          value={selectedDate ? selectedDate.toISOString().substr(0, 10) : ""}
          onChange={handleDateChange}
        />
      </label>
      <label>
        Hora de inicio:
        <input
          type="time"
          value={selectedDate ? selectedDate.toISOString().substr(11, 5) : ""}
          onChange={handleTimeChange}
        />
      </label>
      <br />
      */}

      <div style={{ marginLeft: "20px" }}>
        <h3>Citas disponibles:</h3>
        {availableAppointments.length === 0 ? (
          <p>No hay citas disponibles</p>
        ) : (
          <ul>
            {availableAppointments.map((appointment, index) => (
              <li><button class="small-button" key={index} onClick={() => setSelectedDate(new Date(appointment))}>
                {appointment}
                </button></li>
                 ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AppointmentForm;
