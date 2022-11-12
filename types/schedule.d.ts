import { Favplace } from './Favplace'
export interface Schedule {
  id: number
  name: string
  start: Date
  end: Date
  timed: Boolean
  user_id: number
  favplace: Favplace
  color: string
}
