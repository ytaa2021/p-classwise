import React from 'react';
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
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKCYOJIZaO4P0gQ2xWrOUejknG4dnmbgQ",
  authDomain: "p-classwise.firebaseapp.com",
  projectId: "p-classwise",
  storageBucket: "p-classwise.appspot.com",
  messagingSenderId: "504076280646",
  appId: "1:504076280646:web:af094da163143032123b47",
  measurementId: "G-ZE814S75F1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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

function App() {
  return (
    <div className="App">
      <h1>My Calendar</h1>
      <SideMenu />
      <Calendar />
      <BottomMenu course={courseData}/>
    </div>
  );
}

export default App;
