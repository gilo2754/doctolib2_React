// Content.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateAppointment from '../appointments/CreateAppointment';
import MyAppointmentList from '../appointments/MyAppointmentList';
import ClinicList from '../clinic/ClinicList';
import Account from '../user/Account';

function Content() {
  return (
    <div className="content">
      <div className="centered-content">
        <Routes>
          <Route path="/" element={<ClinicList />} />
          <Route path="/appointments" element={<MyAppointmentList />} />
          <Route path="/account" element={<Account />} />
          <Route path="/create-appointment/:date" element={<CreateAppointment />} />
        </Routes>
      </div>
    </div>
  );
}

export default Content;
