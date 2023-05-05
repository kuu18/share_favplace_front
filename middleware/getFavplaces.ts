import { Context } from '@nuxt/types'
import { FavplacesStore, SchedulesStore } from '~/store'

export default async ({ $auth }: Context) => {
  const userId = $auth.currentUser.id
  // ログイン済みの場合
  if ($auth.loggedIn && userId) {
    // ログインユーザーのFavplacesが存在しないとき
    if (!FavplacesStore.getCurrenUserFavplaces.length) {
      await FavplacesStore.fetchCurrentUserFavplaces({ userId, pageIndex: 0 })
    }
    // ログインユーザーのスケジュールが存在しないとき
    if (!SchedulesStore.getSchedules.length) {
      await SchedulesStore.fetchSchedules(userId)
    }
  }
}
