import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import Global from '~/store/global';
import CurrentUser from '@/store/currentUser';

let GlobalStore: Global
let CurrentUserStore: CurrentUser;
function initialiseStores(store: Store<any>): void {
  GlobalStore = getModule(Global, store)
  CurrentUserStore = getModule(CurrentUser, store)
}

export { initialiseStores, GlobalStore, CurrentUserStore }