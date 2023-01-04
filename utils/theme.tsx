import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: ['"Roboto"', '"Helvetica"', '"Arial"', 'sans-serif'].join(','),
    fontSize: 13,
  },
  spacing: 8,
});
export default theme;
