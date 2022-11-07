import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Global from '@/store/global'
import CurrentUser from '@/store/currentUser'
import Favplaces from '@/store/favplaces'

// eslint-disable-next-line import/no-mutable-exports
let GlobalStore: Global
// eslint-disable-next-line import/no-mutable-exports
let CurrentUserStore: CurrentUser
// eslint-disable-next-line import/no-mutable-exports
let FavplacesStore: Favplaces
function initialiseStores (store: Store<any>): void {
  GlobalStore = getModule(Global, store)
  CurrentUserStore = getModule(CurrentUser, store)
  FavplacesStore = getModule(Favplaces, store)
}

export {
  initialiseStores,
  GlobalStore,
  CurrentUserStore,
  FavplacesStore
}
