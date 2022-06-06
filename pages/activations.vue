<template>
  <div />
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'
import { AxiosError } from 'axios'
import { GlobalStore } from '~/store'
import { LoginResponse } from '@/types/user'
import { ErrorMessageResponse } from '~/types/messageResponse'

@Component({
  layout: 'beforeLogin',
  async asyncData ({ route }: Context) {
    const token = await route.query.token
    return { token }
  }
})
export default class AccountActivations extends Vue {
  private token?: string = ''

  async created () {
    // ② トークンが存在する場合、トークンを検証する
    if (this.token) { await this.verifyToken() }
    // ③ トークンがnullの場合、何もせずリダイレクトする
    this.$router.replace('/')
  }

  async verifyToken () {
    const headers = {
      headers: { Authorization: `Bearer ${this.token}` }
    }
    // ④ リクエストヘッダーにトークンをつけて、認証コントローラーへ渡す
    await this.$axios.$get('/api/v1/account_activations', headers)
      .then(response => this.validToken(response))
    // ⑤ トークンが検証エラーを吐いた場合、「もう一度処理を行ってください」などのトースターを出力する
      .catch(error => this.invalidToken(error))
  }

  // ⑥ トークンの検証に成功した場合、ログインする
  validToken (response: LoginResponse) {
    this.$auth.login(response)
    GlobalStore.commitToast({ msg: response.message, color: 'success' })
    this.$router.push('/')
  }

  invalidToken (error: AxiosError<ErrorMessageResponse>) {
    error.response?.status === 400
      ? GlobalStore.commitToast({ msg: error.response.data.error_message })
      : this.$my.errorHandler(error)
  }
}
</script>
