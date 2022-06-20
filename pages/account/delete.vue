<template>
  <account-settings-card>
    <template
      #account-settings-card-content
    >
      <loggedin-form-card>
        <template
          #form-card-content
        >
          <v-card-text>
            <p>アカウントを削除すると、アカウントに紐付く全てのデータが削除されます。</p>
            <p style="font-weight: bold; color: #c86a71;">
              二度と復旧できませんのでご注意ください。
            </p>
          </v-card-text>
          <v-form
            ref="form"
            v-model="isValid"
          >
            <v-card-text>
              ログイン中のメールアドレス
            </v-card-text>
            <v-card-text>
              <h4>{{ $auth.currentUser.email }}</h4>
            </v-card-text>
            <v-card-text>
              パスワードを入力してください
            </v-card-text>
            <user-form-password
              :password.sync="params.password"
              no-validation
            />
            <v-card-actions>
              <nuxt-link
                to="/password/forget"
                class="body-2 text-decoration-none"
              >
                パスワードを忘れた?
              </nuxt-link>
            </v-card-actions>
            <v-dialog
              v-model="dialog"
              persistent
              max-width="600"
            >
              <template #activator="{ on, attrs }">
                <v-card-text class="px-0">
                  <v-btn
                    color="red lighten-2"
                    class="white--text"
                    :disabled="!isValid || loading"
                    :loading="loading"
                    v-bind="attrs"
                    v-on="on"
                  >
                    アカウントを削除
                  </v-btn>
                </v-card-text>
              </template>
              <v-card>
                <v-card-title class="text-h5">
                  アカウントを削除してよろしいですか？
                </v-card-title>
                <v-card-text style="color: #c86a71;">
                  アカウントを削除すると、二度と復旧できませんのでご注意ください。
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="myblue"
                    text
                    @click="dialog = false"
                  >
                    close
                  </v-btn>
                  <v-btn
                    color="myblue"
                    text
                    @click="deleteAccount"
                  >
                    ok
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
import LoggedinFormCard from '../../components/loggedIn/card/loggedinFormCard.vue'
import { ErrorMessageResponse, MessageResponse } from '~/types/messageResponse'
import { GlobalStore } from '~/store'

@Component({
  components: {
    AccountSettingsCard,
    LoggedinFormCard
  }
})
export default class AcccountDelete extends Vue {
  isValid: boolean = false
  loading: boolean = false
  dialog: boolean = false
  params = { id: this.$auth.currentUser.id, password: '' }

  async deleteAccount () {
    this.loading = true
    if (this.isValid) {
      await this.$axios.$delete(
        '/api/v1/users/delete',
        { data: this.params }
      )
        .then((response: MessageResponse) => this.success(response))
        .catch((error: AxiosError<ErrorMessageResponse>) => this.failure(error))
    }
    this.loading = false
  }

  success ({ message }: MessageResponse) {
    this.$auth.logout()
    this.$router.replace({ path: `/?message=${message}&color=success` })
  }

  failure (error: AxiosError<ErrorMessageResponse>) {
    this.dialog = false
    GlobalStore.commitToast({ msg: error.response?.data.error_message })
  }
}
</script>
