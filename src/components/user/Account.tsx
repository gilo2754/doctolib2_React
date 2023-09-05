import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

const Account: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    /*
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/v1/me');
        setUser(response.data || null);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      }
    };

    fetchUser();
    */
    // Simulamos la llamada a la API utilizando placeholders temporales
    const mockApiResponse = {
      user_id: 1,
      role: 'PATIENT',
      username: 'calipa',
      firstName: 'CalinPatient',
      lastName: 'Menji',
      email: 'mail@asd.de',
      phoneNumber: '45678932',
      dateOfBirth: '1990-01-02',
      social_number: '012345',
    };

    setUser(mockApiResponse);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof User) => {
    const updatedUser = { ...user!, [field]: event.target.value };
    setUser(updatedUser);
  };

  const handleSaveClick = () => {
    // Aquí puedes agregar la lógica para guardar los cambios en la API
    // axios.post('http://localhost:8081/api/v1/me', user);
  };

  return (
    <div>
      <h2>Información de mi cuenta</h2>
      {user ? (
        <div>
          <form>
            <label>Nombre de usuario: </label>
            <input type="text" value={user.username} onChange={(e) => handleInputChange(e, 'username')} />
            <br />

            <label>Nombre completo: </label>
            <input type="text" value={user.firstName} onChange={(e) => handleInputChange(e, 'firstName')} />
            <input type="text" value={user.lastName} onChange={(e) => handleInputChange(e, 'lastName')} />
            <br />

            <label>Email: </label>
            <input type="email" value={user.email} onChange={(e) => handleInputChange(e, 'email')} />
            <br />

            <label>Número de teléfono: </label>
            <input type="tel" value={user.phoneNumber} onChange={(e) => handleInputChange(e, 'phoneNumber')} />
            <br />

            <label>Fecha de nacimiento: </label>
            <input type="date" value={user.dateOfBirth} onChange={(e) => handleInputChange(e, 'dateOfBirth')} />
            <br />

            <label>Número social: </label>
            <input type="text" value={user.social_number} onChange={(e) => handleInputChange(e, 'social_number')} />
            <br />

            <button type="button" onClick={handleSaveClick}>Actualizar</button>
          </form>
        </div>
      ) : (
        <p>Cargando información de la cuenta...</p>
      )}
    </div>
  );
};

export default Account;
