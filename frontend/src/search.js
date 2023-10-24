import React, { useState } from 'react';
import './calendar.css';

const Search = () => {
  const classes = [
    { name: 'Class1', description: 'description class1', time: '10:00am - 11:00am', days: 'M,W' },
    { name: 'Class2', description: 'description class 2', time: '2:00pm - 3:00pm', days: 'T,TR' },
    { name: 'Class3', description: 'description class 3', time: '4:30pm - 6:00pm', days: 'M,T,W,F' },
  ];

  const [activeIndex, setActiveIndex] = useState(-1);
  const [searchTerm, setSearchTerm] = useState('');
  const [calendar, setCalendar] = useState([]);

  const toggleDescription = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  const addClassToCalendar = (classItem) => {
    const { time, days } = classItem;
    const classTime = time.split(' - ');
    const classDays = days.split(',');

    // check if the class is already in the calendar
    const isClassInCalendar = calendar.some((item) => item.name === classItem.name);

    if (!isClassInCalendar) {
      setCalendar([...calendar, { ...classItem, classTime, classDays }]);
    }
  };

  const filteredClasses = classes.filter((classItem) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      classItem.name.toLowerCase().includes(lowerSearchTerm) ||
      classItem.description.toLowerCase().includes(lowerSearchTerm)
    );
  });

  return (
    <div className="search">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for classes"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>Search</button>
      </div>
      <div className="class-list">
        {filteredClasses.map((classItem, index) => (
          <div key={index} className="class-block">
            <div className="class-info">
              <div className="class-name">{classItem.name}</div>
              <div className="class-time">{classItem.time}</div>
              <button
                onClick={() => toggleDescription(index)}
                className="description-toggle"
              >
                {activeIndex === index ? '^' : 'v'}
              </button>
              <button onClick={() => addClassToCalendar(classItem)} className="add-button">
                +
              </button>
            </div>
            {activeIndex === index && (
              <div className="class-description">{classItem.description}</div>
            )}
          </div>
        ))}
      </div>
      <div className="calendar">
        {/* render the classes on the calendar */}
        {calendar.map((classItem, index) => (
          <div key={index} className="calendar-class">
            <div className="calendar-class-name">{classItem.name}</div>
            <div className="calendar-class-time">{classItem.time}</div>
            <div className="calendar-class-days">{classItem.days}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
