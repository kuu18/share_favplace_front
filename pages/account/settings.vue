<template>
  <account-settings-card>
    <template
      #account-settings-card-content
    >
      <loggedin-form-card>
        <template
          #form-card-content
        >
          <v-row
            justify="center"
            class="mb-10 ml-5"
            no-gutters
          >
            <v-col
              cols="6"
            >
              <v-avatar
                size="100px"
                @click.stop="avatarDialog = true"
              >
                <img
                  alt="Avatar"
                  :src="$auth.currentUser.avatarUrl"
                >
              </v-avatar>
              <user-dialog-avatar :dialog.sync="avatarDialog" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
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
            </v-col>
          </v-row>
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
import { CurrentUserStore, GlobalStore } from '~/store'
import { UserResponse } from '~/types/user'
import UserDialogAvatar from '@/components/user/userDialogAvatar.vue'
import { ErrorResponse } from '~/types/ErrorResponse'

@Component({
  components: {
    AccountSettingsCard,
    LoggedinFormCard,
    UserDialogAvatar
  }
})
export default class AccountSettings extends Vue {
  avatarDialog = false
  isValid = false
  loading = false
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
        .then((response: UserResponse) => this.updateSuccess(response))
        .catch((error: AxiosError<ErrorResponse>) => this.updateFailure(error))
    }
    this.loading = false
  }

  /**
   * 成功時の処理
   *
   */
  async updateSuccess (response: UserResponse) {
    await CurrentUserStore.commitCurrentUser(response.user)
    GlobalStore.commitToast({ msg: response.message, color: 'success' })
  }

  /**
   * 失敗時の処理
   *
   */
  updateFailure (error: AxiosError<ErrorResponse>) {
    this.errorMessages = error.response?.data.messages
  }
}
</script>
<style scoped>
  .v-avatar{
    cursor: pointer;
  }
</style>
