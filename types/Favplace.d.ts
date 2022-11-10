import { Category } from './Category'
import { User } from './user'

export interface Favplace {
  id?: number
  favplacename?: string
  prefecture?: string
  municipality?: string
  address?: string
  categories?: Array<Category>
  categoryName?: string
  referenceUrl?: string
  imageUrl?: string
  remarks?: string
  user?: User
  createdAt?: Date
  updatedAt?: Date
}

export interface RequestFavplace extends Favplace {
  favplacename: string
  prefecture: string
  municipality: string
  address: string
  categoryIds: Array<number>
  userId: number
}

export interface ResponseFavplace extends Favplace {
  id: number
  favplacename: string
  prefecture: string
  municipality: string
  address: string
  categories: Array<Category>
  categoryName: string
  user: User
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
