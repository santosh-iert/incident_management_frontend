import logo from './logo.svg';
import './App.css';
// import './styles/styles.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RegistrationPage from './components/Registration';
import LoginPage from './components/Login';
import IncidentManagement from './components/IncidentManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/incedents' element={<IncidentManagement/>}/>
      </Routes>
    </Router>
  );
}

export default App;
