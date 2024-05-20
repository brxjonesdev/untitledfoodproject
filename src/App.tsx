import './globals.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/landing_page';
import Homepage from './pages/home_page';
import AuthorizationPage from './pages/authorization_page';

function App() {


  return (
    <Router>
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/home" element={<Homepage/>} />
      <Route path="/login" element={<AuthorizationPage/>} />
    </Routes>
  </Router>
  )
}

export default App
