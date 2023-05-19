<template>
  <account-settings-card>
    <template
      #account-settings-card-content
    >
      <loggedin-form-card>
        <template
          #form-card-content
        >
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
  </account-settings-card>
</template>

<script lang = 'ts'>
import { Component, Vue } from 'nuxt-property-decorator'
import { AxiosError } from 'axios'
import AccountSettingsCard from '../../components/loggedIn/card/accountSettingsCard.vue'
import LoggedinFormCard from '~/components/loggedIn/card/loggedinFormCard.vue'
import { MessageResponse } from '~/types/messageResponse'
import { GlobalStore } from '~/store'
import { ErrorResponse } from '~/types/ErrorResponse'

@Component(
  {
    components: {
      AccountSettingsCard,
      LoggedinFormCard
    }
  }
)
export default class AccountPassword extends Vue {
  isValid = false
  loading = false
  params = { email: this.$auth.currentUser.email, password: '', newPassword: '' }

  async updatePassword () {
    this.loading = true
    if (this.isValid) {
      await this.$axios.$post(
        '/api/v1/users/update/password',
        this.params
      )
        .then((response: MessageResponse) => this.success(response))
        .catch((error: AxiosError<ErrorResponse>) => this.failure(error))
    }
    this.loading = false
  }

  /**
   * 成功時の処理
   *
   */
  success ({ message }: MessageResponse) {
    GlobalStore.commitToast({ msg: message, color: 'success' })
  }

  /**
   * 失敗時の処理
   *
   */
  failure (error: AxiosError<ErrorResponse>) {
    GlobalStore.commitToast({ msg: error.response?.data.message })
  }
}
</script>
