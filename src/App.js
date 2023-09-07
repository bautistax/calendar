import React, { useState } from "react";
import Calendar from "./components/Calendars.js";
import EventForm from "./components/EventForm.js";
import EventList from "./components/EventList.js";
import WeeklyCalendar from "./components/Weekly.js";
import "./App.css";
import "tailwindcss/tailwind.css";

function App() {
  const [events, setEvents] = useState([]);
  const [editedEvent, setEditedEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const addEvent = (newEvent) => {
    const eventWithColor = { ...newEvent, color: newEvent.color };
    setEvents([...events, eventWithColor]);
  };

  const handleEventAdded = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const editEvent = (editedEvent) => {
    const updatedEvents = events.map((event) =>
      event.id === editedEvent.id ? editedEvent : event
    );
    setEvents(updatedEvents);
    setEditedEvent(editedEvent);
  };

  const deleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
  };


  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <header className="bg-blue-500 text-white py-4 text-center">
        <h1 className="text-3xl font-semibold">Mi Calendario</h1>
        <button
          className="absolute left-4 top-4 text-2xl cursor-pointer"
          onClick={() => setShowForm(!showForm)}
        >
          &#8801;
        </button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <div className={`bg-white shadow-md rounded-md p-4 ${showForm ? "md:col-span-1" : "md:col-span-2"}`}>
          {showForm ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">Nuevo Evento</h2>
              <EventForm
                onAddEvent={addEvent}
                onEventAdded={handleEventAdded}
                editedEvent={editedEvent}
                onCloseForm={() => setShowForm(false)} 
              />
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">Calendario</h2>
              <Calendar events={events} onEditEvent={setEditedEvent} />
              <WeeklyCalendar events={events} onEditEvent={setEditedEvent} />
            </div>
          )}
        </div>
        <div className="bg-white shadow-md rounded-md p-4">
          <h2 className="text-xl font-semibold mb-4">Eventos</h2>
          <EventList
            events={events}
            onDeleteEvent={deleteEvent}
            onEditEvent={editEvent}
          />
        </div>
      </div>
      {/* {editedEvent && (
        <div className="bg-white shadow-md rounded-md p-4 mt-4">
          <h2 className="text-xl font-semibold mb-4">Editando Evento</h2>
          <Event event={editedEvent} onEditEvent={editEvent} />
        </div>
      )} */}
    </div>
  );
}

export default App;
