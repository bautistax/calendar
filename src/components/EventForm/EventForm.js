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
      const dateParts = editedEvent.date.split("T");
      setEventData({
        title: editedEvent.title,
        date: dateParts[0], // Esto debería ser la fecha sin la hora
        time: dateParts[1], // Esto debería ser la hora sin la fecha
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
  console.log(eventData);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const { title, date, time, description, color } = eventData;
  
    if (!title || !date || !time) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }
  
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  
    if (!time.match(timeRegex)) {
      alert("Formato de hora no válido. Utilice HH:mm (por ejemplo, 22:50).");
      return;
    }
  
    const dateParts = date.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const day = parseInt(dateParts[2], 10);
  
    const timeParts = time.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
  
    const localDate = new Date(year, month, day, hours, minutes);
  
    if (isNaN(localDate)) {
      alert("Fecha u hora no válida");
      return;
    }
  
    // Ajustar la zona horaria a UTC
    localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
  
    // Llamar a la función correspondiente según si se está editando o agregando un evento
    if (editedEvent) {
      onEditEvent({
        ...editedEvent,
        title,
        date: localDate.toISOString(),
        description,
        color,
      });
    } else {
      onAddEvent({
        title,
        date: localDate.toISOString(),
        description,
        color,
      });
      onEventAdded({
        title,
        date: localDate.toISOString(),
        description,
        color,
      });
    }
  
    // Restablecer el formulario después de agregar o editar
    setEventData(initialEventData);
    onCloseForm(); // Cerrar el formulario después de agregar o editar
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
