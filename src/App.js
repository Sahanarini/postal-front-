// src/Router.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './components/Home';

import Register from './components/User/Register';
import Homepage from './components/pages/Homepage';
import './index.css';
import Profile from './components/User/Profile';
import LoginPage from './components/Login/Login';
import PostLogin from './components/Login/PostOfficeLogin';
import Adminhome from './components/Admin/Adminhome';
import AddPostOfficeHeadForm from './components/Admin/AddPost';
import MailAddressForm from './components/Mail/ApplyMail';
import OfficeLanding from './components/PostOffice/OfficeLanding';
import EmployeeRegistration from './components/PostOffice/AddEmp';
import LoginForm from './components/Employee/EmpLogin';
import Postage from './components/PostageCal/Postage';
import MailsView from './components/PostOffice/FromOfc';
import LocatePost from './components/LocatePostoffice/Locatepost';
import MailsView1 from './components/PostOffice/ToOfc';
import Landing from './components/PostOffice/Landing';
import EmployeeDashboard from './components/Employee/EmployeeDashboard';
import PickupDashboard from './components/Employee/Pickup';
import Adapp from './components/Admin/Adapp';
import Delivery from './components/Employee/Delivery';
import Postapp from './components/PostOffice/Postapp';
import Empapp from './components/Employee/Empapp';
import PaymentPage from './components/payment/Payment';
import UserMailView from './components/User/ViewMail';




const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        < Route path='/PostLogin' element={<PostLogin />} />
        <Route path='/admin' element={<Adapp/>} /> 
        <Route path='/addpostofficehead' element={<AddPostOfficeHeadForm />} />
        <Route path='/addMail' element={<MailAddressForm />} />
        <Route path='/postoffice' element={<Postapp />} />
        <Route path='/addemployee' element={<EmployeeRegistration />} />
        <Route path='/emplogin' element={<LoginForm/>}/>
        <Route path='/postage' element={<Postage/>}/>
        <Route path='/mailview' element={<MailsView/>}/>
        <Route path='/locatepost' element={<LocatePost/>}/>
        <Route path='/topost' element={<MailsView1 />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='/EmployeeDashboard' element={<EmployeeDashboard/>}/>
        <Route path='/pickup' element={<PickupDashboard/>}/>
        <Route path='/delivery' element={<Delivery/>}/>
        <Route path="/payment" element={<PaymentPage/>} />
        <Route path='/usermailview' element={<UserMailView/>} />


        
      
       

      </Routes>
    </Router>
  );
};

export default AppRouter;
