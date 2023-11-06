import React, { useState } from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import Search from '../Search/search';
import { allCourses } from '../../courses/allCourses';


const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const initialSchedules = {
  1: [],
  2: [],
  3: [],
};

const calculateCourseStyle = (course) => {
  const hourHeight = 50;
  const topOffset = (course.startTime - 8) * hourHeight;
  const courseHeight = (course.endTime - course.startTime) * hourHeight;

  return {
    top: `${topOffset}px`,
    height: `${courseHeight}px`,
  };
};

const Scheduler = () => {

  const [activeCalendar, setActiveCalendar] = useState(1);
  const [calendars, setCalendars] = useState(initialSchedules);
  const currentCourses = calendars[activeCalendar];

  const [filteredCourses, setFilteredCourses] = useState([]);
  const [addedCourses, setAddedCourses] = useState([]);
  const [expandedBlocks, setExpandedBlocks] = useState({});

  const handleSearch = (searchTerm) => {
    const filteredCourses = currentCourses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filteredCourses);
  };

  const addCourse = (course) => {
    setCalendars((prevCalendars) => ({
      ...prevCalendars,
      [activeCalendar]: [...prevCalendars[activeCalendar], course],
    }));
  };

  const removeCourse = (course) => {
    setCalendars((prevCalendars) => ({
      ...prevCalendars,
      [activeCalendar]: prevCalendars[activeCalendar].filter((c) => c !== course),
    }));
  };

  const toggleClassBlock = (title) => {
    setExpandedBlocks({
      ...expandedBlocks,
      [title]: !expandedBlocks[title],
    });
  };

  const coursesByDay = {};

  daysOfWeek.forEach((day) => {
    coursesByDay[day] = currentCourses.filter((course) =>
      Array.isArray(course.day) ? course.day.includes(day) : course.day === day
    );
  });

  const switchCalendar = (calendarNumber) => {
    setActiveCalendar(calendarNumber);
  };

  return (
    <div>
      <div>
        <Button
          variant={activeCalendar === 1 ? "contained" : "outlined"}
          onClick={() => switchCalendar(1)}
        >
          Schedule 1
        </Button>
        <Button
          variant={activeCalendar === 2 ? "contained" : "outlined"}
          onClick={() => switchCalendar(2)}
        >
          Schedule 2
        </Button>
        <Button
          variant={activeCalendar === 3 ? "contained" : "outlined"}
          onClick={() => switchCalendar(3)}
        >
          Schedule 3
        </Button>
      </div>
      <Grid container spacing={1}>
        {daysOfWeek.map((day) => (
          <Grid item xs={2} key={day}>
            <Typography variant="h6" gutterBottom>
              {day}
            </Typography>
            <Paper elevation={3} className="dayColumn">
              {[...Array(24)].map((_, halfHour) => (
                <div
                  className={halfHour % 2 === 0 ? "hourBlock" : "halfHour"}
                  key={halfHour}
                  style={{ top: `${halfHour * 25}px` }}
                >
                  {halfHour % 2 === 0 && (halfHour / 2 + 8) + ":00"}
                </div>
              ))}
              {coursesByDay[day].map((course) => (
                <div
                  className="course"
                  style={calculateCourseStyle(course)}
                  key={course.title}
                >
                  {course.title}
                  <Button
                    className="remove-button"
                    variant="text"
                    color="secondary"
                    onClick={() => removeCourse(course)}
                  >
                    x
                  </Button>
                </div>
              ))}
            </Paper>
          </Grid>
        ))}
        <Grid item xs={2}>
        <Search
            courses={currentCourses}
            onSearch={handleSearch}
            allCourses={allCourses}
            expandedBlocks={expandedBlocks}
            addCourse={addCourse}
            removeCourse={removeCourse}
            toggleClassBlock={toggleClassBlock}
          />
          {/* <Search courses={currentCourses} onSearch={handleSearch} /> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Scheduler;
