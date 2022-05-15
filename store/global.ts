import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

@Module({
  name: 'global',
  stateFactory: true,
  namespaced: true
})
export default class Global extends VuexModule {
  private loggedIn: boolean = false;
  private appBarHeight: number = 56;

  public get getLoggedIn(): boolean {
    return this.loggedIn;
  }

  public get getAppBarHeight(): number {
    return this.appBarHeight;
  }

  @Mutation
  private setLoggedIn(payload: boolean) {
    this.loggedIn = payload;
  }

  @Action({ rawError: true })
  public login() {
    this.setLoggedIn(true);
  }

  @Action({ rawError: true })
  public logout() {
    this.setLoggedIn(false);
  }
}