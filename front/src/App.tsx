import { Grid, Typography } from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewLocationPage from './Pages/NewLocationPage/NewLocationPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Typography variant="h1">OkVoiture</Typography>} /> */}
        <Route path="/" element={<NewLocationPage />} />
        {/* <Route path="/proposer/mon/vehicule" element={<NewLocationPage />} /> */}
      </Routes>
    </Router>
  )
}

export default App
