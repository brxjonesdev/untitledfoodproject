import './globals.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing_page';
import Homepage from './pages/home_page';
import GamePage from './pages/game_page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/game/:roomCode" element={<GamePage />} />
      {/* <Route path="*" element={<div>404</div>} /> */}
    </Routes>
  );
}

export default App;
