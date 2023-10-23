import React from 'react';
import './calendar.css'; 

const Calendar = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const hours = Array.from({ length: 15 }, (_, i) => {
    const hour = i < 4 ? (i + 8) + 'am' : (i - 4) + 'pm';
    return hour;
  });

  return (
    <div className="calendar">
      <table>
        <thead>
          <tr>
            <th>Time</th>
            {days.map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour, hourIndex) => (
            <tr key={hourIndex}>
              <td>{hour}</td>
              {days.map((day, dayIndex) => (
                <td key={dayIndex}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
