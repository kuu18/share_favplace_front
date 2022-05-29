import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { Route, Location } from 'vue-router';

@Module({
  name: 'global',
  stateFactory: true,
  namespaced: true
})
export default class Global extends VuexModule {
  private appBarHeight = 56;
  private rememberRoute: Location = { name: 'index', params: {} };


  public get getAppBarHeight(): number {
    return this.appBarHeight;
  }

  public get getRememberRoute() {
    return this.rememberRoute;
  }

  @Mutation
  private setRememberRoute (payload: Route) {
    this.rememberRoute.name = String(payload.name);
    this.rememberRoute.params = payload.params;
  }

  @Action({ rawError: true })
  public commitRememberRoute(route: Route) {
    route = route || { name: 'index', params: {} };
    this.setRememberRoute(route);
  }

}