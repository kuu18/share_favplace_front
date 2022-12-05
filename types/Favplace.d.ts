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
  scheduleId?: number
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
  start: string
  end: string
  timed: Boolean
}

export interface ResponseFavplace extends Favplace {
  id: number
  favplacename: string
  prefecture: string
  municipality: string
  address: string
  categoryName: String
  user: User
  scheduleId: number
  createdAt: Date
  updatedAt: Date
}

export interface FavplaceSaveResponse {
  favplace: ResponseFavplace
  message: string
}

export interface FavplacesGetResponse {
  favplaces:Array<ResponseFavplace>
  message?: string
  count: number
}
