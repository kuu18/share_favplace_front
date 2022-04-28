import { Module, VuexModule } from 'vuex-module-decorators'

@Module({ name: 'Default' })
export default class DefaultModule extends VuexModule {
  loggedIn: boolean = false

  get getLoggedIn(): boolean {
    return this.loggedIn
  }
}