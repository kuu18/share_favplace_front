import { Context } from '@nuxt/types'
import { FavplacesStore } from '~/store'

export default async ({ $auth }: Context) => {
  // ログイン済みかつ、ログインユーザーのFavplacesが存在しないとき
  if ($auth.loggedIn) {
    if (!FavplacesStore.getCurrenUserFavplaces.length && $auth.currentUser.id) {
      await FavplacesStore.fetchCurrenUserFavplaces($auth.currentUser.id)
    }
  }
}
