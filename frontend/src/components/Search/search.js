import React, { useState } from 'react';

const Search = ({ courses, onSearch }) => {
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
    </div>
  );
};

export default Search;
