import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useNavigate } from 'react-router-dom'
import useAuth from '~/hooks/useAuth'
import { IAuthFormProps } from '~/interfaces'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { authValidationSchema } from '~/utils/validation'
import InputTextForm from '~/components/InputTextForm'

export default function Login() {
  const navigate = useNavigate()
  const { idToken, user, login } = useAuth()

  const defaultValues: IAuthFormProps = {
    username: '',
    password: ''
  }
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IAuthFormProps>({
    defaultValues: defaultValues,
    resolver: yupResolver(authValidationSchema)
  })

  useEffect(() => {
    if (user?.isAdmin) {
      navigate('/admin')
    } else if (idToken) {
      navigate('/')
    } else {
      navigate('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToken])

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <Box sx={{ mt: 1 }}>
          <form onSubmit={handleSubmit(login)}>
            <InputTextForm
              control={control}
              name='username'
              label='Username'
              type='text'
              error={errors.username?.message}
              variant='standard'
            />
            <InputTextForm
              control={control}
              name='password'
              label='Password'
              error={errors.password?.message}
              type='password'
              variant='standard'
            />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Login
            </Button>
          </form>
          <Button
            fullWidth
            type='button'
            onClick={() => navigate('/register')}
            variant='contained'
            sx={{ mt: 1, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
