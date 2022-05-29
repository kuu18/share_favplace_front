import { Context } from '@nuxt/types';
import { GlobalStore } from '@/store';

export default async ({ $auth, route, redirect }: Context) => {
  // トップページかつユーザーが存在しない場合、何もしない
  if (route.name === 'index' && !$auth.isCurrentUserPresent()) {
    return false;
  }
  // トップページでユーザーが存在する場合
  if (!$auth.isAccessTokenAuthenticated()) {
    // 有効期限外の時
    let msg = 'ログインが必要です';
    if ($auth.isCurrentUserPresent()) {
      // ログイン中のユーザー
      msg = 'もう一度ログインしてください';
      await $auth.logout();
    } else {
      // ログイン前ユーザー
      GlobalStore.commitRememberRoute(route);
    } 
    // TODO トースター出力
    console.log(msg);
    return redirect('/login');
  // 有効期限内でユーザーが存在しない場合
  } else if (!$auth.isCurrentUserPresent()) {
    return $auth.unauthError();
  }
}