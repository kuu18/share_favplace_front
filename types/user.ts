import { Role } from './Role.'

export interface User {
  id: number
  username: string
  email: string
  password: string
  roles: Array<Role>
  avatarUrl: string
  createdAt?: Date
  updatedAt?: Date
}

export interface UserParam {
  id?: number
  username: string
  email: string
  password: string
}

export interface LoginResponse {
  message: string
  access_token_exp: number
  refresh_token_exp: number
  user: User
}

export interface UserResponse {
  message: string
  user: User
}
