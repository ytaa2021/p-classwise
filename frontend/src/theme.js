import { createTheme } from '@mui/material/styles';

// Define a primary and secondary color that stands out and is visually appealing
const primaryColor = '#6200EE'; // A vibrant shade of purple
const secondaryColor = '#03DAC6'; // A bright teal

const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    // Define additional colors if needed
  },
  typography: {
    fontFamily: [
      '"Poppins"', // A modern, rounded font for a fresh feel
      '"Roboto Slab"', // A slab serif for a bold statement
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 700,
      fontSize: '3rem', // Make headers large and in charge
      lineHeight: 1.2,
      letterSpacing: '-0.01562em',
      color: primaryColor, // Use the primary color for headers
    },
    h2: {
      fontFamily: '"Roboto Slab", serif',
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      color: secondaryColor, // Use the secondary color for subheaders
    },
    // Continue customizing other headings, body text, button text, etc.
    button: {
      textTransform: 'none', // Buttons typically use uppercase; this can be more readable
      fontWeight: 600,
    },
    // Define styles for other elements such as 'body1', 'caption', etc.
  },
  // Custom overrides for MUI components
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Rounded buttons for a modern look
          padding: '8px 16px', // Comfortable padding
          // Define other styles like hover, active, etc.
        },
        containedPrimary: {
          backgroundColor: primaryColor, // Use the primary color for contained buttons
          '&:hover': {
            backgroundColor: '#3700B3', // A darker shade for hover state
          },
        },
        outlinedPrimary: {
          borderColor: primaryColor, // Outlined buttons use primary color for border
          color: primaryColor, // Text color matches border
          '&:hover': {
            backgroundColor: 'rgba(98, 0, 238, 0.04)', // Slight tint on hover
          },
        },
        // Define overrides for other button variants if needed
      },
    },
    // Override styles for other components like MuiPaper, MuiCard, etc.
  },
  // You can also add a custom mixin or add a global style override
});

export default theme;
