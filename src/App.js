import React, { useState } from "react";
import "./App.css";
import "tailwindcss/tailwind.css";
import Calendar from "./components/Calendar.js";
import EventForm from "./components/EventForm.js";
import EventList from "./components/EventList.js";
import Event from "./components/Event.js";

function App() {
  const [events, setEvents] = useState([]);
  const [editedEvent, setEditedEvent] = useState(null);

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const editEvent = (editedEvent) => {
    const updatedEvents = events.map((event) =>
      event.id === editedEvent.id ? editedEvent : event
    );
    setEvents(updatedEvents);
    setEditedEvent(null);
  };

  const deleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-500 py-4 text-white text-center">
        <h1 className="text-3xl font-semibold">Calendario</h1>
      </header>
      <div className="container mx-auto p-4">
        <div className="flex">
          <div className="w-1/2 p-4">
            <EventForm onAddEvent={addEvent} editedEvent={editedEvent} />
            <EventList events={events} onDeleteEvent={deleteEvent} />
          </div>
          <div className="w-1/2 p-4">
            {/* Aplicar estilos al calendario aquí */}
            <Calendar events={events} onEditEvent={setEditedEvent} />
          </div>
        </div>
        {editedEvent && (
          <div className="p-4">
            <h2 className="text-xl font-semibold">Editando Evento</h2>
            <Event event={editedEvent} onEditEvent={editEvent} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
