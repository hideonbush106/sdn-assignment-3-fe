import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
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
import { AppRegistrationRounded } from '@mui/icons-material'
import { notifyError, notifySuccess } from '~/utils/toastify'
import { post } from '~/utils/api'
import { AxiosError } from 'axios'

export default function Register() {
  const navigate = useNavigate()
  const { idToken, user } = useAuth()

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
      navigate('/register')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToken])

  const register = async (data: IAuthFormProps) => {
    try {
      await post('/public/register', data)
      notifySuccess('Registerd successfully')
    } catch (error) {
      if (error instanceof AxiosError) {
        notifyError(error.response?.data.message || 'An error occurred')
      } else {
        notifyError('An unexpected error occurred')
      }
    }
  }

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
          <AppRegistrationRounded />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Register
        </Typography>
        <Box sx={{ mt: 1 }}>
          <form onSubmit={handleSubmit(register)}>
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
              Register
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  )
}
