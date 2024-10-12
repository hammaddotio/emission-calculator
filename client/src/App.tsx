import React from 'react'
import Loading from './components/antdComponents/Loading';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import FormTabs from './pages/user/Tabs';
import Navbar from './common/Navbar';

const App: React.FC = () => {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<FormTabs />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App
