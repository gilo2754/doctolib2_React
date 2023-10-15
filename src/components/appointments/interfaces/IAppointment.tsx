import { Key } from "react";

export interface IAppointmentWithDetails {
    appointment_id: number;
    appointment_status: string;
    clinic: Clinic;
    patient: User;
    doctor: User;
    startTime: string;
    endTime: string;
  }

export interface Clinic {
    clinic_id: number;
    clinic_name: string;
    clinic_address: string;
  }
  
  export interface User {
    user_id?: number;
    role?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    social_number?: string;
  }

  export default IAppointmentWithDetails;