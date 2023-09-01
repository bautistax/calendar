import React, { useState } from "react";

const EventForm = ({ onAddEvent, editedEvent }) => {
  // Estado local para el formulario
  const [eventData, setEventData] = useState({
    title: editedEvent ? editedEvent.title : "",
    date: editedEvent ? editedEvent.date : "",
    time: editedEvent ? editedEvent.time : "",
    description: editedEvent ? editedEvent.description : "",
  });

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!eventData.title || !eventData.date || !eventData.time) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    // Llamar a la función onAddEvent para agregar/editar el evento
    onAddEvent(eventData);

    // Limpiar el formulario
    setEventData({
      title: "",
      date: "",
      time: "",
      description: "",
    });
  };

  return (
    <div>
      <h2>{editedEvent ? "Editar Evento" : "Agregar Evento"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título del Evento</label>
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Fecha</label>
          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Hora</label>
          <input
            type="time"
            name="time"
            value={eventData.time}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Descripción</label>
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">{editedEvent ? "Editar" : "Agregar"}</button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
