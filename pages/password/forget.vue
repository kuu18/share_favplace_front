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
        <user-form-email :email.sync="params.email" />
        <v-card-text class="px-0">
          <v-btn
            :disabled="!isValid || loading"
            :loading="loading"
            block
            color="myred"
            class="white--text"
            @click="sendEmail"
          >
            メール送信
          </v-btn>
        </v-card-text>
      </v-form>
    </template>
  </loggedin-form-card>
</template>

<script lang = 'ts'>
import { Component, Vue } from 'nuxt-property-decorator'
import { AxiosError } from 'axios'
import LoggedinFormCard from '~/components/loggedIn/card/loggedinFormCard.vue'
import Toaster from '@/components/ui/toaster.vue'
import { MessageResponse } from '~/types/messageResponse'
import { GlobalStore } from '~/store'
import { ErrorResponse } from '~/types/ErrorResponse'

@Component(
  {
    components: {
      LoggedinFormCard,
      Toaster
    },
    layout: 'beforeLogin'
  }
)
export default class PasswordForget extends Vue {
  isValid = false
  loading = false
  params = { email: this.$auth.currentUser.email }

  /**
   * パスワード再設定メール送信
   *
   */
  async sendEmail () {
    this.loading = true
    if (this.isValid) {
      await this.$axios.$post(
        '/api/v1/users/password/forget',
        this.params
      )
        .then((response: MessageResponse) => this.success(response))
        .catch((error: AxiosError<ErrorResponse>) => this.failure(error))
    }
    this.loading = false
  }

  /**
   * メール送信成功時の処理
   *
   */
  success ({ message }: MessageResponse) {
    GlobalStore.commitToast({ msg: message, color: 'info', timeout: -1 })
  }

  /**
   * メール送信失敗時の処理
   *
   */
  failure (error: AxiosError<ErrorResponse>) {
    GlobalStore.commitToast({ msg: error.response?.data.message })
  }
}
</script>
