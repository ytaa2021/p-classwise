import React, { useState } from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import Search from '../Search/search';
import { allCourses } from '../../courses/allCourses';


const daysOfWeek = ['Time', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

// const initialSchedules = {
//   1: [],
//   2: [],
//   3: [],
// };

const calculateCourseStyle = (course) => {
  const hourHeight = 50;
  const topOffset = (course.startTime - 8) * hourHeight;
  const courseHeight = (course.endTime - course.startTime) * hourHeight;

  return {
    top: `${topOffset}px`,
    height: `${courseHeight}px`,
  };
};

const Scheduler = ({ currentCourses, addCourse, removeCourse, initialSchedules , handleClassClick}) => {

  const [activeCalendar, setActiveCalendar] = useState(1);
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
      <Grid container spacing={1}>
      {daysOfWeek.map((day) => (
        <Grid item xs={2} key={day}>
          <Typography variant="h6" gutterBottom>
            {day}
          </Typography>
          <Paper
            elevation={3}
            className={`dayColumn ${day === 'Time' ? 'timeColumn' : ''}`}
            style={{
              background: day === 'Time' ? 'transparent' : 'white',
              width: day === 'Time' ? '50%' : '100%',
            }}
          >
            {[...Array(24)].map((_, halfHour) => (
              <div
                className={halfHour % 2 === 0 ? 'hourBlock' : 'halfHour'}
                key={halfHour}
                style={{ top: `${halfHour * 25}px` }}
              >
                {day === 'Time' && halfHour % 2 === 0 && (halfHour / 2 + 8) + ':00'}
              </div>
            ))}
              {coursesByDay[day].map((course) => (
                <div
                  className="course"
                  style={calculateCourseStyle(course)}
                  key={course.title}
                  onClick={() => handleClassClick(course)}
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
        </Grid>
      </Grid>
    </div>
  );
};

export default Scheduler;
