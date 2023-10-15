/*
 This interface gone be used to modify 
 following Attributes from Appointments:
Status, Patient(By Id), Doctor(By Id), Clinic(By Id) Start/End Time.

 */
export interface IAppointmentWithoutDetails {
  appointment_id?: number;
    appointment_status: string;
    clinic: {
      clinic_id: number;
    };
    patient?: {
      user_id: number;
    };
    doctor?: {
      user_id: number;
    };
    startTime: string;
    endTime: string;
  }
  