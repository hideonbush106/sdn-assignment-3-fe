import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUser from '~/hooks/apis/useUser'
import useAuth from '~/hooks/useAuth'

const Profile = () => {
  const { user, update, idToken } = useAuth()
  const [username, setUsername] = useState(user?.username || '')
  const [newPassword, setNewPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const { changePassword } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (idToken) {
      navigate('/me')
    } else {
      navigate('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToken])
  const changePwd = async (oldPassword: string, newPassword: string) => {
    try {
      await changePassword(oldPassword, newPassword)
      setOldPassword('')
      setNewPassword('')
    } catch (error) {
      console.log(error)
    }
  }

  const changeUsr = async (username: string) => {
    try {
      await update(username)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box>
      <Typography variant='h4' fontWeight={700} textAlign='center' sx={{ mt: 5 }}>
        Profile
      </Typography>
      <Typography variant='h6' fontWeight={700} textAlign='center' sx={{ mt: 5 }}>
        Username: {user?.username}
      </Typography>
      {user?.isAdmin ? null : (
        <>
          <Paper sx={{ p: 4, m: 2 }}>
            <Typography variant='h5' fontWeight={700}>
              Update username section
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2, ml: 2 }}>
              <TextField
                label='Username'
                value={username}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setUsername(event.target.value)
                }}
              />
              <Button color='error' variant='outlined' onClick={() => changeUsr(username)}>
                Update
              </Button>
            </Box>
          </Paper>
          <Paper sx={{ p: 4, m: 2 }}>
            <Typography variant='h5' fontWeight={700}>
              Change password section
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2, ml: 2 }}>
              <TextField
                label='Old password'
                type='password'
                value={oldPassword}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setOldPassword(event.target.value)
                }}
              />
              <TextField
                label='New password'
                type='password'
                value={newPassword}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setNewPassword(event.target.value)
                }}
              />
              <Button color='error' variant='outlined' onClick={() => changePwd(oldPassword, newPassword)}>
                Change
              </Button>
            </Box>
          </Paper>
        </>
      )}
    </Box>
  )
}

export default Profile
