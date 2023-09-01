import React from "react";

const Calendar = ({ events, onEditEvent }) => {
  // Esta función formatea una fecha en el formato deseado (puedes personalizarlo).
  const formatDate = (date) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("es-ES", options);
  };

  return (
    <div>
      <h2>Vista Semanal del Calendario</h2>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Día</th>
            <th>Eventos</th>
          </tr>
        </thead>
        <tbody>
          {/* Iterar por los días de la semana */}
          {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day) => (
            <tr key={day}>
              <td>{day}</td>
              <td>
                {/* Filtrar eventos para mostrar solo los eventos de este día */}
                {events
                  .filter((event) => new Date(event.date).toLocaleDateString("es-ES", { weekday: "long" }) === day)
                  .map((event) => (
                    <div key={event.id}>
                      {/* Mostrar detalles del evento y permitir editar */}
                      <span>{formatDate(event.date)} - {event.title}</span>
                      <button onClick={() => onEditEvent(event)}>Editar</button>
                    </div>
                  ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
