import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '~/hooks/useAuth'
import AuthProvider from '~/contexts/AuthContext'

export default function ButtonAppBar({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  return (
    <>
      <AuthProvider>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position='static'>
            <Toolbar
              sx={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <Typography variant='h6' component={Link} to={'/'} sx={{ width: 'fit-content', mr: 10 }}>
                Orchid Shop
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 3
                }}
              >
                {user ? (
                  <Typography component={Link} to='/me' variant='h6'>
                    Hello, {user?.username}
                  </Typography>
                ) : null}
                {user?.isAdmin ? (
                  <Button color='inherit' variant='outlined' onClick={() => navigate('/admin')}>
                    dashboard
                  </Button>
                ) : null}
                {!user ? (
                  <Button color='inherit' onClick={() => navigate('/login')}>
                    Login
                  </Button>
                ) : (
                  <Button color='inherit' onClick={logout}>
                    Logout
                  </Button>
                )}
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      </AuthProvider>
      {children}
    </>
  )
}
