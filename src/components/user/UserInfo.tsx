import React, { useState } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { User } from '../appointments/interfaces/IAppointment';

const UserInfo: React.FC = () => {
  const { userInfo: userInfoFromContext } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState<User | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof User) => {
    const updatedEditedUser = { ...editedUserInfo, [field]: event.target.value };
    setEditedUserInfo(updatedEditedUser);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedUserInfo(userInfoFromContext);
  };

  const handleSaveClick = () => {
    // Realiza una solicitud para guardar los cambios en el servidor, si es necesario
    // Actualiza el estado de userInfo con los valores editados
    // Aquí puedes agregar la lógica para guardar los cambios en la API

    if (editedUserInfo) {
      // Copia las modificaciones de editedUserInfo a userInfo
      Object.assign(userInfoFromContext, editedUserInfo);
    }

    setIsEditing(false);
  };

  const handleCancelClick = () => {
    // Cancela la edición y restaura los valores originales
    setIsEditing(false);
    setEditedUserInfo(null); // Restablece editedUserInfo a null
  };

  return (
    <div>
      <h2>Información de mi cuenta</h2>
      {userInfoFromContext ? (
        <div>
          <form>
            <label>ID de usuario: {userInfoFromContext.user_id} </label>
            <br />

            <input
              type="text"
              value={isEditing ? editedUserInfo?.username : userInfoFromContext.username}
              onChange={(e) => handleInputChange(e, 'username')}
              placeholder='Nombre de usuario'
            />
            <br />

            <input
              type="text"
              value={isEditing ? editedUserInfo?.firstName : userInfoFromContext.firstName}
              onChange={(e) => handleInputChange(e, 'firstName')}
            /> <br />

            <input
              type="text"
              value={isEditing ? editedUserInfo?.lastName : userInfoFromContext.lastName}
              onChange={(e) => handleInputChange(e, 'lastName')}
            />
            <br />

            <input
              type="email"
              value={isEditing ? editedUserInfo?.email : userInfoFromContext.email}
              onChange={(e) => handleInputChange(e, 'email')}
              required
              placeholder="E-Mail"
            />
            <br />
            <input
              type="text"
              value={isEditing ? editedUserInfo?.phoneNumber : userInfoFromContext.phoneNumber}
              onChange={(e) => handleInputChange(e, 'phoneNumber')}
                            placeholder="phoneNumber"

            />
            <br />
            <input type="text" 
              value={isEditing ? editedUserInfo?.social_number : userInfoFromContext.social_number}
              onChange={(e) => handleInputChange(e, 'social_number')} />
            <br />
            <input   type="date"
            value={isEditing ? editedUserInfo?.dateOfBirth : userInfoFromContext.dateOfBirth}
            onChange={(e) => handleInputChange(e, 'dateOfBirth')}
            />
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
        <p>Cargando información de la cuenta... ¿Ya iniciaste sesión?</p>
      )}
    </div>
  );
};

export default UserInfo;
