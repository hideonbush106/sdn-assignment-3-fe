import { string, object } from 'yup'
export const authValidationSchema = object().shape({
  username: string().required('Username is required'),
  password: string().required('Password is required')
})
