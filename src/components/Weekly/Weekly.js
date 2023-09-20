import React from "react";
import 'tailwindcss/tailwind.css';


const WeeklyCalendar = ({ events, onEditEvent }) => {
  // Obtener la fecha actual
  const currentDate = new Date();

  // Calcular los 7 días de la semana
  const daysOfWeek = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(currentDate);
    day.setDate(currentDate.getDate() + i);
    daysOfWeek.push(day);
  }

  // Filtrar eventos de la semana actual
  const weeklyEvents = events.filter((event) =>
    daysOfWeek.some((day) => new Date(event.date).toDateString() === day.toDateString())
  );

  // Función para formatear la fecha
  const formatDate = (date) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <div className="py-14">
      <h2 className="text-xl font-semibold mb-4 ">Weekly Calendar View</h2>
      <div className="grid grid-cols-7 gap-2 border rounded p-4 mb-4 bg-slate-300">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="text-center font-semibold">
            {formatDate(day)}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-2">
        {daysOfWeek.map((day) => (
          <div key={day.toISOString()} className="relative">
            {weeklyEvents
              .filter((event) => new Date(event.date).toDateString() === day.toDateString())
              .map((event) => (
                <div
                  key={event.id}
                  className="border border-gray-500 p-8 rounded-md"
                  // onClick={() => onEditEvent(event)}
                >
                  <div className="text-xs text-blue-600">
                    {formatDate(event.date)}
                  </div>
                  <div className="font-semibold">{event.title}</div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendar;
