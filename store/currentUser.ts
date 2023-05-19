import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { User } from '@/types/user'

@Module({
  name: 'currentUser',
  stateFactory: true,
  namespaced: true
})
export default class CurrentUser extends VuexModule {
  public currentUser = {} as User

  public get getCurrentUser () {
    return this.currentUser
  }

  @Mutation
  private setCurrentUser (payload: User) {
    this.currentUser = payload
  }

  @Mutation
  private setAvatarUrl (payload: string) {
    this.currentUser.avatarUrl = payload
  }

  @Action({ rawError: true })
  public commitCurrentUser (user: User) {
    this.setCurrentUser(user)
  }

  @Action({ rawError: true })
  public commitAvatarUrl (url: string) {
    this.setAvatarUrl(url)
  }
}
