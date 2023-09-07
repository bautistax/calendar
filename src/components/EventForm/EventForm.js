import React, { useState, useEffect } from "react";

const EventForm = ({ onAddEvent, onEventAdded, editedEvent, onCloseForm, onEditEvent }) => {
  const initialEventData = {
    title: "",
    date: "",
    time: "",
    description: "",
    color: "",
  };

  const [eventData, setEventData] = useState(initialEventData);

  useEffect(() => {
    if (editedEvent) {
      setEventData({
        title: editedEvent.title,
        date: editedEvent.date.split("T")[0], // Separar fecha y hora
        time: editedEvent.date.split("T")[1], // Separar fecha y hora
        description: editedEvent.description,
        color: editedEvent.color,
      });
    } else {
      setEventData(initialEventData);
    }
  }, [editedEvent]);

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

    // Crear una nueva fecha y hora en formato ISO
    const { date, time } = eventData;
    const dateTimeString = `${date}T${time}`;
    const localDate = new Date(dateTimeString);

    if (!isNaN(localDate)) {
      const isoDate = localDate.toISOString();

      if (editedEvent) {
        // Si estamos editando un evento, llamamos a la función onEditEvent
        onEditEvent({
          ...editedEvent,
          title: eventData.title,
          date: isoDate,
          description: eventData.description,
          color: eventData.color,
        });
      } else {
        // Si estamos agregando un nuevo evento, llamamos a la función onAddEvent
        onAddEvent({
          title: eventData.title,
          date: isoDate,
          description: eventData.description,
          color: eventData.color,
        });
        onEventAdded({
          title: eventData.title,
          date: isoDate,
          description: eventData.description,
          color: eventData.color,
        });
      }

      // Restablecer el formulario después de agregar o editar
      setEventData(initialEventData);
      onCloseForm(); // Cerrar el formulario después de agregar o editar
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