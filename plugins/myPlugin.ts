
import { LocaleMessageObject } from 'vue-i18n'
import { Plugin, Context, NuxtError } from '@nuxt/types'

export interface MyPluginInterface {
  pageTitle (routeName: string) : string | LocaleMessageObject
  errorHandler ({ statusCode, message }: NuxtError): void
}
/**
 * ユーティリティメソッド群クラス
 *
 */
class MyPlugin implements MyPluginInterface {
  private app
  private error

  constructor (ctx: Context) {
    this.app = ctx.app
    this.error = ctx.error
  }

  /**
   * ページタイトル変換処理
   *
   * @param routeName
   * @returns
   */
  pageTitle (routeName: string) {
    const jsonPath = `pages.${routeName.replace(/-/g, '.')}`
    const title = this.app.i18n.t(jsonPath)
    return (typeof (title) === 'object') ? title.index : title
  }

  /**
   * エラーハンドリング
   *
   * @param
   * @returns
   */
  errorHandler ({ statusCode, message }: NuxtError) {
    return this.error({ statusCode, message })
  }
}

const myPlugin: Plugin = (context: Context, inject) => {
  inject('my', new MyPlugin(context))
}

export default myPlugin
