import React, { useState } from "react";
import EventForm from "../EventForm/EventForm.js"; 

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
      <h2 className="text-2xl font-semibold mb-4">List of Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="mb-2">
            <span className="text-lg">{event.title}</span>
            <button
              onClick={() => onDeleteEvent(event.id)}
              className="bg-red-500 text-white px-2 py-1 ml-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={() => openEditForm(event)}
              className="bg-blue-500 text-white px-2 py-1 ml-2 rounded hover:bg-blue-600"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
      {editFormOpen && (
        <div className="mt-4">
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
