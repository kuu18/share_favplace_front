<template>
  <div />
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'
import { AxiosError } from 'axios'
import { ErrorResponse } from '../../types/ErrorResponse'
import { GlobalStore } from '~/store'
import { LoginResponse } from '@/types/user'

@Component({
  layout: 'beforeLogin',
  async asyncData ({ route }: Context) {
    const token = await route.query.token
    const email = await route.query.email
    return { token, email }
  }
})
export default class AccountActivations extends Vue {
  private token: string | null = null
  private email: string | null = null

  async created () {
    // emailとトークンが存在する場合、トークンを検証し、メールアドレスを更新する
    if (this.email && this.token) {
      await this.updateEmail()
    // トークンが存在する場合、トークンを検証し、アカウントを有効化する
    } else if (this.token) {
      await this.verifyToken()
    // トークンがnullの場合、何もせずリダイレクトする
    } else {
      this.$router.replace('/')
    }
  }

  /**
   * トークンの検証とメールアドレスの更新
   *
   */
  async updateEmail () {
    const headers = {
      headers: { Authorization: `Bearer ${this.token}` }
    }
    const params = {
      email: this.email
    }
    await this.$axios.$post(
      '/api/v1/account_updateemail',
      params,
      headers
    )
      .then(response => this.success(response))
      .catch(error => this.failure(error))
  }

  /**
   * トークンの検証
   *
   */
  async verifyToken () {
    const headers = {
      headers: { Authorization: `Bearer ${this.token}` }
    }
    await this.$axios.$get('/api/v1/account_activations', headers)
      .then(response => this.success(response))
      .catch(error => this.failure(error))
  }

  /**
   * 成功時の処理
   */
  success (response: LoginResponse) {
    this.$auth.login(response)
    GlobalStore.commitToast({ msg: response.message, color: 'success' })
    this.$router.replace('/')
  }

  /**
   * 失敗時の処理
   */
  failure (error: AxiosError<ErrorResponse>) {
    if (error.response?.status === 400) {
      this.$auth.logout()
      GlobalStore.commitToast({ msg: error.response.data.message })
      this.$router.replace('/')
    } else { this.$my.errorHandler(error) }
  }
}
</script>
