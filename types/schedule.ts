import { Favplace } from './Favplace'

export interface ScheduleData {
  startDay: string
  startTime: string
  endDay: string
  endTime: string
  allDay: boolean
}

export interface Schedule {
  id: number
  name: string
  start: string
  end: string
  timed: boolean
  scheduleData: ScheduleData
  user_id: number
  favplace: Favplace
  color: string
}

export interface ScheduleParam {
  id?: number
  start: string
  end: string
  timed: boolean
  user_id?: number
}
