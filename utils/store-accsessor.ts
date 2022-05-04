import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import Global from '~/store/global';

let GlobalStore: Global
function initialiseStores(store: Store<any>): void {
  GlobalStore = getModule(Global, store)
}

export { initialiseStores, GlobalStore }