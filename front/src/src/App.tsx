import { createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LocationsPage from './Pages/LocationsPage/LocationsPage';
import NewLocationPage from './Pages/NewLocationPage/NewLocationPage';
import { frFR } from '@mui/material/locale';
import AdminAuthPage from './Pages/AdminAuthPage/AdminAuthPage';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import Error404 from './Pages/404/404';
import('dayjs/locale/fr');

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#424242',
        light: '#6d6d6d',
        dark: '#1b1b1b',
        contrastText: '#fff',
      },
      secondary: {
        main: '#ff6f00',
        light: '#ff9e40',
        dark: '#c43e00',
        contrastText: '#000',
      },
    },
  },
  frFR
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<LocationsPage />} />
          <Route path="/louer/un/vehicule" element={<NewLocationPage />} />
          <Route path="/admin" element={<AdminAuthPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<Error404 />}/>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
