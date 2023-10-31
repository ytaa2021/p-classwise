import React, { useState } from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import Search from '../Search/search';
import { allCourses } from '../../courses/allCourses';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const initialCourses = [
  // {
  //   day: 'Monday',
  //   startTime: 9.5,
  //   endTime: 10.5,
  //   title: "Machine Learning",
  // },
  // {
  //   day: 'Tuesday',
  //   startTime: 10,
  //   endTime: 11.5,
  //   title: "Physics 101",
  // },
];

const calculateCourseStyle = (course) => {
  const hourHeight = 50;
  const topOffset = (course.startTime - 8) * hourHeight;
  const courseHeight = (course.endTime - course.startTime) * hourHeight;

  return {
    top: `${topOffset}px`,
    height: `${courseHeight}px`,
  };
};

const Scheduler = () => {
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [addedCourses, setAddedCourses] = useState(initialCourses);
  const [expandedBlocks, setExpandedBlocks] = useState({});

  // combine initialCourses and addedCourses into currentCourses
  const currentCourses = [...initialCourses, ...addedCourses];

  const handleSearch = (searchTerm) => {
    const filteredCourses = currentCourses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filteredCourses);
  };

  const addCourse = (course) => {
    setAddedCourses([...addedCourses, course]);
  };

  const removeCourse = (course) => {
    const updatedCourses = addedCourses.filter((addedCourse) => addedCourse !== course);
    setAddedCourses(updatedCourses);
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

  return (
    <Grid container spacing={2}>
      {daysOfWeek.map((day) => (
        <Grid item xs={2} key={day}>
          <Typography variant="h6" gutterBottom>
            {day}
          </Typography>
          <Paper elevation={3} className="dayColumn">
            {[...Array(24)].map((_, halfHour) => (
              <div
                className={halfHour % 2 === 0 ? "hourBlock" : "halfHour"}
                key={halfHour}
                style={{ top: `${halfHour * 25}px` }}
              >
                {halfHour % 2 === 0 && (halfHour / 2 + 8) + ":00"}
              </div>
            ))}
            {coursesByDay[day].map((course) => (
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
      <Grid item xs={2}>
        <Search courses={currentCourses} onSearch={handleSearch} />
        <Typography variant="h6" gutterBottom>
          All Classes
        </Typography>
        {allCourses.map((course) => (
          <Paper elevation={3} className="classBlock" key={course.title}>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                {course.title}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {`${course.startTime} - ${course.endTime}`}
              </Typography>
              {/* Here is where you can add what is shown inside the toggle down for the courses */}
              {expandedBlocks[course.title] && (
                <div>
                  <Typography variant="body2" gutterBottom>
                    Professor: {course.professor}
                  </Typography>
                  <Typography variant="body2">
                    Description: {course.description}
                  </Typography>
                </div>
              )}
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
                onClick={() => toggleClassBlock(course.title)}
              >
                {expandedBlocks[course.title] ? "V" : "^"}
              </Button>
            </div>
          </Paper>
        ))}
      </Grid>
    </Grid>
  );
};

export default Scheduler;
