
const appointmentsTestData = [
  {
    appointment_status: 'AVAILABLE',
    clinic: {
      clinic_id: 1,
    },
    patient: {
      user_id: 1,
    },
    doctor: {
      user_id: 1,
    },
    endTime: '2023-03-18T11:33:00',
    startTime: '2023-03-18T10:00:00',
  },
  {
    appointment_status: 'PENDING',
    clinic: {
      clinic_id: 2,
    },
    patient: {
      user_id: 2,
    },
    doctor: {
      user_id: 2,
    },
    endTime: '2023-03-18T12:30:00',
    startTime: '2023-03-18T11:00:00',
  },
  {
    appointment_status: 'CANCELLED_BY_PATIENT',
    clinic: {
      clinic_id: 3,
    },
    patient: {
      user_id: 3,
    },
    doctor: {
      user_id: 3,
    },
    endTime: '2023-03-18T15:45:00',
    startTime: '2023-03-18T14:15:00',
  },
  {
    appointment_status: 'CONFIRMED',
    clinic: {
      clinic_id: 4,
    },
    patient: {
      user_id: 4,
    },
    doctor: {
      user_id: 4,
    },
    endTime: '2023-03-18T17:30:00',
    startTime: '2023-03-18T16:00:00',
  },
  {
    appointment_status: 'CANCELLED_BY_DOCTOR',
    clinic: {
      clinic_id: 5,
    },
    patient: {
      user_id: 5,
    },
    doctor: {
      user_id: 5,
    },
    endTime: '2023-03-18T19:00:00',
    startTime: '2023-03-18T18:30:00',
  },
];

export default appointmentsTestData;
