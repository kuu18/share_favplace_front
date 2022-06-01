import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Global from '~/store/global'
import CurrentUser from '@/store/currentUser'

// eslint-disable-next-line import/no-mutable-exports
let GlobalStore: Global
// eslint-disable-next-line import/no-mutable-exports
let CurrentUserStore: CurrentUser
function initialiseStores (store: Store<any>): void {
  GlobalStore = getModule(Global, store)
  CurrentUserStore = getModule(CurrentUser, store)
}

export { initialiseStores, GlobalStore, CurrentUserStore }
