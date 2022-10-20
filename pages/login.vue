<template>
  <bef-login-form-card>
    <template
      #form-card-content
    >
      <toaster />
      <v-form
        ref="form"
        v-model="isValid"
      >
        <user-form-username
          :username.sync="params.username"
          no-validation
        />
        <user-form-password
          :password.sync="params.password"
          no-validation
        />
        <v-card-actions>
          <nuxt-link
            to="password/forget"
            class="body-2 text-decoration-none"
          >
            パスワードを忘れた?
          </nuxt-link>
        </v-card-actions>
        <v-card-text class="px-0">
          <v-btn
            :disabled="!isValid || loading"
            :loading="loading"
            block
            color="myred"
            class="white--text"
            @click="login"
          >
            ログインする
          </v-btn>
        </v-card-text>
        <v-card-text class="px-0">
          <v-btn
            :loading="loading"
            block
            color="myred"
            class="white--text"
            @click="testLogin"
          >
            テストユーザーでログインする
          </v-btn>
        </v-card-text>
      </v-form>
    </template>
  </bef-login-form-card>
</template>

<script lang = 'ts'>
import { Component, Vue } from 'nuxt-property-decorator'
import { AxiosError } from 'axios'
import befLoginFormCard from '@/components/beforeLogin/befLoginFormCard.vue'
import userFormPassword from '@/components/user/userFormPassword.vue'
import userFormUsername from '@/components/user/userFormUsername.vue'
import Toaster from '@/components/ui/toaster.vue'
import { GlobalStore } from '@/store'
import { LoginResponse, User } from '@/types/user'
import { ErrorResponse } from '~/types/ErrorResponse'

@Component({
  layout: 'beforeLogin',
  components: {
    befLoginFormCard,
    userFormPassword,
    userFormUsername,
    Toaster
  }
})
export default class Login extends Vue {
  isValid: boolean = false
  loading: boolean = false
  params:User = { username: '', password: '' }

  /**
   *ログイン処理
   *
   */
  async login () {
    this.loading = true
    if (this.isValid) {
      await this.$axios.$post(
        '/api/v1/login',
        this.params
      )
        .then((response: LoginResponse) => this.authSuccessful(response))
        .catch((error: AxiosError<ErrorResponse>) => this.authFailure(error))
    }
    this.loading = false
  }

  /**
   * テストユーザーログイン処理
   *
   */
  async testLogin () {
    this.loading = true
    await this.$axios.$post(
      '/api/v1/login',
      {
        username: 'testuser',
        password: this.$config.testuserPassword
      }
    )
      .then((response: LoginResponse) => this.authSuccessful(response))
      .catch((error: AxiosError<ErrorResponse>) => this.authFailure(error))
    this.loading = false
  }

  /**
   * ログイン成功時の処理
   *
   */
  async authSuccessful (response: LoginResponse) {
    await this.$auth.login(response)
    this.$router.push(GlobalStore.getRememberRoute)
  }

  /**
   * ログイン失敗時の処理
   *
   */
  authFailure (error: AxiosError<ErrorResponse>) {
    return error.response?.status === 401
      ? GlobalStore.commitToast({ msg: error.response.data.message })
      : this.$my.errorHandler(error)
  }
}
</script>
