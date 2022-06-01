import { Context } from '@nuxt/types'

export default ({ $auth, route, redirect }: Context) => {
  // ログイン後ユーザーのリダイレクト処理
  const loggedInUserNotAccess = ['signup', 'login']
  if ($auth.loggedIn && loggedInUserNotAccess.includes(String(route.name))) {
    return redirect('/')
  }
}
