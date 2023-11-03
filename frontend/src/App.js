import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import { auth } from './firebaseConfig';
import Auth from './Auth';
import { Grid, Paper, Typography } from '@mui/material';
import './App.css';

import axios from 'axios';

const BASE_URL = 'TODO: BACKEND URL'; 

export const searchCourses = async (searchTerm) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, { 
      params: { term: searchTerm }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching courses", error);
    return [];
  }
}


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
    title: "Physics 201"
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


const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(
      (user) => setIsSignedIn(!!user)
    );    
    return () => unregisterAuthObserver(); // Cleanup on unmount
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={isSignedIn ? <Navigate to="/home" replace /> : <Auth />} />
        
        <Route path="/home" element={isSignedIn ? (
            <div className="App">
              <h1>My Calendar</h1>
              <Scheduler />
            </div>
          ) : <Navigate to="/auth" replace />
        } />

        <Route path="/" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  );
}


export default App;