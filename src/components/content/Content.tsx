import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import ClinicAppointments from '../admin-clinic/ClinicAppointments';
import CreateAppointment from '../appointments/CreateAppointment';
import MyAppointmentList from '../appointments/MyAppointmentList';
import ClinicList from '../clinic/ClinicList';
import UserInfo from '../user/UserInfo';
import Login from '../user/Login';
import RegisterPatient from '../user/RegisterPatient';
import RegisterDoctor from '../user/RegisterDoctor';
import axios from 'axios';

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
  useEffect(() => {
    // Realiza una solicitud al servidor para verificar su estado
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
    // Mostrar un mensaje de carga mientras se verifica el estado del servidor
    return <div>Cargando...</div>;
  } else if (serverStatus === 'down') {
    // Si el servidor está inactivo o se produjo un error al conectar, muestra el mensaje de disculpas
    return <ServerDown />;
  }

  return (
    <div className="content">
      <div className="centered-content">
        <Routes>
          <Route path="/" element={<ClinicList />} />
          <Route path="/appointments" element={<MyAppointmentList />} />
          <Route path="/account" element={<UserInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/patient" element={<RegisterPatient />} />
          <Route path="/register/doctor" element={<RegisterDoctor />} />

          <Route path="/create-appointment/:selectedDate" element={<CreateAppointment />}/>
          <Route path="/clinic-appointments" element={<ClinicAppointments />} />           
        </Routes>
      </div>
    </div>
  );
}

export default Content;
