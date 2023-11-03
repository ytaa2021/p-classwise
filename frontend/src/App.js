import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import { auth } from './firebaseConfig';
import Auth from './Auth';
import { Grid, Paper, Typography, Divider } from '@mui/material';
import './App.css';

import axios from 'axios';
import BottomMenu from './components/BottomMenu';
import SideMenu from './components/SideMenu/sideMenu'
import Calendar from './components/Calendar/calendar'

//Firebase stuff from their website

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that we want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const BASE_URL = 'TODO: BACKEND URL'; 

const courseData = {
  name: "ML",
  professor: "Dr. Dave",
  description: "Learn to classify wine types and whether people on the titanic died",
  rating: "4.5/5",
  requirements: ["Fulfills CS 1/3 Electives"]
};


export const searchCourses = async (searchTerm) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, { 
      params: { term: searchTerm }
    });
    return response.data;
  } catch (error) {
    console.error("Error getting courses", error);
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

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(
      (user) => setIsSignedIn(!!user)
    );    
    return () => unregisterAuthObserver(); // Cleanup on unmount
  }, []);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const updateSelectedCourse = (course) => {
    setSelectedCourse(course);
  };
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={isSignedIn ? <Navigate to="/home" replace /> : <Auth />} />
        
        <Route path="/home" element={isSignedIn ? (
            <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
          ) : <Navigate to="/auth" replace />
        } />

        <Route path="/" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  );
}


export default App;