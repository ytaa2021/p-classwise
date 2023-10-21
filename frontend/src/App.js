<<<<<<< Updated upstream
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
=======
import React from 'react';

import './App.css';
import axios from 'axios';
import BottomMenu from './components/BottomMenu';
import SideMenu from './components/SideMenu';
import Scheduler from './components/Calendar';


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
      <SideMenu />
      <h1>My Calendar</h1>
      <Scheduler />
    </div>
  );
}

export default App;
