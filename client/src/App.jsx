import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Home from './pases/Home'
import "./App.css"
import Register from './pases/Register'
import Login from './pases/Login'
import Profile from './components/Profile'
import CreateEvent from './pases/CreateEvent'
import Navbar from './components/Navbar'
import Admin from './components/Admin'
import AllUsers from './components/AllUsers'
import About from './pases/About'
import Footer from './components/Footer'
import ErrorPage from './pases/ErrorPage'
import AdminRoute from './components/AdminRoute'
import PrivateRoute from './components/PrivateRoute'
import EventOrganizer from './components/EventOrganizer'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/error' element={<ErrorPage/>}/>

        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<CreateEvent />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/about' element={<About />} />
          <Route element={<AdminRoute />}>
            <Route path='/admin' element={<Admin />}>
              <Route path='users' element={<AllUsers />} />
              <Route path='alleventorganizer' element={<EventOrganizer/>}/>
            </Route>
          </Route>
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App