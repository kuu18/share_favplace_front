export interface Favplace {
  favplacename: string
  prefecture: string
  municipality: string
  address: string
  categoryIds: Array<number>
  referenceUrl: string
  imageUrl?: string
  remarks: string
  userId: number
}

export interface FavplaceSaveResponse {
  favplece: Favplace
  message: string
}
