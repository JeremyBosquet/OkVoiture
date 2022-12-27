import { Grid, Typography } from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LocationsPage from './Pages/LocationsPage/LocationsPage';
import NewLocationPage from './Pages/NewLocationPage/NewLocationPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Typography variant="h1">OkVoiture</Typography>} /> */}
        <Route path="/" element={<LocationsPage />} />
        <Route path="/louer/mon/vehicule" element={<NewLocationPage />} />
        {/* <Route path="/proposer/mon/vehicule" element={<NewLocationPage />} /> */}
      </Routes>
    </Router>
  )
}

export default App
