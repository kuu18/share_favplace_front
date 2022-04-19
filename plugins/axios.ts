export default ({ $axios } : any) => {
  // リクエストログ
  $axios.onRequest((config : string) => {
    console.log(config)
  })
  // レスポンスログ
  $axios.onResponse((config : string) => {
    console.log(config)
  })
  // エラーログ
  $axios.onError((e : any) => {
    console.log(e.response)
  })
}