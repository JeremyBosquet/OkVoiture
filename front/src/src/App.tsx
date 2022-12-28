import { createTheme, Grid, ThemeProvider, Typography } from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LocationsPage from './Pages/LocationsPage/LocationsPage';
import NewLocationPage from './Pages/NewLocationPage/NewLocationPage';

function App() {
  const theme = createTheme();

  theme.palette.primary.main = '#424242';
  theme.palette.primary.light = '#6d6d6d';
  theme.palette.primary.dark = '#1b1b1b';
  theme.palette.primary.contrastText = '#fff';
  theme.palette.secondary.main = '#ff6f00';
  theme.palette.secondary.light = '#ff9e40';
  theme.palette.secondary.dark = '#c43e00';
  theme.palette.secondary.contrastText = '#000';

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<LocationsPage />} />
          <Route path="/louer/un/vehicule" element={<NewLocationPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
