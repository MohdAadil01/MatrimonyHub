import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './user/auth/Login'
import Home from './components/Home';
import Register from './user/auth/Register';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register /> } />
    </Routes>
    
    
    </BrowserRouter> 
    
    </>
  )
}

export default App
