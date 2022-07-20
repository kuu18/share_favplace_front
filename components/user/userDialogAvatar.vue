<template>
  <v-dialog
    v-model="syncedDialog"
    max-width="600"
  >
    <v-card>
      <v-form
        ref="form"
        v-model="isValid"
      >
        <v-card-title class="text-h5">
          画像を変更する
        </v-card-title>
        <v-spacer />
        <v-card-text>
          <v-file-input
            name="avatar"
            :rules="rules"
            accept="image/png, image/jpeg, image/jpg"
            prepend-icon="mdi-camera"
            label="画像を選択してください"
            @change="selectImage"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="myblue"
            text
            @click="syncedDialog = false"
          >
            close
          </v-btn>
          <v-btn
            :disabled="!isValid || loading"
            :loading="loading"
            color="myblue"
            text
            @click="upload"
          >
            submit
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Component, Vue, PropSync } from 'nuxt-property-decorator'
import { AxiosError, AxiosResponse } from 'axios'
import { MessageResponse } from '~/types/messageResponse'
import { CurrentUserStore, GlobalStore } from '~/store'

interface SuccessResponse {
  message: string
  avatar_url: string
}

@Component
export default class UserDialogAvatar extends Vue {
  isValid: boolean = false
  loading: boolean = false
  rules = [
    (v: File) => !!v || '',
    (v: File) => !v || v.size < 2000000 || '画像サイズは2MB以内にしてください。'
  ]

  blob: Blob | string = ''

  @PropSync('dialog', { type: Boolean, default: false })
    syncedDialog!: boolean

  selectImage (file: Blob) {
    this.blob = file
  }

  async upload () {
    this.loading = true
    const params = new FormData()
    params.append('avatar', this.blob)
    if (this.isValid) {
      await this.$axios.post(`/api/v1/users/${this.$auth.currentUser.username}/avatar`, params)
        .then((response: AxiosResponse<SuccessResponse>) => this.success(response))
        .catch((error: AxiosError<MessageResponse>) => this.failure(error))
    }
    this.loading = false
  }

  success (response: AxiosResponse<SuccessResponse>) {
    this.syncedDialog = false
    GlobalStore.commitToast({ msg: response.data.message, color: 'success' })
    CurrentUserStore.commitAvatarUrl(response.data.avatar_url)
  }

  failure (error: AxiosError<MessageResponse>) {
    GlobalStore.commitToast({ msg: error.response?.data.message })
  }
}
</script>
