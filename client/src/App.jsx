import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Home from './pases/Home'
import "./App.css"
import Register from './pases/Register'
import Login from './pases/Login'
import Profile from './components/Profile'
import EventDetails from './pases/EventDetails'
import CreateEvent from './pases/CreateEvent'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/event/:id' element={<EventDetails/>}/>
        <Route path='/create' element={<CreateEvent/>}/>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App