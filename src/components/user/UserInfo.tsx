import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserInfoComponent from './UserInfo';

interface User {
  user_id: number;
  role: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  social_number: string;
}

const UserInfo: React.FC = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false); // Estado para rastrear si se está editando
  const [editedUserInfo, setEditedUserInfo] = useState<User | null>(null); // Estado para rastrear los cambios editados
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios.get('http://localhost:8081/api/v1/user-info', config)
        .then(response => {
          setUserInfo(response.data);
          setEditedUserInfo(response.data); // Inicializa los valores editados con los valores actuales
        })
        .catch(error => {
          console.error('Error al obtener la información del usuario:', error);
        });
    }
  }, [token]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof User) => {
    const updatedUser = { ...userInfo!, [field]: event.target.value };
    setUserInfo(updatedUser);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Realiza una solicitud para guardar los cambios en el servidor, si es necesario
    // Actualiza el estado de userInfo con los valores editados
        // Aquí puedes agregar la lógica para guardar los cambios en la API

    setUserInfo(editedUserInfo);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    // Cancela la edición y restaura los valores originales
    setIsEditing(false);
    setEditedUserInfo(userInfo);
  };


  return (
    <div>
      <h2>Información de mi cuenta</h2>
      {userInfo ? (
        <div>
          <form>
            <label>Nombre de usuario: </label>
            <input type="text" value={userInfo.username} onChange={(e) => handleInputChange(e, 'username')} />
            <br />

            <label>Nombre completo: </label>
            <input type="text" value={userInfo.firstName} onChange={(e) => handleInputChange(e, 'firstName')} />
            <input type="text" value={userInfo.lastName} onChange={(e) => handleInputChange(e, 'lastName')} />
            <br />

            <label>Email: </label>
            <input type="email" value={userInfo.email} onChange={(e) => handleInputChange(e, 'email')} />
            <br />

            <label>Número de teléfono: </label>
            <input type="tel" value={userInfo.phoneNumber} onChange={(e) => handleInputChange(e, 'phoneNumber')} />
            <br />

            <label>Fecha de nacimiento: </label>
            <input type="date" value={userInfo.dateOfBirth} onChange={(e) => handleInputChange(e, 'dateOfBirth')} />
            <br />

            <label>Número social: </label>
            <input type="text" value={userInfo.social_number} onChange={(e) => handleInputChange(e, 'social_number')} />
            <br />

            {isEditing ? (
            <div>
              <button onClick={handleSaveClick}>Guardar</button>
              <button onClick={handleCancelClick}>Cancelar</button>
            </div>
          ) : (
            <button onClick={handleEditClick}>Editar</button>
          )}          
          </form>
        </div>
      ) : (
        <p>Cargando información de la cuenta...
          Ya iniciaste sesion?
        </p>
      )}
    </div>
  );
};

export default UserInfo;
