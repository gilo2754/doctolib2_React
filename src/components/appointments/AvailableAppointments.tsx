import React, { useEffect, useState } from "react";
import "./style/availableAppointments.css";
import { IAppointmentWithoutDetails } from "./interfaces/IAppointmentWithoutDetails"; // Asegúrate de importar la interfaz
import axios from "axios";

interface AppointmentFormProps {
  onDateClick: (selectedDate: Date, selectedAppointment: IAppointmentWithoutDetails) => void;
}

const AvailableAppointments: React.FC<AppointmentFormProps> = ({ onDateClick }) => {
  const [selectedDate, setSelectedDate] = useState<string | Date | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<IAppointmentWithoutDetails | null>(null);
  const [availableAppointments, setAvailableAppointments] = useState<IAppointmentWithoutDetails[]>([]);

  useEffect(() => {
    // Fetch appointments from the API when the component mounts
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/v1/appointment");
        setAvailableAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);
/*
  const availableAppointments: AppointmentToCreate[] = [
    {
      appointment_status: "AVALIABLE",
      clinic: {
        clinic_id: 1,
      },
      patient: {
        user_id: 3,
      },
      doctor: {
        user_id: 2,
      },
      endTime: "2023-03-18T11:33:00",
      startTime: "2023-03-18T10:00:00",
    },
    {
      appointment_status: "AVALIABLE",
      clinic: {
        clinic_id: 1,
      },
      patient: {
        user_id: 3,
      },
      doctor: {
        user_id: 2,
      },
      endTime: "2025-03-18T11:33:00",
      startTime: "2025-03-18T10:00:00",
    }
    // Agrega más citas disponibles si es necesario
  ];
*/
  const handleDateClick = (date: Date, appointment: IAppointmentWithoutDetails) => {
    setSelectedDate(date);
    onDateClick(date, appointment);

  };
  const createAppointment = async () => {
    if (!selectedAppointment) {
      console.error("No appointment selected.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:8081/api/v1/appointment/create",
        selectedAppointment 
      );
      console.log("Appointment created:", response.data);
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

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
                  onClick={() => {
                    handleDateClick(new Date(appointment.startTime), appointment);
                  }}
                >
                  {appointment.startTime} - {appointment.endTime}
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


