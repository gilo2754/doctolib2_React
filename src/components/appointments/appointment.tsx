import { Key } from "react";

interface Appointment {
    appointment_id: number;
    appointment_status: string;
    clinic: Clinic;
    patient: User;
    doctor: User;
    startTime: string;
    endTime: string;
  }

  interface Clinic {
    clinic_id: number;
  }
  
  interface User {
    user_id: number;
  }

  export default Appointment;