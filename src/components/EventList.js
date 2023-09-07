import React, { useState } from "react";
import EventForm from "./EventForm.js"; // Asegúrate de que el componente EventForm esté importado

const EventList = ({ events, onDeleteEvent, onEditEvent }) => {
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null);

  const openEditForm = (event) => {
    setEditedEvent(event);
    setEditFormOpen(true);
  };

  const closeEditForm = () => {
    setEditedEvent(null);
    setEditFormOpen(false);
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-2xl font-semibold mb-4">Lista de Eventos</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="mb-2">
            <span className="text-lg">{event.title}</span>
            <button
              onClick={() => onDeleteEvent(event.id)}
              className="bg-red-500 text-white px-2 py-1 ml-2 rounded hover:bg-red-600"
            >
              Eliminar
            </button>
            <button
              onClick={() => openEditForm(event)}
              className="bg-blue-500 text-white px-2 py-1 ml-2 rounded hover:bg-blue-600"
            >
              Editar
            </button>
          </li>
        ))}
      </ul>
      {editFormOpen && (
        <div className="mt-4">
          {/* Renderiza el formulario de edición aquí */}
          {/* Asegúrate de pasar editedEvent y una función para cerrar el formulario */}
          <EventForm
            editedEvent={editedEvent}
            onCloseForm={closeEditForm}
            onEditEvent={onEditEvent}
          />
        </div>
      )}
    </div>
  );
};

export default EventList;
