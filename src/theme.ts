import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ff6b35' },
    secondary: { main: '#ff5722' },
    background: { default: '#0a0a0a', paper: '#111111' },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 700 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { background: '#0a0a0a', color: '#fff' },
      },
    },
  },
});

export default theme;
