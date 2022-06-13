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
          no-validation
        />
        <user-form-password
          :password.sync="params.newPassword"
          label="新しいパスワードを入力"
        />
        <v-card-actions>
          <nuxt-link
            to="/password/forget"
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
            @click="updatePassword"
          >
            更新する
          </v-btn>
        </v-card-text>
      </v-form>
    </template>
  </loggedin-form-card>
</template>

<script lang = 'ts'>
import { Component, Vue } from 'nuxt-property-decorator'
import { AxiosError } from 'axios'
import LoggedinFormCard from '@/components/loggedIn/loggedinFormCard.vue'
import Toaster from '@/components/ui/toaster.vue'
import { ErrorMessageResponse, MessageResponse } from '~/types/messageResponse'
import { GlobalStore } from '~/store'

@Component(
  {
    components: {
      LoggedinFormCard,
      Toaster
    }
  }
)
export default class SettingsPassword extends Vue {
  isValid: boolean = false
  loading: boolean = false
  params = { email: this.$auth.currentUser.email, password: '', newPassword: '' }

  async updatePassword () {
    this.loading = true
    if (this.isValid) {
      await this.$axios.$post(
        '/api/v1/users/update/password',
        this.params
      )
        .then((response: MessageResponse) => this.success(response))
        .catch((error: AxiosError) => this.failure(error))
    }
    this.loading = false
  }

  /**
   * ログイン成功時の処理
   *
   */
  success ({ message }: MessageResponse) {
    GlobalStore.commitToast({ msg: message, color: 'success' })
  }

  /**
   * ログイン失敗時の処理
   *
   */
  failure (error: AxiosError<ErrorMessageResponse>) {
    GlobalStore.commitToast({ msg: error.response?.data.error_message })
  }
}
</script>
