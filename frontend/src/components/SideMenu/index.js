import React from 'react';
import { Popover, Tabs, Tab, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function SideMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);

  return (
    <div>
      <div style={{ position: 'fixed', top: 0, right: 0, padding: '10px' }}>
        <IconButton edge="end" color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
        </IconButton>
      </div>
      <Popover
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
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
      </Popover>
    </div>
  );
}

export default SideMenu;
