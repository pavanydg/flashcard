import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Home } from './pages/Home'
import { CreateCard } from './pages/CreateCard'
import NavBar from './components/NavBar'
import { EditPage } from './pages/EditPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/home' element={<Home />} />
          <Route path='/create' element={<CreateCard />} />
          <Route path='/edit' element={<EditPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
