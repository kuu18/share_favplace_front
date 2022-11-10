import { Context } from '@nuxt/types'
import { FavplacesGetResponse } from '../types/Favplace'
import { FavplacesStore } from '~/store'

export default async ({ $auth, $axios }: Context) => {
  // ログイン済みかつ、ログインユーザーのFavplacesが存在しないとき
  if ($auth.loggedIn) {
    if (!FavplacesStore.getCurrenUserFavplaces.length && $auth.currentUser.id) {
      await $axios.$get(`/api/v1/favplaces/user/${$auth.currentUser.id}/0`)
        .then((response: FavplacesGetResponse) => {
          FavplacesStore.commitCurrenUserFavplaces(response.favplaces)
          if (response.count) { FavplacesStore.commitFavplaceCount(response.count) }
        })
    }
  }
}
