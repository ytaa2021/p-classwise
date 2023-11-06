import React from 'react';
import { BottomNavigation } from '@mui/material';
import styled from '@emotion/styled';

const CourseInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 16px;
`;

const Stats = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 0 16px;
`;

const CourseName = styled.div`
  font-weight: bold;
`;

function BottomMenu({ course }) {
  return (
    <BottomNavigation showLabels>
      <CourseInfo>
        {course ? (
          <>
            <CourseName>{course.title}</CourseName>
            <div>Professor: {course.professor}</div>
            <div>Description: {course.description}</div>
          </>
        ) : (
          <div>Select a class</div>
        )}
      </CourseInfo>
      <Stats>
        {course ? (
          <>
            <div>Rating: {course.rating}</div>
            <div>Requirements: {course.requirements ? course.requirements.join(', ') : 'N/A'}</div>
          </>
        ) : null}
      </Stats>
    </BottomNavigation>
  );
}

export default BottomMenu;
