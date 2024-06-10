import './globals.css';
import { Routes, Route } from 'react-router-dom';

import Homepage from './pages/home_page';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      {/* <Route path='/test' element={<TestingPage />} /> */}
      {/* <Route path="*" element={<div>404</div>} /> */}
    </Routes>
  );
}

export default App;
