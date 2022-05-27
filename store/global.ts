import { Module, VuexModule } from 'vuex-module-decorators'

@Module({
  name: 'global',
  stateFactory: true,
  namespaced: true
})
export default class Global extends VuexModule {
  private appBarHeight: number = 56;


  public get getAppBarHeight(): number {
    return this.appBarHeight;
  }

}