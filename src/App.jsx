import React from 'react';
import Sidebar from './Sidebar/Sidebar.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Forgot from './Forgot/Forgot.jsx';

function App() {

 return(
  <>
  <BrowserRouter>
    <Routes>
  <Route path = "/" element = {<Login/>}/>
  <Route path = "/Signup" element = {<Signup/>}/>
  <Route path = "/Forgot" element = {<Forgot/>}/>
  <Route path = "/Sidebar" element = {<Sidebar/>}/>
    </Routes>
  </BrowserRouter>
</>
);
}
export default App;

