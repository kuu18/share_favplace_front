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
            <user-form-email
              :email.sync="params.email"
              label="新しいメールアドレスを入力"
            />
            <v-card-text class="px-0">
              <v-btn
                :disabled="!isValid || loading"
                :loading="loading"
                block
                color="myred"
                class="white--text"
                @click="updateEmail"
              >
                更新する
              </v-btn>
            </v-card-text>
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
  isValid: boolean = false
  loading: boolean = false
  params = { id: this.$auth.currentUser.id, email: this.$auth.currentUser.email }
  errorMessages?: Array<string> | null = null

  async updateEmail () {
    this.errorMessages = null
    this.loading = true
    if (this.isValid) {
      await this.$axios.$post(
        '/api/v1/users/update/email',
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
    this.$auth.logout()
    this.$router.push({ path: `/?message=${message}&color=info&timeout=-1` })
  }

  /**
   * 失敗時の処理
   *
   */
  failure (error: AxiosError<ErrorResponse>) {
    this.errorMessages = error.response?.data.messages
  }
}
</script>
