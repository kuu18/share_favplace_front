import { Context } from '@nuxt/types'

export default ({ $axios }: Context, { isDev }: Context) => {
  // リクエストログ
  $axios.onRequest((config) => {
    if (!isDev) { console.log(config) }
  })
  // レスポンスログ
  $axios.onResponse((config) => {
    if (!isDev) { console.log(config) }
  })
  // エラーログ
  $axios.onError((e) => {
    console.log(e.response)
  })
}
