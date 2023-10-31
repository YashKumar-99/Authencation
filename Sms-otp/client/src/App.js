import logo from './logo.svg';
import './App.css';

import { Route, Routes } from 'react-router-dom';

import Dashboard from './Pages/Dashboard';
import SendOtp from './Pages/SendOtp';
import VerfiyOtp from './Pages/VerfiyOtp';


import Auth from './components/Auth';

import Router from './Routes'

function App() {


  return (
    <>
      <Auth />
      <Router />
      {/* <Routes>

        <Route path='/' element={<Dashboard />} />


        <Route path='/page/sendotp' element={<SendOtp />} />
        <Route path='/page/verifyotp' element={<VerfiyOtp />} />

      </Routes > */}
      {/* <Auth /> */}

    </>
  );
}

export default App;
