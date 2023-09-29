import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ClinicAppointments from '../admin-clinic/ClinicAppointments';
import CreateAppointment from '../appointments/CreateAppointment';
import MyAppointmentList from '../appointments/MyAppointmentList';
import ClinicList from '../clinic/ClinicList';
import UserInfo from '../user/UserInfo';
import Login from '../user/Login';
import Register from '../user/Register';

function Content() {
  return (
    <div className="content">
      <div className="centered-content">
        <Routes>
          <Route path="/" element={<ClinicList />} />
          <Route path="/appointments" element={<MyAppointmentList />} />
          <Route path="/account" element={<UserInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-appointment/:selectedDate" element={<CreateAppointment />}/>
          <Route path="/clinic-appointments" element={<ClinicAppointments />} />           
        </Routes>
      </div>
    </div>
  );
}

export default Content;
