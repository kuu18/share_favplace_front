import { Store } from 'vuex'
import { initialiseStores } from '~/utils/store-accsessor'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initializer = (store: Store<any>) => initialiseStores(store)
export const plugins = [initializer]
export * from '~/utils/store-accsessor'
