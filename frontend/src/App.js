import React from 'react';

import './App.css';
import axios from 'axios';

const BASE_URL = 'TODO: BACKEND URL'; 

export const searchCourses = async (searchTerm) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, { 
      params: { term: searchTerm }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching courses", error);
    return [];
  }
}

function App() {
  return (
    <div className="App">
      <h1>My Calendar</h1>
      <Scheduler />
    </div>
  );
}

export default App;
