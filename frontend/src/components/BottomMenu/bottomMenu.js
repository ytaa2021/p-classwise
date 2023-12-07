import React, { useState, useEffect } from 'react';
import { BottomNavigation } from '@mui/material';
import styled from '@emotion/styled';

const BottomMenuContainer = styled.div`
  margin-top: 50px;
  height: 400px;
  background-color: white;
  padding: 16px;
`;

const CourseInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 16px;
  width: 99%;
  overflow: visible; 
`;

const Stats = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height:200px
  align-items: flex-end;
  justify-content: center;
  padding: 0 16px;
`;

const CourseName = styled.div`
  font-weight: bold;
`;

function extractLastName(name) {
  if (!name) {
    return ''; // Return an empty string or any default value if name is not provided
  }
  // Check if the name contains a comma (assumed format: Last, First Middle)
  if (name.includes(',')) {
    return name.split(',')[0].trim(); // Return the last name (before the comma)
  } else {
    // Otherwise, assume format is First Last
    const parts = name.split(' ');
    return parts.length > 1 ? parts[parts.length - 1] : name;
  }
}

function getProfessorRating(ratingsData, school, professorFullName) {
  const lastName = extractLastName(professorFullName);
  console.log(lastName)
  for (const school in ratingsData) {
    const schoolData = ratingsData[school];
    if (schoolData) {
      for (const profName in schoolData) {
        if (extractLastName(profName) === lastName) {
          return schoolData[profName];
        }
      }
    }
  }
  return null;
}


function BottomMenu({ course }) {
  const [ratingsData, setRatingsData] = useState({});
  useEffect(() => {
    fetch('/prof_data.json')
      .then(response => response.json())
      .then(data => setRatingsData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  let professorRating = course ? getProfessorRating(ratingsData, "Claremont McKenna College", course.instructors[0].name) : null;
  
  return (
    <BottomMenuContainer>
      <BottomNavigation showLabels>
        <CourseInfo>
          {course ? (
            <>
              <CourseName>{course.name}</CourseName>
              <div>Professor: {course.instructors[0].name}</div>
              <div>Rating: {professorRating ? professorRating.overall_quality : 'N/A'}</div>
              <div>Description: {course.description}</div>
              <div>Schedules</div>
              {course.schedules && course.schedules.map((schedule, index) => (
                <div key={index}>
                  <div>Start Time: {schedule.startTime || 'N/A'}</div>
                  <div>End Time: {schedule.endTime || 'N/A'}</div>
                  <div>Weekdays: {schedule.weekdays || 'N/A'}</div>
                </div>
              ))}
            </>
          ) : (
            <div>Select a class</div>
          )}
        </CourseInfo>
        <Stats>
          {course ? (
            <>
              {/* <div>Rating: {course.rating}</div> */}
              {/* <div>Requirements: {course.requirements ? course.requirements.join(', ') : 'N/A'}</div> */}
            </>
          ) : null}
        </Stats>
      </BottomNavigation>
    </BottomMenuContainer>
  );
}

export default BottomMenu;
