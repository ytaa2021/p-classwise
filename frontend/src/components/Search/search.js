import React, { useState, useEffect, useRef } from 'react';
import { Paper, Typography, Button } from '@mui/material';
import './search.css';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const API_BASE_URL = 'https://api.pomona.edu/api';
const API_KEY = 'b2dde85c249d4d07bdfe152ae51a3206';
// Converts time from 12-hour format to 24-hour format
function convertTimeTo24HourFormat(time) {
  let [hours, minutes] = time.match(/\d+/g).map(Number);
  if (time.includes('PM') && hours < 12) hours += 12;
  if (time.includes('AM') && hours === 12) hours = 0;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// Converts a string of weekdays into an array
function convertWeekdaysToArray(weekdays) {
  const daysMapping = { M: 'Monday', T: 'Tuesday', W: 'Wednesday', R: 'Thursday', F: 'Friday' };
  return weekdays.split('').map(day => daysMapping[day]);
}

const fetchCourses = async (termKey, courseAreaCode) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Courses/${termKey}/${courseAreaCode}/?api_key=${API_KEY}`);
    const apiCourses = response.data;
    return apiCourses.map(apiCourse => {
      // need to implement correct scheduling logic
      let schedules = apiCourse.Schedules ? apiCourse.Schedules.map(s => {
        // Extract and format the meetTime, room, and weekdays
        const [time, location] = s.MeetTime.split('.'); // Assumes format "01:15-02:30PM. RN Room 104"
        const [startTime, endTime] = time.split('-').map(t => convertTimeTo24HourFormat(t.trim())); // Implement this conversion
        return {
          startTime,
          endTime,
          room: s.Room,
          weekdays: convertWeekdaysToArray(s.Weekdays),
          buildingCode: s.BuildingCode,
          building: s.Building,
          campus: s.Campus,
          meetTime: s.MeetTime,
          room: s.Room,
          weekdays: s.Weekdays
        };
      }) : [];

      let instructors = apiCourse.Instructors ? apiCourse.Instructors.map(instr => ({
        emailAddress: instr.EmailAddress,
        name: instr.Name,
        cxId: instr.CxID
      })) : [];

      return {
        catalog: apiCourse.Catalog,
        CourseCode: apiCourse.CourseCode,
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
const Search = ({
  onSearch,
  expandedBlocks,
  addCourse,
  removeCourse,
  toggleClassBlock,
  handleClassClick,
  courseAreas,
}) => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCourseList, setShowCourseList] = useState(false);
  const searchRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArea, setSelectedArea] = useState('');
  const coursesPerPage = 20; // Adjust as needed
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses && courses.length > 0 
    ? courses.slice(indexOfFirstCourse, indexOfLastCourse)
    : [];
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (selectedArea) {
      // Fetch courses for the selected area
      console.log(selectedArea)
      fetchCourses('2023;FA', selectedArea).then(fetchedCourses => {
        setCourses(fetchedCourses);
      });
    }
  }, [selectedArea]);
  const handleSearch = () => {
    const filteredCourses = courses.filter((course) =>
      course.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onSearch(filteredCourses);
  };

  const handleFocus = () => {
    setShowCourseList(true);
  };

  const handleBlur = () => {
    // Add a small delay to allow the click on the course list to register
    setTimeout(() => {
      setShowCourseList(false);
    }, 200);
  };

  const handleDocumentClick = (event) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target) &&
      event.target.className !== 'small-button' &&
      event.target.className !== 'classBlock'
    ) {
      setShowCourseList(false);
    }
  };


  const handleAreaChange = (event) => {
    setSelectedArea(event.target.value);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);
  return (
    <div className="search" ref={searchRef}>
      <select value={selectedArea} onChange={handleAreaChange}>
        {courseAreas.map(area => (
          <option key={area.Code} value={area.Code}>{area.Description}</option>
        ))}
      </select>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for courses"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button className="search-button" onClick={handleSearch}>
          <SearchIcon />
        </button>
      </div>
        {showCourseList && (
          <div className="course-list-container">
            <div className="course-list" style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {currentCourses.map((course) => (
                <Paper elevation={3} className="classBlock" key={course.CourseCode} onClick={() => handleClassClick(course)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                    <div style={{ flexGrow: 1 }}>
                      <Typography variant="h6">{course.Name}</Typography>
                      <Typography variant="body2">Code: {course.CourseCode}</Typography>
                      <Typography variant="body2">Department: {course.department}</Typography>
                      <Typography variant="body2">Credits: {course.credits}</Typography>
                      <Typography variant="body2">Status: {course.courseStatus}</Typography>
                      {course.schedules.map((schedule, index) => (
                      <Typography variant="body2" key={index}>
                        {`${Array.isArray(schedule.weekdays) ? schedule.weekdays.join(', ') : schedule.weekdays}: ${schedule.startTime} - ${schedule.endTime} at ${schedule.room}`}
                      </Typography>
                    ))}
                    </div>
                    <div>
                      <Button
                        className="small-button"
                        variant="outlined"
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          addCourse(course);
                        }}
                      >
                        +
                      </Button>
                      <Button
                        className="small-button"
                        variant="outlined"
                        color="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeCourse(course);
                        }}
                      >
                        -
                      </Button>
                    </div>
                  </div>
                  {expandedBlocks[course.Name] && (
                    <div style={{ padding: '10px' }}>
                      <Typography variant="body2">Description: {course.description}</Typography>
                      <Typography variant="body2">Instructors: {course.instructors.map(instr => instr.name).join(', ')}</Typography>
                    </div>
                  )}
                  <Button
                    className="expand-icon"
                    variant="text"
                    color="primary"
                    onClick={() => toggleClassBlock(course.Name)}
                    style={{ alignSelf: 'flex-end', margin: '10px' }}
                  >
                    {expandedBlocks[course.Name] ? 'Less' : 'More'}
                  </Button>
                </Paper>
              ))}
            </div>
            <div className="pagination">
              {[...Array(Math.ceil(courses.length / coursesPerPage)).keys()].map(number => (
                <button key={number} onClick={() => paginate(number + 1)}>
                  {number + 1}
                </button>
              ))}
            </div>
          </div>
        )}

    </div>
  );
};

export default Search;
