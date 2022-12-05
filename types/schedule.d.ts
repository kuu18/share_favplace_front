import { Favplace } from './Favplace'

export interface Schedule {
  id: number
  name: string
  start: string
  end: string
  timed: Boolean
  user_id: number
  favplace: Favplace
  color: string
}
