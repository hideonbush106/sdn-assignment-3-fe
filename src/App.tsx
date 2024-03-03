import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Public from './pages/Public'
import Login from './pages/Login'
import AuthProvider from './contexts/AuthContext'
import Dashboard from './pages/Dashboard'
import Layout from './components/Layout'
import Register from './pages/Register'
import Detail from './pages/Detail'
import Profile from './pages/Profile'

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Public />} />
            <Route path='/detail/:slug' element={<Detail />} />
            <Route
              path='/login'
              element={
                <AuthProvider>
                  <Login />
                </AuthProvider>
              }
            />
            <Route
              path='/register'
              element={
                <AuthProvider>
                  <Register />
                </AuthProvider>
              }
            />
            <Route
              path='/admin'
              element={
                <AuthProvider>
                  <Dashboard />
                </AuthProvider>
              }
            />
            <Route
              path='/me'
              element={
                <AuthProvider>
                  <Profile />
                </AuthProvider>
              }
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App
