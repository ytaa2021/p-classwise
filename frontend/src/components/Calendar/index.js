import React from 'react';
import axios from 'axios';
import { Grid, Paper, Typography, Divider } from '@mui/material';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const courses = [ //curr added courses
  {
    day: 'Monday',
    startTime: 9,
    endTime: 10.5, 
    title: "Machine Learning"
  },
  {
    day: 'Tuesday',
    startTime: 10,   
    endTime: 11.5, 
    title: "Physics 101"
  },
];
const calculateCourseStyle = (course) => {
  const hourHeight = 50; // each hour block is this height.
  const topOffset = (course.startTime - 8) * hourHeight;
  const courseHeight = (course.endTime - course.startTime) * hourHeight;
  
  return {
    top: `${topOffset}px`,
    height: `${courseHeight}px`
  };
};

const Scheduler = () => {
  return (
    <Grid container spacing={2}>
      {daysOfWeek.map(day => (
        <Grid item xs={2} key={day}>
          <Typography variant="h6" gutterBottom>
            {day}
          </Typography>
          <Paper elevation={3} className="dayColumn">
            {[...Array(24)].map((_, halfHour) => (
              <div className={halfHour % 2 === 0 ? "hourBlock" : "halfHour"} key={halfHour} style={{top: `${halfHour * 25}px`}}>
                {halfHour % 2 === 0 && (halfHour / 2 + 8) + ":00"}
              </div>
            ))}
            {courses.filter(course => course.day === day).map(course => (
              <div 
                className="course" 
                style={calculateCourseStyle(course)} 
                key={course.title}
              >
                {course.title}
              </div>
            ))}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Scheduler;