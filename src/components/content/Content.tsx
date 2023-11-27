import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';
import DoctorAppointments from '../admin-clinic/DoctorAppointments';
import CreateAppointment from '../appointments/CreateAppointment';
import ClinicList from '../clinic/ClinicList';
import UserInfo from '../user/UserInfo';
import Login from '../user/Login';
import RegisterPatient from '../user/RegisterPatient';
import RegisterDoctor from '../user/RegisterDoctor';
import UserAppointments from '../appointments/UserAppointments';
import ForgotPassword from '../Auth/ForgotPassword';
import ClinicRegistration from '../clinic/ClinicRegistration';
import MyClinicsDoctor from '../clinic/MyClinicsDoctor';

function ServerDown() {
  return (
    <div>
      <h2>Lo sentimos, el servidor no está funcionando en este momento.</h2>
      <p>Por favor, inténtalo de nuevo más tarde.</p>
    </div>
  );
}

const Content: React.FC = () => {
  const [serverStatus, setServerStatus] = useState('checking');
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios.get('http://localhost:8081/admin/api/v1/server/status')
      .then((response) => {
        if (response.status === 200) {
          setServerStatus('up'); // El servidor está en funcionamiento
        } else {
          setServerStatus('down'); // El servidor está inactivo o devolvió un estado no válido
        }
      })
      .catch((error) => {
        setServerStatus('down'); // Error al conectar al servidor
      });
  }, []);

  if (serverStatus === 'checking') {
    return <div>Cargando...</div>;
  } else if (serverStatus === 'down') {
    return <ServerDown />;
  }

  return (
    <div className="content">
      <div className="centered-content">
      <Routes>
      {isLoggedIn ? (
        <>
          <Route path="/" element={<ClinicList />} />
//        <Route path="/appointments" element={<UserAppointments />} />
          <Route path="/account" element={<UserInfo />} />
          <Route path="/create-appointment/:selectedDate" element={<CreateAppointment clinicIdFromClinic={0} doctors={[]} />} />
          <Route path="/clinic-appointments" element={<DoctorAppointments />} />
          <Route path="/admin-clinic" element={<MyClinicsDoctor />} />

            </>
      ) : (
        <>

          <Route path="/login" element={<Login />} />
          <Route path="/register/patient" element={<RegisterPatient />} />
          <Route path="/register/doctor" element={<RegisterDoctor />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

                </>

          )}
    </Routes>
      </div>
    </div>
  );
}

export default Content;
