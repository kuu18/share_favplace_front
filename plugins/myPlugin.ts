import { Plugin, Context } from '@nuxt/types'

export interface MyPluginInterface {
}
/**
 * ユーティリティメソッド群クラス
 * 
 */
class MyPlugin implements MyPluginInterface {
  app

  constructor (ctx: Context) {
    this.app = ctx.app
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
}

const myPlugin: Plugin = (context: Context, inject) => {
  inject('my', new MyPlugin(context))
}

export default myPlugin