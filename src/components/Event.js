import React, { useState } from "react";

const Event = ({ event, onEditEvent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({ ...event });

  // Manejar cambios en los campos del evento editado
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({
      ...editedEvent,
      [name]: value,
    });
  };

  // Manejar el envío del formulario de edición
  const handleEditSubmit = () => {
    onEditEvent(editedEvent);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            name="title"
            value={editedEvent.title}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="date"
            value={editedEvent.date}
            onChange={handleInputChange}
          />
          <input
            type="time"
            name="time"
            value={editedEvent.time}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            value={editedEvent.description}
            onChange={handleInputChange}
          />
          <button onClick={handleEditSubmit}>Guardar Cambios</button>
        </div>
      ) : (
        <div>
          <span>{event.title}</span>
          <span>{event.date}</span>
          <span>{event.time}</span>
          <span>{event.description}</span>
          <button onClick={() => setIsEditing(true)}>Editar</button>
        </div>
      )}
    </div>
  );
};

export default Event;
