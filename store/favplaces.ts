import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { ResponseFavplace, FavplacesGetResponse } from '../types/Favplace'
import { $axios } from '~/utils/api'

@Module({
  name: 'favplaces',
  stateFactory: true,
  namespaced: true
})
export default class Favplaces extends VuexModule {
  private favplaces: Array<ResponseFavplace> = []
  private timeLineFavplaces: Array<ResponseFavplace> = []
  private currentUserFavplaces: Array<ResponseFavplace> = []
  private favplaceCount?: number

  public get getFavplaces () {
    return this.favplaces
  }

  public get gettimeLineFavplaces () {
    return this.timeLineFavplaces
  }

  public get getCurrenUserFavplaces () {
    return this.currentUserFavplaces
  }

  public get getFavplace () {
    const favplace = (id: number) => this.favplaces.find(favplace => favplace.id === id)
    return favplace
  }

  public get getFavplaceCount () {
    return this.favplaceCount
  }

  @Mutation
  private setFavplaces (payload: Array<ResponseFavplace>) {
    payload.forEach((responseFavplace) => {
      if (!this.favplaces.find(favplace => favplace.id === responseFavplace.id)) { this.favplaces.push(responseFavplace) }
    })
  }

  @Mutation
  private setTimeLineFavplaces (payload: Array<ResponseFavplace>) {
    payload.forEach(fp => this.timeLineFavplaces.push(fp))
  }

  @Mutation
  private setCurrenUserFavplaces (payload: Array<ResponseFavplace>) {
    payload.forEach(fp => this.currentUserFavplaces.push(fp))
  }

  @Mutation
  private setFavplaceCount (payload: number | undefined) {
    this.favplaceCount = payload
  }

  @Action({ rawError: true })
  public commitTimeLineFavplaces (favplaces: Array<ResponseFavplace>) {
    this.setTimeLineFavplaces(favplaces)
  }

  @Action({ rawError: true })
  public async fetchCurrenUserFavplaces ({ userId, pageIndex }: {userId: number, pageIndex: number}) {
    const { data } = await $axios.get<FavplacesGetResponse>(`/api/v1/favplaces/user/${userId}/${pageIndex}`)
    this.setCurrenUserFavplaces(data.favplaces)
    this.setFavplaces(data.favplaces)
    this.setFavplaceCount(data.count)
  }
}
