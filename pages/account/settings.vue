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
            <user-form-username :username.sync="params.username" />
            <v-card-text class="px-0">
              <v-btn
                :disabled="!isValid || loading"
                :loading="loading"
                block
                color="myred"
                class="white--text"
                @click="updateUser"
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

<script lang='ts'>
import { Component, Vue } from 'nuxt-property-decorator'
import { AxiosError } from 'axios'
import AccountSettingsCard from '../../components/loggedIn/card/accountSettingsCard.vue'
import LoggedinFormCard from '../../components/loggedIn/card/loggedinFormCard.vue'
import { ErrorMessageResponse } from '~/types/messageResponse'
import { GlobalStore } from '~/store'
import { LoginResponse } from '~/types/user'

@Component({
  components: {
    AccountSettingsCard,
    LoggedinFormCard
  }
})
export default class AccountSettings extends Vue {
  isValid: boolean = false
  loading: boolean = false
  errorMessages?: Array<string> | null = null
  params = {
    id: this.$auth.currentUser.id,
    username: this.$auth.currentUser.username
  }

  async updateUser () {
    this.errorMessages = null
    this.loading = true
    if (this.isValid) {
      await this.$axios.$post(
        '/api/v1/users/update',
        this.params
      )
        .then((response: LoginResponse) => this.updateSuccess(response))
        .catch((error: AxiosError) => this.updateFailure(error))
    }
    this.loading = false
  }

  /**
   * 成功時の処理
   *
   */
  async updateSuccess (response: LoginResponse) {
    await this.$auth.login(response)
    GlobalStore.commitToast({ msg: response.message, color: 'success' })
  }

  /**
   * 失敗時の処理
   *
   */
  updateFailure (error: AxiosError<ErrorMessageResponse>) {
    this.errorMessages = error.response?.data.error_messages
  }
}
</script>
