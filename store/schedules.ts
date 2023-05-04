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
  public nextSchedules: Array<Schedule> = []

  public get getSchedules() {
    return this.schedules
  }

  public get getNextSchedules() {
    return this.nextSchedules
  }

  public get getScheduleById() {
    const findSchedule = (id: number) => this.schedules.find(schedule => schedule.id === id)
    return findSchedule
  }

  @Mutation
  private setSchedules(payload: Array<Schedule>) {
    this.schedules = payload
  }

  @Mutation
  private addSchedules(payload: Schedule) {
    this.schedules.push(payload)
  }

  @Mutation
  private setNextSchedules(payload: Array<Schedule>) {
    this.nextSchedules = payload
  }

  @Mutation
  private removeSchedule(payload: number) {
    this.schedules.splice(payload, 1)
  }

  /**
   * スケジュール一覧更新
   * @param schedule
   */
  @Action({ rawError: true })
  public commitSchedule(schedule: Schedule) {
    const index = this.schedules.findIndex(({ id }) => id === schedule.id)
    if (index !== -1) this.removeSchedule(index)
    this.addSchedules(schedule)
  }

  /**
   * 次の予定更新
   * @param schedule
   */
  @Action({ rawError: true })
  public commitNextSchedules() {
    const today = new Date()
    const filterSchedules = this.getSchedules.filter((sc) => {
      return sc.timed ? today <= new Date(sc.end) : today <= new Date(sc.end + ' ' + '23:59')
    })
    this.setNextSchedules(filterSchedules)
  }

  /**
   * スケジュール一覧取得
   */
  @Action({ rawError: true })
  public async fetchSchedules(userId: number) {
    const { data } = await $axios.get<Array<Schedule>>(`/api/v1/schedules/user/${userId}`)
    this.setSchedules(data)
    this.commitNextSchedules()
  }

  /**
   * スケジュール削除
   * @param scheduleId 
   */
  @Action({ rawError: true })
  public deleteSchedule(scheduleId: number) {
    const index = this.schedules.findIndex(({ id }) => id === scheduleId)
    this.removeSchedule(index)
  }

  /**
   * スケジュール日時変換処理
   * @param schedule 
   */
  public formatToStringDateTime (schedule: Schedule) {
    const start = new Date(schedule.start)
    const end = new Date(schedule.end)
    let format = ''
    if (schedule.timed) {
      format = 'YYYY年MM月DD日HH時mm分'
      return (
        this.dateTimeFormat(start, format) +
        ' 〜 ' +
        this.dateTimeFormat(end, format)
      )
    } else {
      format = 'YYYY年MM月DD日'
      return (
        this.dateFormat(start, format) + ' 〜 ' + this.dateFormat(end, format)
      )
    }
  }

  /**
   * 日時フォーマット
   * @param dateTime 
   * @param format 
   */
  private dateTimeFormat (dateTime: Date, format: string) {
    format = format.replace(/YYYY/, String(dateTime.getFullYear()))
    format = format.replace(/MM/, String(dateTime.getMonth() + 1))
    format = format.replace(/DD/, String(dateTime.getDate()))
    format = format.replace(/HH/, String(dateTime.getHours()))
    format =
      dateTime.getMinutes() !== 0
        ? format.replace(/mm/, String(dateTime.getMinutes()))
        : format.substring(0, format.length - 3)
    return format
  }

  /**
   * 日付フォーマット
   * @param date 
   * @param format 
   */
  private dateFormat (date: Date, format: string) {
    format = format.replace(/YYYY/, String(date.getFullYear()))
    format = format.replace(/MM/, String(date.getMonth() + 1))
    format = format.replace(/DD/, String(date.getDate()))
    return format
  }

}
