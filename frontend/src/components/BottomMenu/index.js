import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import {Restore as RestoreIcon} from '@mui/icons-material'; 

function BottomMenu() {
    const [value, setValue] = React.useState(0);
  
    return (
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        {/* Add more <BottomNavigationAction /> for other menu items */}
      </BottomNavigation>
    );
  }
  
  export default BottomMenu;