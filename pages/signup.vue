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
        <user-form-username :username.sync="params.username" />
        <user-form-email :email.sync="params.email" />
        <user-form-password :password.sync="params.password" />
      </v-form>
      <v-btn
        block
        color="myred"
        class="white--text"
        :disabled="!isValid || loading"
        :loading="loading"
        @click="signup"
      >
        登録する
      </v-btn>
      <v-spacer />
      <v-row
        class="my-5"
        flat
      >
        <v-card-text
          class="error--text"
        >
          <div
            v-for="(message, i) in errorMessages"
            :key="`message-text-${i}`"
          >
            ・{{ message }}
          </div>
        </v-card-text>
      </v-row>
    </template>
  </bef-login-form-card>
</template>
<script lang = 'ts'>
import { Component, Vue } from 'nuxt-property-decorator'
import { AxiosError } from 'axios'
import befLoginFormCard from '@/components/beforeLogin/befLoginFormCard.vue'
import userFormEmail from '@/components/user/userFormEmail.vue'
import userFormUsername from '@/components/user/userFormUsername.vue'
import userFormPassword from '@/components/user/userFormPassword.vue'
import { User } from '@/types/user'
import { MessageResponse, ErrorMessageResponse } from '@/types/messageResponse'
import { GlobalStore } from '@/store'
import Toaster from '@/components/ui/toaster.vue'

@Component({
  layout: 'beforeLogin',
  components: {
    befLoginFormCard,
    userFormEmail,
    userFormUsername,
    userFormPassword,
    Toaster
  }
})
export default class Signup extends Vue {
  isValid: boolean = false
  loading: boolean = false
  params: User = { username: '', email: '', password: '' }
  errorMessages?: Array<string> | null = null

  async signup () {
    this.errorMessages = null
    this.loading = true
    if (this.isValid) {
      await this.$axios.$post(
        '/api/v1/users/create',
        this.params
      )
        .then((response: MessageResponse) => this.success(response))
        .catch((error: AxiosError<ErrorMessageResponse>) => this.failure(error))
    }
    this.loading = false
  }

  // 新規登録成功
  success (response: MessageResponse) {
    this.formReset()
    GlobalStore.commitToast({ msg: response.message, color: 'info', timeout: -1 })
  }

  // 新規登録失敗
  failure (error: AxiosError<ErrorMessageResponse>) {
    if (error.response?.status === 400) {
      this.errorMessages = error.response.data.error_messages
    } else {
      this.$my.errorHandler(error)
    }
  }

  formReset () {
    (this.$refs as any).form.reset()
    this.params = { username: '', email: '', password: '' }
  }
}
</script>
