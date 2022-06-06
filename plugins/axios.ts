import { Context } from '@nuxt/types'

export default ({ $axios }: Context, { isDev }: Context) => {
  // リクエストログ
  $axios.onRequest((config) => {
    // eslint-disable-next-line no-console
    if (!isDev) { console.log(config) }
  })
  // レスポンスログ
  $axios.onResponse((config) => {
    // eslint-disable-next-line no-console
    if (!isDev) { console.log(config) }
  })
  // エラーログ
  $axios.onError((e) => {
    // eslint-disable-next-line no-console
    console.log(e.response)
  })
}
