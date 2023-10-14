export interface AppointmentToCreate {
    appointment_status: string;
    clinic: {
      clinic_id: number;
    };
    patient: {
      user_id: number;
    };
    doctor: {
      user_id: number;
    };
    endTime: string;
    startTime: string;
  }
  