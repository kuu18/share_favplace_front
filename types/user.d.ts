import { Role } from './Role'
export interface User {
  id?: number
  username?: string
  email?: string
  password?: string
  createdAt?: Date
  roles?: Array<Role>
  avatarUrl?: string
}

export interface LoginResponse {
  message?: string
  access_token_exp: number
  refresh_token_exp: number
  user: User
}

export interface UpdateUserResponse {
  message?: string
  user: User
}
