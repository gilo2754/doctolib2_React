import React from 'react';

const AddressComponent = () => {
  const address = {
    street: '1a ave norte',
    neighborhood: 'El transito',
    city: 'Apopa',
    department: 'San Salvador',
    postalCode: '503',
    additionalInfo: 'Near the park'
  };

  // Obtén la latitud y longitud de la dirección (puedes hacerlo a través de una API de geolocalización o de alguna otra fuente).
  const latitude = 13.8077; // Latitud de ejemplo
  const longitude = -89.1821; // Longitud de ejemplo

  // Crea una URL de Google Maps con las coordenadas
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <div>
      <p>TODO: show map. Dirección: {address.street}, {address.neighborhood}, {address.city}, {address.department}, {address.postalCode}</p>
      <p>Información adicional: {address.additionalInfo}</p>
      <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
        Ver en Google Maps
      </a>
    </div>
  );
};

export default AddressComponent;
