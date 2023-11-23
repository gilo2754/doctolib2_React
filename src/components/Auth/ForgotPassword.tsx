// ForgotPassword.tsx
import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Enviar solicitud al servidor para restablecer la contraseña
      await axios.post('http://localhost:8081/api/v1/reset-password', { email });
      setSuccessMessage('Se ha enviado un enlace de restablecimiento de contraseña a tu correo electrónico.');
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage('No se pudo procesar la solicitud. Verifica la dirección de correo electrónico e inténtalo de nuevo.');
      setSuccessMessage(null);
    }
  };

  return (
    <div>
      <h2>¿Olvidaste tu contraseña?</h2>
      <p>Ingresa tu dirección de correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</p>

      {successMessage && <p className="text-success">{successMessage}</p>}
      {errorMessage && <p className="text-danger">{errorMessage}</p>}

      <form onSubmit={handleResetPassword}>
      <label htmlFor="email" className="form-label">Correo Electrónico:</label>
        <div className="input-group mb-3">
          <span className="input-group-text">
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
         <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Restablecer Contraseña</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
