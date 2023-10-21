import React from 'react';
import { Drawer, Tabs, Tab, List, ListItem, ListItemText } from '@mui/material';

function SideMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
  setTabValue(newValue);
  };
  const toggleDrawer = (open) => (event) => {
    setIsOpen(open);
  };

  return (
    <div>
      <button onClick={toggleDrawer(true)}>Open Menu</button>
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
        <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tabValue}
        onChange={handleTabChange}
        >
        <Tab label="Course Search" />
        <Tab label="Saved Courses (current)" />
        <Tab label="Saved courses (past)" />
        <Tab label="Recommender" />
        {/* Add more <Tab /> for other tabs */}
        </Tabs>
      </Drawer>
    </div>
  );
}

export default SideMenu;
