import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { User } from '@/types/user'
import { $axios } from '~/utils/api'

@Module({
  name: 'users',
  stateFactory: true,
  namespaced: true
})
export default class Users extends VuexModule {
  public user = {} as User


  public get getUser () {
    return this.user
  }

  @Mutation
  private setUser(payload: User) {
    this.user = payload
  }

  @Action({ rawError: true })
  public async fetchUserById(userId: number) {
    const { data } = await $axios.get<User>(`/api/v1/users/${userId}`)
    this.setUser(data)
  }


}
