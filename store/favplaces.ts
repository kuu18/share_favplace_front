import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { FavplacesGetResponse, Favplace } from '../types/Favplace';
import { $axios } from '~/utils/api'

@Module({
  name: 'favplaces',
  stateFactory: true,
  namespaced: true
})
export default class Favplaces extends VuexModule {
  private favplace = {} as Favplace
  private timeLineFavplaces: Array<Favplace> = []
  private currentUserFavplaces: Array<Favplace> = []
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
    const address = (favplace: Favplace) => favplace.prefecture + ' ' + favplace.municipality + favplace.address
    return address
  }

  @Mutation
  private setTimeLineFavplaces (payload: Array<Favplace>) {
    payload.forEach(fp => this.timeLineFavplaces.push(fp))
  }

  @Mutation
  private setCurrenUserFavplaces (payload: Array<Favplace>) {
    payload.forEach(fp => this.currentUserFavplaces.push(fp))
  }

  @Mutation
  private setFavplaceCount (payload: number) {
    this.favplaceCount = payload
  }

  @Mutation
  private setFavplace (payload: Favplace) {
    this.favplace = payload
  }

  @Action({ rawError: true })
  public commitTimeLineFavplaces (favplaces: Array<Favplace>) {
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
    const { data } = await $axios.get<Favplace>(`/api/v1/favplaces/${favplaceId}`)
    this.setFavplace(data)
  }
}
