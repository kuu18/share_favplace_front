import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { ResponseFavplace } from '../types/Favplace'
import { $axios } from '~/utils/api'

@Module({
  name: 'favplaces',
  stateFactory: true,
  namespaced: true
})
export default class Favplaces extends VuexModule {
  private nextFavplace?: ResponseFavplace
  private favplaces: Array<ResponseFavplace> = []
  private timeLineFavplaces: Array<ResponseFavplace> = []
  private currentUserFavplaces: Array<ResponseFavplace> = []

  public get getNextFavplace () {
    return this.nextFavplace
  }

  public get getFavplaces () {
    return this.favplaces
  }

  public get getCurrenUserFavplaces () {
    return this.currentUserFavplaces
  }

  public get getFavplace () {
    const favplace = (id: number) => this.favplaces.find(favplace => favplace.id === id)
    return favplace
  }

  @Mutation
  private setFavplaces (payload: Array<ResponseFavplace>) {
    payload.forEach((responseFavplace) => {
      if (!this.favplaces.find(favplace => favplace.id === responseFavplace.id)) { this.favplaces.push(responseFavplace) }
    })
  }

  @Mutation
  private setTimeLineFavplaces (payload: Array<ResponseFavplace>) {
    payload.forEach(tlFavplace => this.timeLineFavplaces.push(tlFavplace))
  }

  @Mutation
  private setCurrenUserFavplaces (payload: Array<ResponseFavplace>) {
    payload.forEach(cuFavplace => this.currentUserFavplaces.push(cuFavplace))
  }

  // TODO スケジュールから取得に変更
  @Mutation
  private setNextFavplace () {
    const today = new Date()
    const getLatestFavplace = function (a: ResponseFavplace, b: ResponseFavplace) {
      return new Date(a.createdAt) < new Date(b.createdAt) ? a : b
    }
    const favplaces = this.favplaces.filter(favplace => today <= new Date(favplace.createdAt))
    if (favplaces.length > 1) {
      this.nextFavplace = favplaces.reduce(getLatestFavplace, favplaces[0])
    }
  }

  @Action({ rawError: true })
  public commitTimeLineFavplaces (favplaces: Array<ResponseFavplace>) {
    this.setTimeLineFavplaces(favplaces)
  }

  @Action({ rawError: true })
  public async fetchCurrenUserFavplaces (userId: number) {
    const { data } = await $axios.get<ResponseFavplace[]>(`/api/v1/favplaces/user/${userId}`)
    this.setCurrenUserFavplaces(data)
    this.setFavplaces(data)
    this.setNextFavplace()
  }
}
