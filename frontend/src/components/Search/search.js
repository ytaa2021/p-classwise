import React, { useState } from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import { allCourses } from '../../courses/allCourses';

const Search = ({ courses, onSearch }) => {
  const [addedCourses, setAddedCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCourse, setExpandedCourse] = useState(null);

  const handleSearch = () => {
    const filteredCourses = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    onSearch(filteredCourses);
  };

  const addCourse = (course) => {
    // Make sure that the selected course is not already in the list
    if (!addedCourses.includes(course)) {
      // Add the course to the list of added courses
      setAddedCourses([...addedCourses, course]);
    }
  };
  
  const removeCourse = (course) => {
    // Remove the course from the list of added courses
    setAddedCourses(addedCourses.filter((c) => c !== course));
  };
  
  const toggleDescription = (courseID) => {
    setExpandedCourse((prevCourseID) => (
      prevCourseID === courseID ? null : courseID
    ));
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search for courses"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      
      <div className="course-list">
        <Typography variant="h6" gutterBottom>
          All Classes
        </Typography>
        {allCourses.map((course) => (
          <Paper elevation={3} className="classBlock" key={course.courseID}>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                {course.title}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {`${course.startTime} - ${course.endTime}`}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Professor: {course.professor}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => addCourse(course)}
              >
                +
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => removeCourse(course)}
              >
                -
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => toggleDescription(course.courseID)}
              >
                {expandedCourse === course.courseID ? "V" : "^"}
              </Button>
              {expandedCourse === course.courseID && (
                <div>
                  <Typography variant="body2" gutterBottom>
                    Professor: {course.professor}
                  </Typography>
                  <Typography variant="body2">
                    Description: {course.description}
                  </Typography>
                </div>
              )}
            </div>
          </Paper>
        ))}
      </div>
    </div>
  );
};

export default Search;
