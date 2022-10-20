<template>
  <loggedin-form-card title="パスワード再設定">
    <template
      #form-card-content
    >
      <toaster />
      <v-form
        ref="form"
        v-model="isValid"
      >
        <user-form-password
          :password.sync="params.password"
          label="新しいパスワードを入力"
        />
        <v-card-text class="px-0">
          <v-btn
            :disabled="!isValid || loading"
            :loading="loading"
            block
            color="myred"
            class="white--text"
            @click="resetPassword"
          >
            更新する
          </v-btn>
        </v-card-text>
      </v-form>
    </template>
  </loggedin-form-card>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'
import { AxiosError } from 'axios'
import LoggedinFormCard from '../../components/loggedIn/card/loggedinFormCard.vue'
import Toaster from '../../components/ui/toaster.vue'
import { GlobalStore } from '~/store'
import { LoginResponse } from '~/types/user'
import { ErrorResponse } from '~/types/ErrorResponse'

@Component({
  components: {
    LoggedinFormCard,
    Toaster
  },
  async asyncData ({ route }: Context) {
    const token = await route.query.token
    return { token }
  }
})
export default class PasswordReset extends Vue {
  private token?: string
  isValid: boolean = false
  loading: boolean = false
  params = { password: '' }

  /**
   * トークンの有無をチェック
   */
  created () {
    if (!this.token) { this.$router.replace('/') }
  }

  /**
   * パスワード再設定
   */
  async resetPassword () {
    const headers = {
      headers: { Authorization: `Bearer ${this.token}` }
    }
    await this.$axios.$post('/api/v1/users/password/reset', this.params, headers)
      .then(response => this.success(response))
      .catch(error => this.failure(error))
  }

  /**
   * パスワード再設定成功時の処理
   */
  async success (response: LoginResponse) {
    await this.$auth.login(response)
    // 遷移するとトースターが表示されないためクエリにメッセージを付与
    this.$router.push({ path: `/?message=${response.message}&color=success` })
  }

  /**
   * パスワード再設定失敗時の処理
   */
  failure (error: AxiosError<ErrorResponse>) {
    error.response?.status === 401 || error.response?.status === 400
      ? GlobalStore.commitToast({ msg: error.response.data.message })
      : this.$my.errorHandler(error)
  }
}
</script>
