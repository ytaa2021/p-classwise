import React, { useState, useEffect, useRef } from 'react';
import { Paper, Typography, Button } from '@mui/material';
import './search.css';
import SearchIcon from '@mui/icons-material/Search';

const Search = ({
  courses,
  onSearch,
  allCourses,
  expandedBlocks,
  addCourse,
  removeCourse,
  toggleClassBlock,
  handleClassClick,
}) => {
  console.log("All Available Courses in Search:", allCourses); // Inside Search component

  const [searchTerm, setSearchTerm] = useState('');
  const [showCourseList, setShowCourseList] = useState(false);
  const searchRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 20; // Adjust as needed
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = allCourses.slice(indexOfFirstCourse, indexOfLastCourse);

const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const handleSearch = () => {
    const filteredCourses = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
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

  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  return (
    <div className="search" ref={searchRef}>
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
            <Paper elevation={3} className="classBlock" key={course.courseCode} onClick={() => handleClassClick(course)}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                  <Button
                    className="small-button"
                    variant="outlined"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent propagation to document click handler
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
                      e.stopPropagation(); // Prevent propagation to document click handler
                      removeCourse(course);
                    }}
                  >
                    -
                  </Button>
                </div>
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <Typography variant="subtitle1" gutterBottom>
                    {course.courseCode}
                  </Typography>
                </div>
                <div style={{ flex: 1, textAlign: 'right' }}>
                  <Button
                    className="v-icon"
                    variant="text"
                    color="primary"
                    onClick={() => toggleClassBlock(course.title)}
                  >
                    {expandedBlocks[course.title] ? '^' : 'v'}
                  </Button>
                </div>
              </div>
              {expandedBlocks[course.title] && (
                <div>
                  <Typography variant="body2">
                    Time: {`${course.startTime} - ${course.endTime}`}<br />
                    Professor: {course.instructors}<br />
                    Description: {course.description}
                  </Typography>
                </div>
              )}
            </Paper>
          ))}
        </div>
        <div className="pagination">
          {[...Array(Math.ceil(allCourses.length / coursesPerPage)).keys()].map(number => (
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
