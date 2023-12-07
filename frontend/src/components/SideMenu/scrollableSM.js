import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Paper, Checkbox, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Search from '../Search/search';  // Update the import path as needed
import { allCourses } from '../../courses/allCourses';  // Update the import path as needed
import './ScrollableSideMenu.css'; // Assuming you have a CSS file

function ScrollableSideMenu({ currentCourses, handleSearch, addCourse, removeCourse, calendars = [], toggleClassBlock, checkboxesStates, handleClassClick }) {
  // Example state, update as needed

  const [masterCourses, setMasterCourses] = useState([]);
  const [expandedBlocks, setExpandedBlocks] = useState({});
  useEffect(() => {
    setMasterCourses(getMasterCourseList());
  }, [calendars]);
  const getMasterCourseList = () => {
    const combinedCourses = Object.values(calendars).flat();
    return combinedCourses;
  };  
  const savedCourses = masterCourses;
  return (
    <div className="scrollable-side-menu">

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Saved Courses (Current)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {savedCourses.map((course, index) => (
            <Paper key={course.name + course.calendarId} className="classBlock" onClick={() => handleClassClick(course)}>
                <Typography variant="subtitle1">{course.name}</Typography>
                <Typography variant="body2">Calendar: {course.calendarId}</Typography>
              {/* Course details and actions */}
            </Paper>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Schedule Automator</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Paper>
                <Typography variant="subtitle1">Recommended Courses</Typography>
              {/* Course details and actions */}
            </Paper>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Degree Progress</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Paper>
                <Typography variant="subtitle1">Credits Complete 7/32</Typography>
              {/* Course details and actions */}
            </Paper>
            <Paper>
                <Typography variant="subtitle1">Major Courses Complete 0/13</Typography>
              {/* Course details and actions */}
            </Paper>
        </AccordionDetails>
      </Accordion>
      {/* Add more accordions for other sections like Saved Courses (Past), Recommender, etc. */}

    </div>
  );
}

export default ScrollableSideMenu;
