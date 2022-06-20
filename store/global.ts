import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { Route, Location } from 'vue-router'

interface Toast {
  msg?: string | string[] | null,
  color?: string,
  timeout?: number
}
@Module({
  name: 'global',
  stateFactory: true,
  namespaced: true
})
export default class Global extends VuexModule {
  private appBarHeight = 56
  private rememberRoute: Location = {
    name: 'index',
    params: {}
  }

  private toast: Toast = {
    msg: null,
    color: 'error',
    timeout: 4000
  }

  public get getAppBarHeight (): number {
    return this.appBarHeight
  }

  public get getRememberRoute () {
    return this.rememberRoute
  }

  public get getToast () {
    return this.toast
  }

  @Mutation
  private setRememberRoute (payload: Route) {
    this.rememberRoute.name = String(payload.name)
    this.rememberRoute.params = payload.params
  }

  @Action({ rawError: true })
  public commitRememberRoute (route: Route) {
    route = route || { name: 'index', params: {} }
    this.setRememberRoute(route)
  }

  @Mutation
  private setToast (payload: Toast) {
    this.toast.msg = payload.msg
    this.toast.color = payload.color || 'error'
    this.toast.timeout = payload.timeout || 4000
  }

  @Action({ rawError: true })
  public commitToast (toast: Toast) {
    this.setToast(toast)
  }
}
