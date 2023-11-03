import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Button, Checkbox, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Search from '../Search/search';
import { allCourses } from '../../courses/allCourses';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BottomMenu from '../BottomMenu';

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

const Scheduler = ({onUpdateCourse}) => {
  
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [addedCourses, setAddedCourses] = useState([]);
  const [expandedBlocks, setExpandedBlocks] = useState({});
  const [ checked, setChecked ] = useState(new Array(allCourses.length).fill(false));
  const [checkboxesStates, setCheckboxesStates] = useState([
    new Array(allCourses.length).fill(false), // For schedule 1
    new Array(allCourses.length).fill(false), // For schedule 2
    new Array(allCourses.length).fill(false), // For schedule 3
  ]);
  const [currentScheduleIndex, setCurrentScheduleIndex] = useState(0);
  const [currentCourses, setCurrentCourses] = useState([...initialCourses]);
  const [savedCourses, setSavedCourses] = useState([
    [], // For schedule 1
    [], // For schedule 2
    [], // For schedule 3
  ]);

  // combine initialCourses and addedCourses into currentCourses
  //const currentCourses = [...initialCourses, ...addedCourses];

  const handleCourseClick = (course) => {
    console.log(course)
    onUpdateCourse(course);
  };

  const handleSearch = (searchTerm) => {
    const filteredCourses = currentCourses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filteredCourses);
  };

  const addCourse = (course) => {
    const updatedSavedCourses = [...savedCourses];
    const selectedCourses = updatedSavedCourses[currentScheduleIndex];
    
    // If the course is already present in the selected schedule, remove it
    const existingCourseIndex = selectedCourses.findIndex((c) => c.title === course.title);
    if (existingCourseIndex === -1) {
      selectedCourses.push(course);
    }
    
    // Update the savedCourses state
    updatedSavedCourses[currentScheduleIndex] = selectedCourses;
    setSavedCourses(updatedSavedCourses);
    //addCourseToCalender(course);
  };

  const removeCourse = (course) => {
    const updatedSavedCourses = [...savedCourses];
    const selectedCourses = updatedSavedCourses[currentScheduleIndex];

    const existingCourseIndex = selectedCourses.findIndex((c) => c.title === course.title);
    if(existingCourseIndex !== -1){
      selectedCourses.splice(existingCourseIndex, 1);
    }

    updatedSavedCourses[currentScheduleIndex] = selectedCourses;
    setSavedCourses(updatedSavedCourses);
  }

  const addCourseToCalender = (course) => {
    const updatedCheckboxesStates = [...checkboxesStates];
    const courseIndex = allCourses.findIndex((c) => c.title === course.title);
    updatedCheckboxesStates[currentScheduleIndex][courseIndex] = !updatedCheckboxesStates[currentScheduleIndex][courseIndex];
    setCheckboxesStates(updatedCheckboxesStates);

    const updatedCheck = checked.map((item, index) => (item === course ? !item : item));
    setChecked(updatedCheck);

    if (updatedCheckboxesStates[currentScheduleIndex][courseIndex]) {
      setAddedCourses([...addedCourses, course]);
    } else {
      const updatedCourses = addedCourses.filter((addedCourse) => addedCourse.title !== course.title);
      setAddedCourses(updatedCourses);
    }
  };

  const handleScheduleChange = (event) => {
    setCurrentScheduleIndex(event.target.value);
  }

  const toggleClassBlock = (title) => {
    setExpandedBlocks({
      ...expandedBlocks,
      [title]: !expandedBlocks[title],
    });
  };


  const coursesByDay = {}; 

  daysOfWeek.forEach((day) => {
    //console.log(addedCourses);
    coursesByDay[day] = addedCourses.filter((course) =>
      Array.isArray(course.day) ? course.day.includes(day) : course.day === day
    );
  });

  useEffect(() => {
    // Merge initialCourses and selected courses for the current schedule into currentCourses
    const selectedCourses = checkboxesStates[currentScheduleIndex]
      .map((isChecked, index) => (isChecked ? allCourses[index] : null))
      .filter((course) => course !== null);
      setAddedCourses([...initialCourses, ...selectedCourses]);
  }
  , [checkboxesStates, currentScheduleIndex]);

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
      <Accordion style={{marginTop: "40px"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>Course Search</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Search courses={currentCourses} onSearch={handleSearch} />
        <Typography variant="h6" gutterBottom>
          All Classes
        </Typography>
        {allCourses.map((course, index) => (
          <Paper elevation={3} className="classBlock" key={course.title} style={{marginBottom: ".5em"}}>
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
                style={{marginBottom: ".5em"}}
                checked={checkboxesStates[currentScheduleIndex][index]}
              >
                +
              </Button>
              
              {/* <Button
                variant="outlined"
                color="secondary"
                onClick={() => removeCourse(course)}
                style={{marginBottom: ".5em"}}

              >
                -
              </Button> */}
              <Button
                variant="outlined"
                color="primary"
                onClick={() => toggleClassBlock(course.title)}
                style={{marginBottom: ".5em"}}
              >
                {expandedBlocks[course.title] ? "V" : "^"}
              </Button>
            </div>
          </Paper>
        ))}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="panel1a-header"
        >
          <Typography>Saved Courses &#40;Current&#41;</Typography>
        </AccordionSummary>
          <AccordionDetails>
          {savedCourses[currentScheduleIndex].map((course, index) => (
            <Paper elevation={3} className="classBlock" key={course.title} style={{marginBottom: ".5em"}}>
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {`${course.startTime} - ${course.endTime}`}
                </Typography>
                <Checkbox
                  variant="outlined"
                  color="primary"
                  onChange={() => addCourseToCalender(course)}
                  style={{marginBottom: ".5em"}}
                  checked={checkboxesStates[currentScheduleIndex][course]}
                />
                <Button
                variant="outlined"
                color="secondary"
                onClick={() => removeCourse(course)}
                style={{marginBottom: ".5em"}}>
                -
                </Button>
              </div>
            </Paper>
          ))}
          </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="panel1a-header"
        >
          <Typography>Saved Courses &#40;Past&#41;</Typography>
        </AccordionSummary>
          <AccordionDetails>
          <Typography variant="h6" gutterBottom>
            TEST
          </Typography>
          </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="panel1a-header"
        >
          <Typography>Schedules</Typography>
        </AccordionSummary>
          <AccordionDetails>
            <FormControl>
              <RadioGroup
                defaultValue="0"
                name="radio-buttons-group"
                value={currentScheduleIndex}
                onChange={handleScheduleChange}
              >
                <FormControlLabel value="0" control={<Radio />} label="Schedule 1" />
                <FormControlLabel value="1" control={<Radio />} label="Schedule 2" />
                <FormControlLabel value="2" control={<Radio />} label="Schedule 3" />
              </RadioGroup>
            </FormControl>
          </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="panel1a-header"
        >
          <Typography>Recommender</Typography>
        </AccordionSummary>
          <AccordionDetails>
          <Typography variant="h6" gutterBottom>
            TEST
          </Typography>
          </AccordionDetails>
      </Accordion>
      </Grid>
    </Grid>
  );
};

export default Scheduler;
