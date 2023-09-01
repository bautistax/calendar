import React from "react";

const EventList = ({ events, onDeleteEvent }) => {
  return (
    <div>
      <h2>Lista de Eventos</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <span>{event.title}</span>
            <button onClick={() => onDeleteEvent(event.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
