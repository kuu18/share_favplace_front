import { Plugin, Context } from '@nuxt/types'
import { Store } from 'vuex';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { User } from '../types/user';
import { CurrentUserStore } from '@/store';

export interface AuthenticationInterface {
  setStorage (accessTokenExp: number, refreshTokenExp: number): void;
  removeStorage (): void;
  getAccessTokenExp (): Number;
  isAccessTokenAuthenticated (): boolean;
  login (accessTokenExp: number, refreshTokenExp: number, user: User): void;
  logout (): void;
}

/**
 * 認証クラス
 * 
 */
class Authentication implements AuthenticationInterface {
  store: Store<any>;
  $axios: NuxtAxiosInstance;
  storage: Storage = window.localStorage;
  keys = { accessTokenExp: 'access_token_exp', refreshTokenExp: 'refresh_token_exp' };

  constructor (ctx: Context) {
    this.store = ctx.store;
    this.$axios = ctx.$axios;
  }

  /**
   * トークンの有効期限をローカルストレージに保存
   * 
   * @param accessTokenExp 
   * @param refreshTokenExp 
   */
  setStorage (accessTokenExp: number, refreshTokenExp: number) {
    this.storage.setItem(this.keys.accessTokenExp, String(accessTokenExp * 1000));
    this.storage.setItem(this.keys.refreshTokenExp, String(refreshTokenExp * 1000));
  }

  /**
   * ローカルストレージの値の削除
   * 
   */
  removeStorage () {
    for (const key of Object.values(this.keys)) {
      this.storage.removeItem(key);
    }
  }

  /**
   * ローカルストレージに保存したアクセストークンの有効期限の取得
   * 
   * @returns アクセストークンの有効期限
   */
  getAccessTokenExp () {
    return Number(this.storage.getItem(this.keys.accessTokenExp))
  }

  /**
   * ローカルストレージに保存したリフレッシュトークンの有効期限の取得
   * 
   * @returns リフレッシュトークンの有効期限
   */
  getRefreshTokenExp () {
    return Number(this.storage.getItem(this.keys.refreshTokenExp));
  }

  /**
   * アクセストークンが有効期限以内かを判定する
   * 
   * @returns 有効期限切れかの真偽値
   */
  isAccessTokenAuthenticated () {
    return new Date().getTime() < this.getAccessTokenExp();
  }

  /**
   * リフレッシュトークンが有効期限以内かを判定する
   * 
   * @returns 有効期限切れかの真偽値
   */
  isRefreshTokenAuthenticated () {
    return new Date().getTime() < this.getRefreshTokenExp();
  }

  /**
   * ログイン処理
   * 
   * @param accessTokenExp 
   * @param refreshTokenExp 
   * @param user 
   */
  login (accessTokenExp: number, refreshTokenExp: number, user: User) {
    this.setStorage(accessTokenExp, refreshTokenExp);
    CurrentUserStore.commitCurrentUser(user);
  }

  /**
   * ログアウト処理
   * 
   */
  logout () {
    this.$axios.$delete('/api/v1/logout')
    this.removeStorage()
    CurrentUserStore.commitCurrentUser(null);
  }
}

const authentication: Plugin = (context: Context, inject) => {
  inject('auth', new Authentication(context))
}

export default authentication