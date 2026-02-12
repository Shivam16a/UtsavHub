import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Home from './pases/Home'
import "./App.css"
import Register from './pases/Register'
import Login from './pases/Login'

const App = () => {
  return (
    <BrowserRouter>
      <Home/>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App