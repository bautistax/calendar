import React from "react";

const EventList = ({ events, onDeleteEvent }) => {
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;