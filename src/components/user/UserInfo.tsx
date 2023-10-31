import React, { FormEvent, useState } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { User } from '../appointments/interfaces/IAppointment';
import ClinicRegistration from '../clinic/ClinicRegistration';
import axios from 'axios';
import './UserInfo.css';
import Swal from 'sweetalert2';
import { errorMessage, successMessage, successMessageRegisterUser } from '../../notifications/messages';

const UserInfo: React.FC = () => {
  const { userInfo: userInfoFromContext, userRoles } = useAuth();
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
        const response = await axios.put('http://localhost:8081/api/v1/person/update', editedUserInfo);
  
        Swal.fire({
          icon: 'success',
          ...successMessage,
        });
        
        if (response.status === 200) {
          // Actualización exitosa, puedes realizar acciones adicionales si es necesario
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
    <div>
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
              <input
                type="text"
                value={isEditing ? editedUserInfo?.username : userInfoFromContext.username}
                onChange={(e) => handleInputChange(e, 'username')}
                placeholder='Nombre de usuario'
                className="form-control"
              />
            </div>

            <div className="mb-3">
            <input
              type="text"
              value={isEditing ? editedUserInfo?.firstName : userInfoFromContext.firstName}
              onChange={(e) => handleInputChange(e, 'firstName')}
              className="form-control"
              /> 
             </div>              

            <div className="mb-3">
            <input
              type="text"
              value={isEditing ? editedUserInfo?.lastName : userInfoFromContext.lastName}
              onChange={(e) => handleInputChange(e, 'lastName')}
              className="form-control"
              />
             </div>

            <div className="mb-3">
              <input
                type="email"
                value={isEditing ? editedUserInfo?.email : userInfoFromContext.email}
                onChange={(e) => handleInputChange(e, 'email')}
                required
                placeholder="E-Mail"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={isEditing ? editedUserInfo?.phoneNumber : userInfoFromContext.phoneNumber}
                onChange={(e) => handleInputChange(e, 'phoneNumber')}
                placeholder="phoneNumber"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="text" 
                value={isEditing ? editedUserInfo?.social_number : userInfoFromContext.social_number}
                onChange={(e) => handleInputChange(e, 'social_number')}
                className="form-control"
                placeholder="Numero social"

              />
            </div>
            <div className="mb-3">
              <input
                type="date"
                value={isEditing ? editedUserInfo?.dateOfBirth : userInfoFromContext.dateOfBirth}
                onChange={(e) => handleInputChange(e, 'dateOfBirth')}
                className="form-control"
              />
            </div>

            {isEditing ? (
              <div>
                <button className="btn btn-success"onClick={handleSaveClick}>Guardar</button>
                <button className="btn btn-danger ms-5" onClick={handleCancelClick}>Cancelar</button>
              </div>
            ) : (
              <button className="btn btn-primary" onClick={handleEditClick}>Editar(FIXME)</button>
            )}
          </form>
        </div>
      ) : (
        <p>Cargando información de la cuenta... ¿Ya iniciaste sesión?</p>
      )}
      <hr />
      {userRoles.includes('ROLE_DOCTOR') && 
             <div>
             <ClinicRegistration />
       
             </div>}

    </div>
  );
};

export default UserInfo;
