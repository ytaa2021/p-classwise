import React, { useState } from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import './search.css';

const Search = ({
  courses,
  onSearch,
  allCourses,
  expandedBlocks,
  addCourse,
  removeCourse,
  toggleClassBlock,
  handleClassClick
}) => {
  const [searchTerm, setSearchTerm] = useState('');


  const handleSearch = () => {
    const filteredCourses = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    onSearch(filteredCourses);
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

      <Typography variant="h6" gutterBottom>
        All Classes
      </Typography>

{/* max height here changes the height  of the scroll part*/}
      <div className="course-list" style={{ maxHeight: '600px', overflowY: 'auto' }}>
        {allCourses.map((course) => (
          <Paper elevation={3} className="classBlock" key={course.title} onClick={() => handleClassClick(course)} >
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
              {expandedBlocks[course.title] && (
                <div>
                  <Typography variant="body2">
                    Description: {course.description}
                  </Typography>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  className="v-icon" 
                  variant="text"
                  color="primary"
                  onClick={() => toggleClassBlock(course.title)}
                >
                  {expandedBlocks[course.title] ? "^" : "v"}
                </Button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
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
              </div>
            </div>
          </Paper>
        ))}
      </div>
    </div>
  );
};

export default Search;
