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
    clinic_name: string;
    clinic_address: string;
  }
  
  interface User {
    user_id: number;
    firstName: string;
    lastName: string;
  }

  export default Appointment;