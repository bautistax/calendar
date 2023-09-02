import React from "react";

const Calendar = ({ events, onEditEvent }) => {
  // Función para formatear la fecha
  const formatDate = (date) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("es-ES", options);
  };

  // Crear una matriz de 7 días de la semana
  const daysOfWeek = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  // Crear una matriz de fechas para un rango de 28 días
  const currentDate = new Date();
  const dates = Array.from({ length: 28 }, (_, index) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + index);
    return newDate;
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Vista Mensual del Calendario</h2>
      <div className="grid grid-cols-7 gap-2">
        {/* Renderizar los nombres de los días de la semana */}
        {daysOfWeek.map((day, index) => (
          <div key={index} className="text-center font-semibold">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-2">
        {/* Renderizar celdas para cada día de la semana */}
        {dates.map((date) => (
          <div key={date.toISOString()} className="relative">
            {events
              .filter((event) => new Date(event.date).toDateString() === date.toDateString())
              .map((event) => (
                <div
                  key={event.id}
                  className="bg-gray-300 border border-gray-500 p-8 rounded-md cursor-pointer"
                  onClick={() => onEditEvent(event)}
                >
                  <div className="text-xs text-blue-600">
                    {formatDate(event.date)}
                  </div>
                  <div className="font-semibold">{event.title}</div>
                </div>
              ))}
            {/* Agregar un cuadro vacío si no hay eventos en este día */}
            {events
              .filter((event) => new Date(event.date).toDateString() === date.toDateString())
              .length === 0 && (
              <div className="bg-gray-300 border border-gray-500 p-9 rounded-md"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
