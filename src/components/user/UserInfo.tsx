import React, { FormEvent, useState } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { User } from '../appointments/interfaces/IAppointment';
import axios from 'axios';
import './UserInfo.css';
import '../style-common/stylesCommon.css';

import Swal from 'sweetalert2';
import { errorMessage, successMessage } from '../../notifications/messages';

const UserInfo: React.FC = () => {
  const { userInfo: userInfoFromContext, userRoles, setUserInfo } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState<User>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null); // Nuevo estado para la imagen de perfil

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof User) => {
    const updatedEditedUser = { ...editedUserInfo, [field]: event.target.value };
    setEditedUserInfo(updatedEditedUser);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    //TODO
    setEditedUserInfo(userInfoFromContext);
  };

  const handleSaveClick = async (e: FormEvent) => {
    e.preventDefault();
  
    // Verifica si editedUserInfo no es nulo
    if (editedUserInfo) {
      try {
        console.log(editedUserInfo);
        // Realiza una solicitud PUT a la API para actualizar los datos del usuario
        const response = await axios.put(`http://localhost:8081/api/v1/person/update`, editedUserInfo);
  
        Swal.fire({
          icon: 'success',
          ...successMessage,
        });
        
        if (response.status === 200) {
          // Actualización exitosa, puedes realizar acciones adicionales si es necesario
          setUserInfo(response?.data);
          setIsEditing(false);
          console.log('Datos del usuario actualizados correctamente');
        } else {
          // Maneja cualquier otro caso según tus necesidades
          console.error('Error al actualizar los datos del usuario');
        }
      } catch (error) {
        // Maneja errores de la solicitud, por ejemplo, problemas de red o errores en la API
        console.error('Error en la solicitud de actualización:', error);
        Swal.fire({
          icon: 'error',
          ...errorMessage,
        });
      }
    }
  
    setIsEditing(false);
  };
  
  const handleCancelClick = () => {
    // Cancela la edición y restaura los valores originales
    setIsEditing(false);
    setEditedUserInfo(null); // Restablece editedUserInfo a null
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files[0];
    setProfileImage(selectedImage);
  };

  return (
    <div className="user-info-form">
      <h2>Información de mi cuenta</h2>
      {userInfoFromContext ? (
        <div>
          <form>
            <label>ID de usuario: {userInfoFromContext.user_id} </label>
            
            <div className="mb-3">
  <label htmlFor="imageUpload" className="profile-image-label">
    {profileImage ? (
      <img
        src={URL.createObjectURL(profileImage)}
        alt="Profile Image"
        className="profile-image"
      />
    ) : (
      <div className="profile-image-placeholder">Aquí va tu foto de perfil</div>
    )}
    <span className="change-photo-text">Cambiar foto</span>
  </label>
  <input
    type="file"
    accept="image/*"
    id="imageUpload"
    onChange={handleImageChange}
    className="visually-hidden"
  />
</div>

<div className="mb-3">
  <label htmlFor="username">Nombre de usuario</label>
  <input
    type="text"
    value={isEditing ? editedUserInfo?.username : userInfoFromContext.username}
    onChange={(e) => handleInputChange(e, 'username')}
    placeholder="Nombre de usuario"
    className={`mb-3 form-control `}
  />
</div>

<div className="mb-3">
  <label htmlFor="firstName">Nombre</label>
  <input
    type="text"
    value={isEditing ? editedUserInfo?.firstName : userInfoFromContext.firstName}
    onChange={(e) => handleInputChange(e, 'firstName')}
    className={`mb-3 form-control ${isEditing ? 'editing' : ''}`}
  />
</div>

<div className="mb-3">
  <label htmlFor="lastName">Apellido</label>
  <input
    type="text"
    value={isEditing ? editedUserInfo?.lastName : userInfoFromContext.lastName}
    onChange={(e) => handleInputChange(e, 'lastName')}
    className={`mb-3 form-control ${isEditing ? 'editing' : ''}`}
  />
</div>

<div className="mb-3">
  <label htmlFor="email">E-Mail</label>
  <input
    className={`mb-3 form-control ${isEditing ? 'editing' : ''}`}
    type="email"
    value={isEditing ? editedUserInfo?.email : userInfoFromContext.email}
    onChange={(e) => handleInputChange(e, 'email')}
    required
    placeholder="E-Mail"
  />
</div>

<div className="mb-3">
 <label htmlFor="phoneNumber">Número de teléfono</label>
  <input
    className={`mb-3 form-control ${isEditing ? 'editing' : ''}`}
    type="text"
    value={isEditing ? editedUserInfo?.phoneNumber : userInfoFromContext.phoneNumber}
    onChange={(e) => handleInputChange(e, 'phoneNumber')}
    placeholder="Número de teléfono"
  />
</div>

<div className="mb-3">
  <label htmlFor="socialNumber">Número social</label>
  <input
  className={`mb-3 form-control ${isEditing ? 'editing' : ''}`}
    type="text"
    value={isEditing ? editedUserInfo?.socialNumber : userInfoFromContext.socialNumber}
    onChange={(e) => handleInputChange(e, 'socialNumber')}
    placeholder="Número social"
    readOnly={!isEditing}
    />
</div>

<div className="mb-3">
  <label htmlFor="dateOfBirth">Fecha de nacimiento</label>
  <input
    type="date"
    value={isEditing ? editedUserInfo?.dateOfBirth : userInfoFromContext.dateOfBirth}
    onChange={(e) => handleInputChange(e, 'dateOfBirth')}
    className={`mb-3 form-control ${isEditing ? 'editing' : ''}`}
  />
</div>


            {isEditing ? (
              <div>
                <button className="btn btn-success"onClick={handleSaveClick}>Guardar</button>
                <button className="btn btn-danger ms-5" onClick={handleCancelClick}>Cancelar</button>
              </div>
            ) : (
              <button className="btn btn-primary" onClick={handleEditClick}>Editar</button>
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
