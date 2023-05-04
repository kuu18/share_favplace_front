
import { LocaleMessageObject } from 'vue-i18n'
import { Plugin, Context, NuxtError } from '@nuxt/types'

export interface MyPluginInterface {
  pageTitle (routeName: string) : string | LocaleMessageObject
  errorHandler ({ statusCode, message }: NuxtError): void
  dateTimeFormat (dateTime: Date) : string
  dateFormat (date: Date) :string
  omitString(str: string, maxLength: number): string
}
/**
 * ユーティリティメソッド群クラス
 *
 */
class MyPlugin implements MyPluginInterface {
  private app
  private error
  private vuetify

  constructor (ctx: Context) {
    this.app = ctx.app
    this.error = ctx.error
    this.vuetify = ctx.$vuetify
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

    /**
   * 日時フォーマット
   * @param dateTime 
   * @param format 
   */
  dateTimeFormat (dateTime: Date) {
    let format = 'YYYY年MM月DD日HH時mm分'
    format = format.replace(/YYYY/, String(dateTime.getFullYear()))
    format = format.replace(/MM/, String(dateTime.getMonth() + 1))
    format = format.replace(/DD/, String(dateTime.getDate()))
    format = format.replace(/HH/, String(dateTime.getHours()))
    format =
      dateTime.getMinutes() !== 0
        ? format.replace(/mm/, String(dateTime.getMinutes()))
        : format.substring(0, format.length - 3)
    return format
  }
  
  /**
   * 日付フォーマット
   * @param date 
   * @param format 
   */
  dateFormat (date: Date) {
    let format = 'YYYY年MM月DD日'
    format = format.replace(/YYYY/, String(date.getFullYear()))
    format = format.replace(/MM/, String(date.getMonth() + 1))
    format = format.replace(/DD/, String(date.getDate()))
    return format
  }

  /**
   * 文字列省略表示
   */
  omitString(str: string, maxLength: number) {
    const MAX_LENGTH = maxLength
    if (str.length > MAX_LENGTH) {
      if (this.vuetify.breakpoint.xl) {
        return str.slice(0, MAX_LENGTH * 2) + "..."
      }
      return str.slice(0, MAX_LENGTH) + "..."
    }
    return str
  }
}

const myPlugin: Plugin = (context: Context, inject) => {
  inject('my', new MyPlugin(context))
}

export default myPlugin
