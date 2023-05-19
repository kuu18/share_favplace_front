import { Context } from '@nuxt/types'
import { CurrentUserStore } from '@/store'
import { User } from '~/types/user'

interface Response {
  user: User
  access_token_exp: number
  refresh_token_exp: number
}

/**
 * ログイン状態を維持するプラグイン
 *
 */
export default async ({ $auth, $axios }: Context) => {
  // アクセストークンが有効期限以内の場合
  if ($auth.isAccessTokenAuthenticated()) {
    // apiから現在のユーザーを取得してVuexに保存
    await $axios.$get('/api/v1/users/current_user')
      .then((response: Response) => CurrentUserStore.commitCurrentUser(response.user))
      .catch(() => $auth.removeStorage())
  // アクセストークンが有効期限切れかつリフレッシュトークンが有効期限以内の場合
  } else if (!$auth.isAccessTokenAuthenticated() && $auth.isRefreshTokenAuthenticated()) {
    // アクセストークンをリフレッシュする
    await $axios.$get('/api/v1/token/refresh')
      .then((response: Response) => $auth.setStorage(response.access_token_exp, response.refresh_token_exp))
      .catch(() => $auth.removeStorage())
    await $axios.$get('/api/v1/users/current_user')
      .then((response: Response) => CurrentUserStore.commitCurrentUser(response.user))
      .catch(() => $auth.removeStorage())
  // アクセストークンもリフレッシュトークンも有効期限切れの場合
  } else if (!$auth.isAccessTokenAuthenticated() && !$auth.isRefreshTokenAuthenticated()) {
    // ログアウト処理
    $auth.logout()
    $auth.removeStorage()
  }
}
