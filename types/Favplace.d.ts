import { User } from './user'
import { Schedule } from './schedule'

export interface Favplace {
  id?: number
  favplacename?: string
  prefecture?: string
  municipality?: string
  address?: string
  categoryName?: String
  referenceUrl?: string
  imageUrl?: string
  remarks?: string
  user?: User
  schedule?: Schedule
  createdAt?: Date
  updatedAt?: Date
}

export interface RequestFavplace extends Favplace {
  favplacename: string
  prefecture: string
  municipality: string
  address: string
  categoryId: number
  userId: number
}

export interface ResponseFavplace extends Favplace {
  id: number
  favplacename: string
  prefecture: string
  municipality: string
  address: string
  categoryName: String
  user: User
  schedule?: Schedule
  createdAt: Date
  updatedAt: Date
}

export interface FavplaceSaveResponse {
  favplece: ResponseFavplace
  message: string
}

export interface FavplacesGetResponse {
  favplaces:Array<ResponseFavplace>
  message?: string
  count?: number
}
