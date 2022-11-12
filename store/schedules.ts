import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { Schedule } from '../types/schedule'
import { $axios } from '~/utils/api'

@Module({
  name: 'schedules',
  stateFactory: true,
  namespaced: true
})
export default class Schedules extends VuexModule {
  public schedules: Array<Schedule> = []
  public nextSchedule: Schedule | null = null

  public get getSchedules () {
    return this.schedules
  }

  public get getNextSchedule () {
    return this.nextSchedule
  }

  @Mutation
  private setSchedules (payload: Array<Schedule>) {
    this.schedules = payload
  }

  @Mutation
  private setNextSchedule (payload: Array<Schedule>) {
    const today = new Date()
    const getLatestSchedule = function (a: Schedule, b: Schedule) {
      return new Date(a.start) < new Date(b.start) ? a : b
    }
    const schedules = payload.filter(sc => today <= new Date(sc.end))
    if (schedules.length > 1) {
      this.nextSchedule = schedules.reduce(getLatestSchedule, schedules[0])
    }
  }

  @Action({ rawError: true })
  public async fetchSchedules (userId: number) {
    const { data } = await $axios.get<Array<Schedule>>(`/api/v1/schedules/user/${userId}`)
    this.setSchedules(data)
    this.setNextSchedule(data)
  }
}
