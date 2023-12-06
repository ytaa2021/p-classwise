import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Divider, Button } from '@mui/material';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import theme from './theme'; // make sure this path is correct
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
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { auth, app } from './firebaseConfig';
import Auth from './Auth'
// TODO: Add SDKs for Firebase products that we want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const API_BASE_URL = 'https://api.pomona.edu/api';
const API_KEY = 'b2dde85c249d4d07bdfe152ae51a3206'; // Ideally should be in an .env file

const fetchCourses = async (termKey, courseAreaCode) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Courses/${termKey}/${courseAreaCode}/?api_key=${API_KEY}`);
    const apiCourses = response.data;
    console.log(apiCourses)
    return apiCourses.map(apiCourse => {
      // Extract only if Schedules and Instructors are not null
      let schedules = apiCourse.Schedules ? apiCourse.Schedules.map(s => ({
        buildingCode: s.BuildingCode,
        building: s.Building,
        campus: s.Campus,
        meetTime: s.MeetTime,
        room: s.Room,
        weekdays: s.Weekdays
      })) : [];

      let instructors = apiCourse.Instructors ? apiCourse.Instructors.map(instr => ({
        emailAddress: instr.EmailAddress,
        name: instr.Name,
        cxId: instr.CxID
      })) : [];

      return {
        catalog: apiCourse.Catalog,
        courseCode: apiCourse.CourseCode,
        courseStatus: apiCourse.CourseStatus,
        credits: apiCourse.Credits,
        department: apiCourse.Department,
        description: apiCourse.Description,
        gradingStyle: apiCourse.GradingStyle,
        instructors: instructors,
        name: apiCourse.Name,
        note: apiCourse.Note,
        permCount: apiCourse.PermCount,
        primaryAssociation: apiCourse.PrimaryAssociation,
        requisites: apiCourse.Requisites,
        schedules: schedules,
        seatsFilled: apiCourse.SeatsFilled,
        seatsTotal: apiCourse.SeatsTotal,
        session: apiCourse.Session,
        subSession: apiCourse.SubSession,
        year: apiCourse.Year
      };
    });
  } catch (error) {
    console.error(`Error fetching courses for area ${courseAreaCode}`, error);
    return [];
  }
};

async function fetchAllCourses(termKey) {
  try {
    const courseAreasResponse = await axios.get('https://api.pomona.edu/api/CourseAreas/?api_key=b2dde85c249d4d07bdfe152ae51a3206');
    const courseAreas = courseAreasResponse.data;

    let allCourses = [];

    for (const area of courseAreas) {
      const areaCourses = await fetchCourses(termKey, area.Code);
      allCourses = allCourses.concat(areaCourses);
    }

    return allCourses;
  } catch (error) {
    console.error("Error fetching all courses", error);
    return [];
  }
}




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

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [allAvailableCourses, setAllAvailableCourses] = useState([]);
  const [activeCalendar, setActiveCalendar] = useState(1);
  const [calendars, setCalendars] = useState(initialSchedules);
  const currentCourses = calendars[activeCalendar] || [];

  const [filteredCourses, setFilteredCourses] = useState([]);
  const [addedCourses, setAddedCourses] = useState([]);
  const [expandedBlocks, setExpandedBlocks] = useState({});
  const [masterCourses, setMasterCourses] = useState([]);
  const [uid, setUid] = useState(null);
  //const auth = getAuth();
  const database = getDatabase(app);
  useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged(auth, (user) => {
      setIsSignedIn(!!user);
      if (user) {
        setUid(user.uid); // Set uid when user is logged in
      } else {
        setUid(null); // Clear uid when user logs out
      }
    });
  
    return () => unregisterAuthObserver(); // Cleanup
  }, []);

  // Function to save the courses to Firebase
  const saveCoursesToFirebase = (newCalendars) => {
    set(ref(database, 'schedules/' + uid), newCalendars);
  };
  useEffect(() => {
    if (uid) { // Ensure uid is not null
      const schedulesRef = ref(database, 'schedules/' + uid);
      onValue(schedulesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setCalendars(data); // Set the schedules
        }
      }, {
        onlyOnce: true
      });
    }
  }, [uid]); // Dependency array includes uid
  

  useEffect(() => {
  const termKey = "2024;SP";
  fetchAllCourses(termKey).then(fetchedCourses => {
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
    const filteredCourses = allAvailableCourses.filter((course) =>
      course.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filteredCourses);
  };

  // below are the functions for adding to our 3 schedules, need to define here to access in both calendar and search 
  // Assuming you've already initialized Firebase and have the `database` object as shown above

const addCourse = (course) => {
  setCalendars((prevCalendars) => {
    // Check if the course is already in the active schedule
    const isCourseAlreadyAdded = (prevCalendars[activeCalendar] || []).some((c) => c.title === course.title);

    if (isCourseAlreadyAdded) {
      // If the course is already added, do not modify the calendars
      return prevCalendars;
    } else {
      // If not, add the new course to the active schedule
      const updatedCalendars = {
        ...prevCalendars,
        [activeCalendar]: [...(prevCalendars[activeCalendar] || []), course],
      };

      // Save the updated calendars to Firebase
      saveCoursesToFirebase(updatedCalendars);

      return updatedCalendars;
    }
  });
};

const removeCourse = (courseToRemove) => {
  setCalendars((prevCalendars) => {
    // Filter out the course to be removed from the active schedule
    const updatedCoursesForActiveCalendar = prevCalendars[activeCalendar].filter((course) => course !== courseToRemove);

    const updatedCalendars = {
      ...prevCalendars,
      [activeCalendar]: updatedCoursesForActiveCalendar,
    };

    // Save the updated calendars to Firebase
    set(ref(database, 'schedules/' + uid), updatedCalendars);

    return updatedCalendars;
  });
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
    <Router>
      <Routes>
        <Route path="/auth" element={isSignedIn ? <Navigate to="/home" replace /> : <Auth />} />
        
        <Route path="/home" element={isSignedIn ? (
          <ThemeProvider theme={theme}>
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
          </ThemeProvider>
          ) : <Navigate to="/auth" replace />
        } />

        <Route path="/" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  );
}

export default App;