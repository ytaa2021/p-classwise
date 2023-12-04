import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Divider, Button } from '@mui/material';
import './App.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


import axios from 'axios';
import SSM from './components/SideMenu/scrollableSM';
import BottomMenu from './components/BottomMenu/bottomMenu';
import SideMenu from './components/SideMenu/sideMenu'
import Calendar from './components/Calendar/calendar'
import Search from './components/Search/search'
import { allCourses } from './courses/allCourses';


//Firebase stuff from their website

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that we want to use
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
const API_BASE_URL = 'https://api.pomona.edu/api';
const API_KEY = 'b2dde85c249d4d07bdfe152ae51a3206'; // Ideally should be in an .env file



const fetchCourses = async (termKey) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Courses/${termKey}?api_key=${API_KEY}`);
    const apiCourses = response.data;

    return apiCourses.map(apiCourse => {
      const schedule = apiCourse.Schedules[0]; // Assuming you're interested in the first schedule
      // Parse MeetTime to extract startTime and endTime
      const [startTime, endTime] = schedule.MeetTime.split(' - '); // Adjust based on the actual format

      return {
        day: schedule.Weekdays,
        startTime: startTime,
        endTime: endTime,
        title: apiCourse.Name,
        description: apiCourse.Description,
        seatsFilled: apiCourse.SeatsFilled,
        // Add other fields as necessary
      };
    });
  } catch (error) {
    console.error("Error fetching courses", error);
    return [];
  }
};



export const searchCourses = async (searchTerm) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, { 
      params: { term: searchTerm }
    });
    return response.data;
  } catch (error) {
    console.error("Error getting courses", error);
    return [];
  }
}


const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];


// function App() {
//   return (
//     <div className="App">
//       <h1>My Calendar</h1>
//       <SideMenu />
//       <Calendar />
//       {/* <Search /> */}
//       <BottomMenu course={courseData}/>
//     </div>
//   );
// }


function App() {
  const initialSchedules = {
    1: [],
    2: [],
    3: [],
  };

  const [allAvailableCourses, setAllAvailableCourses] = useState([]);
  const [activeCalendar, setActiveCalendar] = useState(1);
  const [calendars, setCalendars] = useState(initialSchedules);
  const currentCourses = calendars[activeCalendar];

  const [filteredCourses, setFilteredCourses] = useState([]);
  const [addedCourses, setAddedCourses] = useState([]);
  const [expandedBlocks, setExpandedBlocks] = useState({});
  const [masterCourses, setMasterCourses] = useState([]);
  useEffect(() => {
    const termKey = "2023;FA"; // Example term key, adjust as needed
    fetchCourses(termKey).then(fetchedCourses => {
      setMasterCourses(fetchedCourses); // Update your state with the fetched courses
    });
  }, []); // Dependency array is empty to run only on component mount
  useEffect(() => {
  const termKey = "2023;FA";
  fetchCourses(termKey).then(fetchedCourses => {
    setAllAvailableCourses(fetchedCourses);
  });
}, []);

  useEffect(() => {
    setMasterCourses(getMasterCourseList());
  }, [calendars]);

  const getMasterCourseList = () => {
    const combinedCourses = Object.values(calendars).flat();
    return combinedCourses;
  };  

  // function for the search filtering, not fully implemented
  const handleSearch = (searchTerm) => {
    const filteredCourses = currentCourses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filteredCourses);
  };

  // below are the functions for adding to our 3 schedules, need to define here to access in both calendar and search 
  const addCourse = (course) => {
    setCalendars((prevCalendars) => {
      // Check if the course is already in the active schedule
      const isCourseAlreadyAdded = prevCalendars[activeCalendar].some((c) => c.title === course.title);
  
      if (isCourseAlreadyAdded) {
        // If the course is already added, return the calendars as is
        return prevCalendars;
      } else {
        // If not, add the new course to the active schedule
      const courseWithCalendar = { ...course, calendarId: activeCalendar };
      return {
        ...prevCalendars,
        [activeCalendar]: [...prevCalendars[activeCalendar], courseWithCalendar],
      };
      }
    });
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

  // for the buttons that switch between 3 schedules
  const switchCalendar = (calendarNumber) => {
    setActiveCalendar(calendarNumber);
  };

  // for making it show up on bottom menu
  const [selectedClass, setSelectedClass] = useState(null);
  const handleClassClick = (course) => {
    setSelectedClass(course);
  };

  return (
    <div className="App">
      <Search
            courses={currentCourses}
            onSearch={handleSearch}
            allCourses={allAvailableCourses}
            expandedBlocks={expandedBlocks}
            addCourse={addCourse}
            removeCourse={removeCourse}
            toggleClassBlock={toggleClassBlock}
            handleClassClick={handleClassClick}
          />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* buttons to switch between which of the 3 schedules looking at */}
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
          {/* <SideMenu/> */}
        </Grid>
      </Grid>
      {/* container spacing is to make the calendar and search next to each other */}
      <Grid container spacing={0}>
        <Grid item xs={8}>
          {/* rendering of the actual schedule grid */}
          <div className="custom-container"></div>
          <Calendar
            currentCourses={currentCourses}
            addCourse={addCourse}
            removeCourse={removeCourse}
            initialSchedules={initialSchedules}
            handleClassClick={handleClassClick}
          />
          <div/>
        </Grid>
        <Grid item xs={4}> {/* Assigning 4 columns to Side Menu */}
        {/* SideMenu component */}
        <SSM 
        savedCourses={masterCourses}
        handleClassClick={handleClassClick}
        />
        </Grid>
      </Grid>
      <BottomMenu course={selectedClass} handleClassClick={handleClassClick} />
    </div>
  );
}

export default App;