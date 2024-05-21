import './globals.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing_page';
import Homepage from './pages/home_page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Homepage />} />
    </Routes>
  );
}

export default App;
