import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Paper, Checkbox, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Search from '../Search/search';  // Update the import path as needed
import { allCourses } from '../../courses/allCourses';  // Update the import path as needed
import './ScrollableSideMenu.css'; // Assuming you have a CSS file

function ScrollableSideMenu({ currentCourses, handleSearch, addCourse, removeCourse, savedCourses = [], toggleClassBlock, checkboxesStates, handleClassClick }) {
  // Example state, update as needed
  const [expandedBlocks, setExpandedBlocks] = useState({});

  return (
    <div className="scrollable-side-menu">

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Saved Courses (Current)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {savedCourses.map((course, index) => (
            <Paper key={course.title + course.calendarId} className="classBlock" onClick={() => handleClassClick(course)}>
                <Typography variant="subtitle1">{course.title}</Typography>
                <Typography variant="body2">Calendar: {course.calendarId}</Typography>
              {/* Course details and actions */}
            </Paper>
          ))}
        </AccordionDetails>
      </Accordion>

      {/* Add more accordions for other sections like Saved Courses (Past), Recommender, etc. */}

    </div>
  );
}

export default ScrollableSideMenu;
