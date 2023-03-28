import { User } from './user'
import { Schedule } from './schedule'
import { Category } from './Category'

export interface Favplace {
  id: number
  favplacename: string
  prefecture: string
  municipality: string
  address: string
  fullAddress: string
  categoryName?: string
  category: Category
  referenceUrl?: string
  imageUrl: string
  remarks?: string
  user: User
  schedule?: Schedule
  scheduleId?: number
  createdAt: Date
  updatedAt: Date
}

export interface FavplaceParam {
  id?: number
  favplacename: string
  prefecture: string
  municipality: string
  address: string
  referenceUrl?: string
  imageUrl?: string
  remarks?: string
  categoryId: number
  userId: number
}

export interface FavplaceResponse {
  favplace: Favplace
  message: string
}

export interface FavplacesResponse {
  favplaces:Array<Favplace>
  message: string
  count: number
}
