import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Home } from './pages/Home'
import { CartPage } from './pages/CardPage'
import { Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './components/PrivateRoute'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}

export default App