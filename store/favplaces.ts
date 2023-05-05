import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { Favplace, FavplacesResponse } from '../types/Favplace';
import { $axios } from '~/utils/api'

@Module({
  name: 'favplaces',
  stateFactory: true,
  namespaced: true
})
export default class Favplaces extends VuexModule {
  private favplace = {} as Favplace
  private favplaces: Array<Favplace> = []
  private timeLineFavplaces: Array<Favplace> = []
  private currentUserFavplaces: Array<Favplace> = []
  private favplaceCount = 0

  public get getTimeLineFavplaces() {
    return this.timeLineFavplaces
  }

  public get getCurrenUserFavplaces() {
    return this.currentUserFavplaces
  }

  public get getFavplaces() {
    return this.favplaces
  }

  public get getFavplaceCount() {
    return this.favplaceCount
  }

  public get getFavplace() {
    return this.favplace
  }

  public get getAddress() {
    const address = (favplace: Favplace) => favplace.prefecture + ' ' + favplace.municipality + favplace.address
    return address
  }

  @Mutation
  private setTimeLineFavplaces(payload: Array<Favplace>) {
    payload.forEach(fp => this.timeLineFavplaces.push(fp))
  }

  @Mutation
  private setCurrenUserFavplaces(payload: Array<Favplace>) {
    payload.forEach(fp => this.currentUserFavplaces.push(fp))
  }

  @Mutation
  private setFavplaces(payload: Array<Favplace>) {
    this.favplaces = payload
  }


  @Mutation
  private setFavplaceCount(payload: number) {
    this.favplaceCount = payload
  }

  @Mutation
  private setFavplace(payload: Favplace) {
    this.favplace = payload
  }

  @Mutation
  private addCurrentUserFavplaces(payload: Favplace) {
    const index = this.currentUserFavplaces.findIndex(({ id }) => id === payload.id)
    if (index !== -1) {
      this.currentUserFavplaces.splice(index, 1)
      this.timeLineFavplaces.splice(index, 1)
      this.favplaceCount--
    }
    this.currentUserFavplaces.push(payload)
    this.favplaceCount++
  }

  @Mutation
  private removeFavplace(payload: number) {
    const index = this.currentUserFavplaces.findIndex(({ id }) => id === payload)
    this.currentUserFavplaces.splice(index, 1)
    this.timeLineFavplaces.splice(index, 1)
  }

  @Action({ rawError: true })
  public commitTimeLineFavplaces(favplaces: Array<Favplace>) {
    this.setTimeLineFavplaces(favplaces)
  }

  @Action({ rawError: true })
  public commitCurrentUserFavplace(favplace: Favplace) {
    this.addCurrentUserFavplaces(favplace)
  }

  @Action({ rawError: true })
  public async fetchCurrentUserFavplaces({ userId, pageIndex }: { userId: number, pageIndex: number }) {
    const { data } = await $axios.get<FavplacesResponse>(`/api/v1/favplaces/user/${userId}/${pageIndex}`)
    this.setCurrenUserFavplaces(data.favplaces)
    this.setFavplaceCount(data.count)
  }

  @Action({ rawError: true })
  public async fetchFavplacesByUserId({ userId, pageIndex }: { userId: number, pageIndex: number }) {
    const { data } = await $axios.get<FavplacesResponse>(`/api/v1/favplaces/user/${userId}/${pageIndex}`)
    this.setFavplaces(data.favplaces)
    this.setFavplaceCount(data.count)
  }

  @Action({ rawError: true })
  public async fetchFavplaceById(favplaceId: number) {
    const { data } = await $axios.get<Favplace>(`/api/v1/favplaces/${favplaceId}`)
    this.setFavplace(data)
  }

  @Action({ rawError: true })
  public deleteFavplace(favplaceId: number) {
    this.removeFavplace(favplaceId)
  }
}
