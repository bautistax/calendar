import React, { useState } from "react";
import "./App.css"; // Asegúrate de importar el archivo CSS para aplicar estilos.
import Calendar from "./Calendar";
import EventForm from "./EventForm";
import EventList from "./EventList";
import Event from "./Event";

function App() {
  // Estado para gestionar la lista de eventos
  const [events, setEvents] = useState([]);
  // Estado para gestionar el evento que se está editando
  const [editedEvent, setEditedEvent] = useState(null);

  // Función para agregar un nuevo evento
  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  // Función para editar un evento existente
  const editEvent = (editedEvent) => {
    const updatedEvents = events.map((event) =>
      event.id === editedEvent.id ? editedEvent : event
    );
    setEvents(updatedEvents);
    setEditedEvent(null);
  };

  // Función para eliminar un evento
  const deleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
  };

  return (
    <div className="App">
      <h1>Calendario</h1>
      <div className="flex">
        <div className="w-1/2 p-4">
          <EventForm onAddEvent={addEvent} editedEvent={editedEvent} />
          <EventList events={events} onDeleteEvent={deleteEvent} />
        </div>
        <div className="w-1/2 p-4">
          <Calendar events={events} onEditEvent={setEditedEvent} />
        </div>
      </div>
      {editedEvent && (
        <div className="p-4">
          <h2>Editando Evento</h2>
          <Event event={editedEvent} onEditEvent={editEvent} />
        </div>
      )}
    </div>
  );
}

export default App;
