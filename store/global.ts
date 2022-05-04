import { Module, VuexModule } from 'vuex-module-decorators'

@Module({
  name: 'global',
  stateFactory: true,
  namespaced: true
})
export default class Global extends VuexModule {
  loggedIn: boolean = false;
  appBarHeight: number = 56;

  get getLoggedIn(): boolean {
    return this.loggedIn;
  }

  get getAppBarHeight(): number {
    return this.appBarHeight;
  }
}