import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import FormTabs from './pages/user/Tabs';
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import CalculatedData from './pages/admin/CalculatedData';

const App: React.FC = () => {

  return (
    <>
      <Routes>
        <Route path='/dashboard/users' element={<FormTabs />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/calculated-data' element={<CalculatedData />} />
        <Route path='/users' element={<Users />} />
        <Route path='/calculators' element={<FormTabs />} />
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App
