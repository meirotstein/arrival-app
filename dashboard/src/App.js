import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './Dashboard';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const HeaderPrimary = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5,
  textAlign: 'center',
  color: theme.palette.text.primary,
  marginTop: theme.spacing(3)
}));

const HeaderSecondary = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(1)
}));

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <HeaderPrimary>
        מעקב נוכחות - אימון IMI
      </HeaderPrimary>
      <HeaderSecondary>
        6.9.23
      </HeaderSecondary>
      <Dashboard/>
    </ThemeProvider>
  );
}

export default App;
