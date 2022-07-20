import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { User } from '@/types/user'

@Module({
  name: 'currentUser',
  stateFactory: true,
  namespaced: true
})
export default class CurrentUser extends VuexModule {
  public currentUser: User | null = null

  public get getCurrentUser () {
    return this.currentUser
  }

  @Mutation
  private setCurrentUser (payload: User | null) {
    this.currentUser = payload
  }

  @Mutation
  private setAvatarUrl (payload: string) {
    this.currentUser!.avatarUrl = payload
  }

  @Action({ rawError: true })
  public commitCurrentUser (user: User | null) {
    this.setCurrentUser(user)
  }

  @Action({ rawError: true })
  public commitAvatarUrl (url: string) {
    this.setAvatarUrl(url)
  }
}
