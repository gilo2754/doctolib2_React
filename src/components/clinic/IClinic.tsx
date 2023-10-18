import { User } from "../appointments/interfaces/IAppointment";

export interface Clinic {
  clinic_id?: number;
  clinic_name: string | null;
  clinic_description: string;
  clinic_address: string | null;
  clinic_phone_number: string;
  clinic_state: string;
  speciality?: string;
  openingTime: string | null;
  closingTime: string | null;
  doctors: User[];
}