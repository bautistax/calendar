import React, { useState } from "react";
import 'tailwindcss/tailwind.css';


const Event = ({ event, onEditEvent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({ ...event });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({
      ...editedEvent,
      [name]: value,
    });
  };

  const handleEditSubmit = () => {
    onEditEvent(editedEvent);
    setIsEditing(false);
  };

  return (
    <div className={`border rounded p-4 mb-4 ${event.color}`}>
      {isEditing ? (
        <div>
          <input
            className="w-full mb-2 px-2 py-1 border rounded"
            type="text"
            name="title"
            value={editedEvent.title}
            onChange={handleInputChange}
          />
          <input
            className="w-full mb-2 px-2 py-1 border rounded"
            type="date"
            name="date"
            value={editedEvent.date}
            onChange={handleInputChange}
          />
          <input
            className="w-full mb-2 px-2 py-1 border rounded"
            type="time"
            name="time"
            value={editedEvent.time}
            onChange={handleInputChange}
          />
          <textarea
            className="w-full mb-2 px-2 py-1 border rounded"
            name="description"
            value={editedEvent.description}
            onChange={handleInputChange}
          />
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            onClick={handleEditSubmit}
          >
            Guardar Cambios
          </button>
        </div>
      ) : (
        <div>
          <span className="text-xl font-semibold">{event.title}</span>
          <div className="flex">
            <span className="text-gray-600 mr-4">{event.date}</span>
            <span className="text-gray-600">{event.time}</span>
          </div>
          <p className="mt-2">{event.description}</p>
        </div>
      )}
    </div>
  );
};

export default Event;
