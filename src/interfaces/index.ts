/* eslint-disable @typescript-eslint/no-explicit-any */
import { SxProps } from '@mui/material'
import { Control } from 'react-hook-form'

export interface IUserInfoProps {
  id: string
  username: string
  isAdmin: boolean
}

export interface IUserList {
  _id: string
  createdAt: string
  updatedAt: string
  username: string
}

export interface ICategoryList {
  _id: string
  createdAt: string
  updatedAt: string
  name: string
}

export interface IAuthContextProps {
  user: IUserInfoProps | undefined
  idToken: string | null
  login: ({ username, password }: IAuthFormProps) => Promise<void>
  logout: () => Promise<void>
  update: (username: string) => Promise<void>
}

export interface IAuthFormProps {
  username: string
  password: string
}

export interface IFormInputProps {
  name: string
  label?: string
  control: Control<any>
  error?: string
  type?: 'password' | 'date' | 'checkbox' | 'radio' | 'email' | 'hidden' | 'number'
  sx?: SxProps
  variant: 'outlined' | 'standard'
  multiline?: boolean
  rows?: number
  value?: string
  placeholder?: string
  defaultValues?: any
}

export interface IOrchid {
  _id: string
  name: string
  image: string
  category: ICategory
  slug: string
}

export interface ICategory {
  _id: string
  name: string
}

export interface IUser {
  _id: string
  username: string
}

export interface IComment {
  comment: string
  author: IUser
  _id: string
  createdAt: string
  updatedAt: string
}

export interface IModal {
  open: boolean
  onClose: (event: object, reason: 'backdropClick' | 'escapeKeyDown') => void
}

export interface IOrchidDetail {
  _id: string
  name: string
  image: string
  isNatural: boolean
  slug: string
  origin: string
  category: ICategory
  comments: IComment[]
  updatedAt?: string
  createdAt?: string
}

export interface IOrchidRequest {
  name: string
  image: string
  isNatural: boolean
  origin: string
  category: string
}
