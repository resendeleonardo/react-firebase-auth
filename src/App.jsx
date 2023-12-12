import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/pages/Home';
import AuthRegister from './components/accounts/AuthRegister';
import Landing from './components/pages/Landing';
import AuthLogin from './components/accounts/AuthLogin';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<AuthLogin />} />
        <Route path='/register' element={<AuthRegister />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
