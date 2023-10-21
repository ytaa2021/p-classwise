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
        <CourseName>{course.name}</CourseName>
        <div>{course.professor}</div>
        <div>{course.description}</div>
      </CourseInfo>
      <Stats>
        <div>Rating: {course.rating}</div>
        <div>Requirements: {course.requirements.join(', ')}</div>
      </Stats>
    </BottomNavigation>
  );
}

export default BottomMenu;
