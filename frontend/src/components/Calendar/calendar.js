import React, { useState } from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import Search from '../Search/search';
import { allCourses } from '../../courses/allCourses';


const daysOfWeek = ['Time', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

 const initialSchedules = {
   1: [],
   2: [],
   3: [],
 };
 

 function convertWeekdaysToArray(weekdays) {
  const daysMapping = { 'M': 'Monday', 'T': 'Tuesday', 'W': 'Wednesday', 'R': 'Thursday', 'F': 'Friday' };
  return weekdays.split('').map(day => daysMapping[day]);
}

// Converts time from 12-hour format ("2:30 PM") to 24-hour format ("14:30")
function convertTimeTo24HourFormat(time) {
  let [hours, minutesPart] = time.split(':');
  let minutes = minutesPart.substring(0, 2);
  const isPM = minutesPart.includes('PM');
  hours = isPM ? (hours % 12) + 12 : hours % 12;
  return `${String(hours).padStart(2, '0')}:${minutes}`;
}

const calculateCourseStyle = (course) => {
  const hourHeight = 50;
  const startHour = parseTime(course.startTime);
  const endHour = parseTime(course.endTime);
  const topOffset = (startHour - 8) * hourHeight;
  const courseHeight = (endHour - startHour) * hourHeight;

  return {
    top: `${topOffset}px`,
    height: `${courseHeight}px`,
  };
};

 const parseTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  return parseInt(hours) + parseInt(minutes) / 60;
};


const Scheduler = ({ currentCourses, addCourse, removeCourse, initialSchedules , handleClassClick}) => {

  const [activeCalendar, setActiveCalendar] = useState(1);
  const coursesByDay = {};
  daysOfWeek.slice(1).forEach((day) => {
    coursesByDay[day] = currentCourses.filter(course => 
      course.schedules.some(schedule => convertWeekdaysToArray(schedule.weekdays).includes(day) &&
        schedule.startTime && schedule.endTime)
      .map(course => ({
        ...course,
        startTime: convertTimeTo24HourFormat(course.schedules[0].startTime),
        endTime: convertTimeTo24HourFormat(course.schedules[0].endTime)
      }))
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
            {day === 'Time' ? (
              <div style={{ paddingRight: '18%' }}> {/* Adjust padding as needed */}
                <Typography variant="h6" gutterBottom>
                  {day}
                </Typography>
              </div>
            ) : (
              <Typography variant="h6" gutterBottom>
                {day}
              </Typography>
            )}
          <Paper
            elevation={3}
            className={`dayColumn ${day === 'Time' ? 'timeColumn' : ''}`}
            style={{
              background: day === 'Time' ? 'white' : 'white',
              width: day === 'Time' ? '80%' : '100%',
              
            }}
          >
            {[...Array(24)].map((_, halfHour) => (
              <div
                className={halfHour % 2 === 0 ? 'hourBlock' : 'halfHour'}
                key={halfHour}
                style={{ top: `${halfHour * 25}px`}}
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
