import { Plugin, Context, NuxtError } from '@nuxt/types';
import { Store } from 'vuex';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { User } from '../types/user';
import { CurrentUserStore } from '@/store';
import { NuxtRuntimeConfig } from '@nuxt/types/config/runtime';

export interface AuthenticationInterface {
  currentUser: User;
  loggedIn: boolean;
  setStorage(accessTokenExp: number, refreshTokenExp: number): void;
  removeStorage(): void;
  getAccessTokenExp(): number;
  getRefreshTokenExp(): number;
  isAccessTokenAuthenticated(): boolean;
  isRefreshTokenAuthenticated(): boolean;
  isCurrentUserPresent (): boolean;
  login(accessTokenExp: number, refreshTokenExp: number, user: User): void;
  logout(): void;
  unauthError(): void;
}

/**
 * 認証クラス
 * 
 */
class Authentication implements AuthenticationInterface {
  private store: Store<any>;
  private $axios: NuxtAxiosInstance;
  private $config: NuxtRuntimeConfig;
  private error: (params: NuxtError) => void;
  private storage = window.localStorage;
  private keys = { accessTokenExp: 'access_token_exp', refreshTokenExp: 'refresh_token_exp' };
  private cryptoJs = require('crypto-js');

  constructor(ctx: Context) {
    this.store = ctx.store;
    this.$axios = ctx.$axios;
    this.$config = ctx.$config;
    this.error = ctx.error
  }

  /**
   * トークンの有効期限をローカルストレージに保存
   * 
   * @param accessTokenExp 
   * @param refreshTokenExp 
   */
  setStorage(accessTokenExp: number, refreshTokenExp: number) {
    this.storage.setItem(this.keys.accessTokenExp, this.encrypt(accessTokenExp));
    this.storage.setItem(this.keys.refreshTokenExp, this.encrypt(refreshTokenExp));
  }

  /**
   * ローカルストレージの値の削除
   * 
   */
  removeStorage() {
    for (const key of Object.values(this.keys)) {
      this.storage.removeItem(key);
    }
  }

  /**
   * ローカルストレージに保存したアクセストークンの有効期限の取得
   * 
   * @returns アクセストークンの有効期限
   */
  getAccessTokenExp() {
    const expire = this.storage.getItem(this.keys.accessTokenExp);
    return expire ? this.decrypt(expire) : null;
  }

  /**
   * ローカルストレージに保存したリフレッシュトークンの有効期限の取得
   * 
   * @returns リフレッシュトークンの有効期限
   */
  getRefreshTokenExp() {
    const expire = this.storage.getItem(this.keys.refreshTokenExp);
    return expire ? this.decrypt(expire) : null;
  }

  /**
   * アクセストークンが有効期限以内かを判定する
   * 
   * @returns 有効期限切れかの真偽値
   */
  isAccessTokenAuthenticated() {
    return new Date().getTime() < this.getAccessTokenExp();
  }

  /**
   * リフレッシュトークンが有効期限以内かを判定する
   * 
   * @returns 有効期限切れかの真偽値
   */
  isRefreshTokenAuthenticated() {
    return new Date().getTime() < this.getRefreshTokenExp();
  }

  /**
   * ログイン中のユーザーの取得
   * 
   * @returns ログイン中のユーザー
   */
  get currentUser() {
    return CurrentUserStore.getCurrentUser || {};
  }

  /**
   * ログイン中のユーザーがいるかの判定
   * 
   * @returns 真偽値
   */
  isCurrentUserPresent () {
    return ('id' in this.currentUser);
  }

  /**
   * アクセストークンが期限内かつ、ログイン中のユーザーがいるかの判定
   * 
   * @returns 真偽値
   */
  get loggedIn() {
    return this.isAccessTokenAuthenticated() && this.isCurrentUserPresent();
  }


  /**
   * ログイン処理
   * 
   * @param accessTokenExp 
   * @param refreshTokenExp 
   * @param user 
   */
  login(accessTokenExp: number, refreshTokenExp: number, user: User) {
    this.setStorage(accessTokenExp, refreshTokenExp);
    CurrentUserStore.commitCurrentUser(user);
  }

  /**
   * ログアウト処理
   * 
   */
  logout() {
    this.$axios.$delete('/api/v1/logout');
    this.removeStorage();
    CurrentUserStore.commitCurrentUser(null);
  }

  /**
   * 有効期限暗号化処理
   * 
   * @param exp 
   * @returns 暗号化した有効期限
   */
  encrypt(exp: number) {
    const expire = String(exp);
    return this.cryptoJs.AES.encrypt(expire, this.$config.cryptoKey).toString();
  }

  /**
   * 有効期限複合化処理
   * 
   * @param exp 
   * @returns 複合化した有効期限
   */
  decrypt(exp: string) {
    try {
      const bytes = this.cryptoJs.AES.decrypt(exp, this.$config.cryptoKey);
      return bytes.toString(this.cryptoJs.enc.Utf8) || this.removeStorage();
    } catch (e) {
      return this.removeStorage();
    }
  }


  /**
   * 認証エラー時の処理
   * 
   */
  unauthError() {
    this.removeStorage();
    throw this.error({ statusCode: 401, message: 'Unauthorized' });
  }
}

const authentication: Plugin = (context: Context, inject) => {
  inject('auth', new Authentication(context));
}

export default authentication;