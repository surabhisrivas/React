import './App.css';
import Emplisting from '../employee/dashboard/Emplisting';
import Registration from '../registration/Registration';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from '../layout/NavBar';
import Contact from '../contact/ContactUs';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Registration />}></Route>
          <Route path='/employee/list' element={<Emplisting />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
