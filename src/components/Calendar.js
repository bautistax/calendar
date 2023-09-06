import React from "react";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format } from "date-fns";
import Event from "./Event";

const Calendar = ({ events, onEditEvent }) => {
  const today = new Date();
  const firstDayOfMonth = startOfMonth(today);
  const lastDayOfMonth = endOfMonth(today);
  const startOfCalendar = startOfWeek(firstDayOfMonth);
  const endOfCalendar = endOfWeek(lastDayOfMonth);

  const days = eachDayOfInterval({ start: startOfCalendar, end: endOfCalendar });

  return (
    <div className="grid grid-cols-7 gap-4">
      {days.map((day, index) => (
        <div key={index} className="text-center">
          <div className="font-semibold">{format(day, "EEEE")}</div>
          <div className="text-lg">{format(day, "d/MM")}</div>
          {events.map((event) => {
            const eventDate = new Date(event.date);
            if (
              eventDate.getDate() === day.getDate() &&
              eventDate.getMonth() === day.getMonth() &&
              eventDate.getFullYear() === day.getFullYear()
            ) {
              return (
                <Event
                  key={event.id}
                  event={event}
                  onEditEvent={onEditEvent}
                />
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
