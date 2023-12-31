import React from "react";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format } from "date-fns";
import Event from "../Event/Event.js";
import 'tailwindcss/tailwind.css';

const Calendar = ({ events, onEditEvent }) => {
  const today = new Date();
  const firstDayOfMonth = startOfMonth(today);
  const lastDayOfMonth = endOfMonth(today);
  const startOfCalendar = startOfWeek(firstDayOfMonth);
  const endOfCalendar = endOfWeek(lastDayOfMonth);

  const days = eachDayOfInterval({ start: startOfCalendar, end: endOfCalendar });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
      {days.map((day, index) => (
        <div key={index} className="text-center">
          <div className="border rounded p-4 mb-4 bg-slate-300">
            <div className="font-semibold">{format(day, "EEEE")}</div>
            <div className="text-lg">{format(day, "d/MM")}</div>
            {events.map((event) => {
              const eventDate = new Date(event.date);
              if (
                eventDate.getDate() === day.getDate() &&
                eventDate.getMonth() === day.getMonth() 
                // eventDate.getFullYear() === day.getFullYear()
              ) {
                return (
                  <div key={event.id} >
                    <Event
                      event={event}
                      onEditEvent={onEditEvent}
                    />
                      <div className="mt-2" style={{ backgroundColor: event.color, height: '10px' }}></div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Calendar;
