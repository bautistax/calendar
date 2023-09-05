import React, { useState } from "react";

const EventForm = ({ onAddEvent, onEventAdded, editedEvent }) => {
  const initialEventData = {
    title: editedEvent ? editedEvent.title : "",
    date: editedEvent ? editedEvent.date : "",
    time: editedEvent ? editedEvent.time : "",
    description: editedEvent ? editedEvent.description : "",
    color: editedEvent ? editedEvent.color || "#ffffff" : "#ffffff",
  };

  const [eventData, setEventData] = useState(initialEventData);

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

    // Convertir la fecha seleccionada en una cadena ISO
    const { date, time } = eventData;
    const dateTimeString = `${date}T${time}`;
    const localDate = new Date(dateTimeString);

    if (!isNaN(localDate)) {
      const isoDate = localDate.toISOString();
      const updatedEventData = {
        ...eventData,
        date: isoDate,
      };

      onAddEvent(updatedEventData);
      onEventAdded(updatedEventData);

      setEventData(initialEventData);
    } else {
      alert("Fecha u hora no válida");
    }
  };

  const availableColors = [
    { name: "Blanco", code: "#ffffff" },
    { name: "Verde", code: "#33FF57" },
    { name: "Azul", code: "#5733FF" },
    { name: "Rosa", code: "#FF33D8" },
    { name: "Celeste", code: "#33D8FF" },
  ];

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
          <select
            className="w-full px-2 py-1 border rounded"
            name="color"
            value={eventData.color}
            onChange={handleInputChange}
          >
            {availableColors.map((color) => (
              <option key={color.code} value={color.code}>
                {color.name}
              </option>
            ))}
          </select>
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
