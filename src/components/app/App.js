import './App.css';
import Emplisting from '../employee/dashboard/Emplisting';
import EmpCreate from '../employee/addemployee/EmpCreate';
import Registration from '../registration/Registration';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import NavBar from '../layout/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <h1>Welcome to Employee Management System</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Registration />}></Route>
          <Route path='/employee/list' element={<Emplisting />}></Route>
          <Route path='/employee/create' element={<EmpCreate />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
