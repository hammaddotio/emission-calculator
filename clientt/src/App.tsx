import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import FormTabs from './pages/user/Tabs';
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import CalculatedData from './pages/admin/CalculatedData';
import PrivateRouter from './private/PrivateRouter';
import Forbidden from './common/extra/404';
import PublicRoute from './private/PublicRouter';


const App: React.FC = () => {

  return (
    <>
      <Routes>

        <Route element={<PublicRoute />} >
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
        <Route path='/404' element={<Forbidden />} />

        {/* Protected routes for users */}
        <Route element={<PrivateRouter allowedRoles={['user']} />}>
          <Route path='/calculators' element={<FormTabs />} />
        </Route>

        {/* Protected routes for admins */}
        <Route element={<PrivateRouter allowedRoles={['admin']} />}>
          <Route path='/dashboard/users' element={<FormTabs />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/calculated-data' element={<CalculatedData />} />
          <Route path='/users' element={<Users />} />
        </Route>

        {/* Route for both user and admin
        <Route element={<PrivateRouter allowedRoles={['user', 'admin']} />}>
        </Route> */}
      </Routes>
    </>
  )
}

export default App
