import React, { useState, useEffect } from 'react';
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



const calculateCourseStyle = (course, day) => {
  // Find the schedule for the given day
  const schedule = course.schedules.find(sch => sch.weekdays.includes(day));
  
  if (!schedule || !schedule.startTime || !schedule.endTime) {
    console.error('Invalid course schedule for day', day, course);
    return {};
  }

  const hourHeight = 50;
  const startHour = parseTime(schedule.startTime);
  const endHour = parseTime(schedule.endTime);
  const topOffset = (startHour - 8) * hourHeight; // Adjust 8 to the start of your calendar day if different
  const courseHeight = (endHour - startHour) * hourHeight;

  return {
    top: `${topOffset}px`,
    height: `${courseHeight}px`,
  };
};

const parseTime = (timeString) => {
  if (typeof timeString !== 'string') {
    console.error('Invalid timeString:', timeString);
    return 0;
  }
  const [hours, minutes] = timeString.split(':');
  return parseInt(hours, 10) + parseInt(minutes, 10) / 60;
};



const Scheduler = ({ currentCourses, addCourse, removeCourse, initialSchedules , handleClassClick}) => {
  console.log('Current Courses in Calendar:', currentCourses);
  const [activeCalendar, setActiveCalendar] = useState(1);
  const [coursesByDay, setCoursesByDay] = useState({});

  useEffect(() => {
    const newCoursesByDay = daysOfWeek.reduce((acc, day) => {
      if (day !== 'Time') {
        acc[day] = currentCourses.filter(course => 
          course.schedules.some(schedule => schedule.weekdays.includes(day))
        );
      }
      return acc;
    }, {});
    setCoursesByDay(newCoursesByDay);
  }, [currentCourses]);

  console.log(coursesByDay)
  daysOfWeek.slice(1).forEach((day) => { // Assuming daysOfWeek[0] is 'Time'
    coursesByDay[day] = currentCourses.filter(course => 
      course.schedules.some(schedule => schedule.weekdays.includes(day))
    );
    console.log(`Courses for ${day}:`, coursesByDay[day]);
  });
  console.log('coursesByDay:', coursesByDay);

  const switchCalendar = (calendarNumber) => {
    setActiveCalendar(calendarNumber);
  };
  
  return (
    <div>
      <Grid container spacing={0.5}>
        {daysOfWeek.map((day, dayIndex) => (
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
              elevation={3.5}
              className={`dayColumn ${day === 'Time' ? 'timeColumn' : ''}`}
              style={{
                background: day === 'Time' ? 'white' : 'white',
                width: day === 'Time' ? '80%' : '100%',
                height: '700px'
              }}
            >
              {[...Array(28)].map((_, halfHour) => (
                <div
                  className={halfHour % 2 === 0 ? 'hourBlock timeBlock' : 'halfHour timeBlock'} // Include 'timeBlock' class
                  key={halfHour}
                  style={{ top: `${halfHour * 25}px` }}
                >
                  {day === 'Time' && halfHour % 2 === 0 && `${halfHour / 2 + 8}:00`}
                </div>
              ))}
              {dayIndex > 0 && coursesByDay[day].map((course) => (
                <div
                  className="course"
                  style={calculateCourseStyle(course, day)}
                  key={course.CourseCode} // Assuming CourseCode is a unique identifier
                  onClick={() => handleClassClick(course)}
                >
                  {course.name} {/* Adjust to display the desired course information */}
                  <Button
                    className="remove-button"
                    variant="text"
                    color="secondary"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent onClick of the course from triggering
                      removeCourse(course);
                    }}
                  >
                    x
                  </Button>
                </div>
              ))}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );  
};

export default Scheduler;
