import logo from './logo.svg';
import './App.css';
// import './styles/styles.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RegistrationPage from './components/Registration';
import LoginPage from './components/Login';
import CreateIncident from './components/CreateIncident';
import IncidentManagement from './components/IncidentManagement';
// import IncidentManagement from '.components/IncidentLists';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/incedents' element={<IncidentManagement/>}/>
      </Routes>
    </Router>
    // <div>
      
    //       {/* <IncidentManagement /> */}
    //       {/* <IncidentManagement/> */}
    //   </div>
  );
}

export default App;
