import React, { useState } from "react";

const EventForm = ({ onAddEvent, editedEvent }) => {
  const [eventData, setEventData] = useState({
    title: editedEvent ? editedEvent.title : "",
    date: editedEvent ? editedEvent.date : "",
    time: editedEvent ? editedEvent.time : "",
    description: editedEvent ? editedEvent.description : "",
    color: editedEvent ? editedEvent.color || "#ffffff" : "#ffffff",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!eventData.title || !eventData.date || !eventData.time) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    onAddEvent(eventData);

    setEventData({
      title: "",
      date: "",
      time: "",
      description: "",
      color: "#ffffff",
    });
  };

  return (
    <div className="border rounded p-4 mb-4">
      <h2 className="text-xl font-semibold mb-4">
        {editedEvent ? "Editar Evento" : "Agregar Evento"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block font-semibold mb-1">Título del Evento</label>
          <input
            className="w-full px-2 py-1 border rounded"
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-2">
          <label className="block font-semibold mb-1">Fecha</label>
          <input
            className="w-full px-2 py-1 border rounded"
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-2">
          <label className="block font-semibold mb-1">Hora</label>
          <input
            className="w-full px-2 py-1 border rounded"
            type="time"
            name="time"
            value={eventData.time}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-2">
          <label className="block font-semibold mb-1">Descripción</label>
          <textarea
            className="w-full px-2 py-1 border rounded"
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-2">
          <label className="block font-semibold mb-1">Color</label>
          <input
            className="w-full px-2 py-1 border rounded"
            type="color"
            name="color"
            value={eventData.color}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            type="submit"
          >
            {editedEvent ? "Editar" : "Agregar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
