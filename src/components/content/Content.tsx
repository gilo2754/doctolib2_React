import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ClinicAppointments from '../admin-clinic/ClinicAppointments';
import CreateAppointment from '../appointments/CreateAppointment';
import MyAppointmentList from '../appointments/MyAppointmentList';
import ClinicList from '../clinic/ClinicList';
import Account from '../user/Account';
import Login from '../user/Login';

function Content() {
  return (
    <div className="content">
      <div className="centered-content">
        <Routes>
          <Route path="/" element={<ClinicList />} />
          <Route path="/appointments" element={<MyAppointmentList />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-appointment/:selectedDate" element={<CreateAppointment />}/>
          <Route path="/clinic-appointments" element={<ClinicAppointments />} />           
        </Routes>
      </div>
    </div>
  );
}

export default Content;
