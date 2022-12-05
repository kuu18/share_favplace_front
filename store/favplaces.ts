import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { ResponseFavplace, FavplacesGetResponse } from '../types/Favplace'
import { $axios } from '~/utils/api'

@Module({
  name: 'favplaces',
  stateFactory: true,
  namespaced: true
})
export default class Favplaces extends VuexModule {
  private favplace = {} as ResponseFavplace
  private timeLineFavplaces: Array<ResponseFavplace> = []
  private currentUserFavplaces: Array<ResponseFavplace> = []
  private favplaceCount: number = 0

  public get getTimeLineFavplaces () {
    return this.timeLineFavplaces
  }

  public get getCurrenUserFavplaces () {
    return this.currentUserFavplaces
  }

  public get getFavplaceCount () {
    return this.favplaceCount
  }

  public get getFavplace () {
    return this.favplace
  }

  public get getAddress () {
    const address = (favplace: ResponseFavplace) => favplace.prefecture + ' ' + favplace.municipality + favplace.address
    return address
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
  private setFavplaceCount (payload: number) {
    this.favplaceCount = payload
  }

  @Mutation
  private setFavplace (payload: ResponseFavplace) {
    this.favplace = payload
  }

  @Action({ rawError: true })
  public commitTimeLineFavplaces (favplaces: Array<ResponseFavplace>) {
    this.setTimeLineFavplaces(favplaces)
  }

  @Action({ rawError: true })
  public async fetchCurrenUserFavplaces ({ userId, pageIndex }: {userId: number, pageIndex: number}) {
    const { data } = await $axios.get<FavplacesGetResponse>(`/api/v1/favplaces/user/${userId}/${pageIndex}`)
    this.setCurrenUserFavplaces(data.favplaces)
    this.setFavplaceCount(data.count)
  }

  @Action({ rawError: true })
  public async fetchFavplaceById (favplaceId: number) {
    const { data } = await $axios.get<ResponseFavplace>(`/api/v1/favplaces/${favplaceId}`)
    this.setFavplace(data)
  }
}
