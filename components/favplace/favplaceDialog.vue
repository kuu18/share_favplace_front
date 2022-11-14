<template>
  <v-dialog
    v-model="syncedDialog"
    transition="dialog-bottom-transition"
    scrollable
    persistent
  >
    <v-card tile :height="height">
      <v-app-bar
        dark
        color="grey darken-3"
        max-height="60"
      >
        <v-btn
          icon
          dark
          @click="syncedDialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Favplace登録フォーム</v-toolbar-title>
      </v-app-bar>
      <v-row
        justify="center"
      >
        <v-col
          cols="12"
          md="8"
          sm="8"
        >
          <v-subheader
            class="mt-5"
            style="font-weight: bold;"
          >
            行きたい場所やお気に入りの場所を登録しよう
          </v-subheader>
          <v-form
            ref="form"
            v-model="isValid"
          >
            <v-card-text>
              <v-row>
                <v-col
                  cols="12"
                >
                  <favplace-form-name
                    :name.sync="favplace.favplacename"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  sm="6"
                >
                  <favplace-form-prefecture
                    :prefecture.sync="favplace.prefecture"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  sm="6"
                >
                  <favplace-form-municipality
                    :municipality.sync="favplace.municipality"
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <favplace-form-address
                    :address.sync="favplace.address"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  sm="6"
                >
                  <favplace-form-category
                    :category.sync="favplace.categoryIds"
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <favplace-form-reference-url
                    :reference-url.sync="favplace.referenceUrl"
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <favplace-form-image
                    @resized="uploadImage"
                  />
                </v-col>
                <v-col
                  v-if="base64Url"
                  cols="12"
                  class="hidden-mobile-and-down mb-5"
                >
                  <v-subheader>プレビュー</v-subheader>
                  <v-img
                    :src="base64Url"
                    :height="canvas.height"
                    :width="canvas.width"
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <favplace-form-remarks :remarks.sync="favplace.remarks" />
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider class="mt-12 mb-5" />
            <v-card-actions>
              <v-btn
                dark
                color="black"
                outlined
                @click="syncedDialog = false"
              >
                閉じる
              </v-btn>
              <v-spacer />
              <v-slide-x-reverse-transition>
                <v-tooltip
                  left
                  color="myblue"
                >
                  <template #activator="{ on, attrs }">
                    <v-btn
                      icon
                      class="my-0"
                      color="myblue"
                      v-bind="attrs"
                      @click="resetForm"
                      v-on="on"
                    >
                      <v-icon>mdi-refresh</v-icon>
                    </v-btn>
                  </template>
                  <span>フォームリセット</span>
                </v-tooltip>
              </v-slide-x-reverse-transition>
              <v-btn
                color="myred"
                :disabled="!isValid || loading"
                :loading="loading"
                @click="register"
              >
                <span style="color: white;">登録する</span>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-col>
      </v-row>
      <div style="flex: 1 1 auto;" />
    </v-card>
  </v-dialog>
</template>
<script lang='ts'>
import { Component, PropSync, Vue } from 'nuxt-property-decorator'
import { AxiosError } from 'axios'
import { RequestFavplace, FavplaceSaveResponse } from '../../types/Favplace'
import { GlobalStore } from '~/store'
import { ErrorResponse } from '~/types/ErrorResponse'

interface Image {
  url: string
  blob: Blob
  canvas: HTMLCanvasElement
}

@Component
export default class FavPlaceDialog extends Vue {
  height = 1250
  isValid: boolean = false
  loading: boolean = false
  base64Url: string = ''
  blob: Blob = new Blob()
  canvas!: HTMLCanvasElement
  favplace: RequestFavplace = {
    favplacename: '',
    prefecture: '',
    municipality: '',
    address: '',
    categoryIds: [],
    referenceUrl: '',
    remarks: '',
    userId: 0
  }

  @PropSync('dialog', { type: Boolean, default: false })
    syncedDialog!: boolean

  /**
   * formリセット処理
   */
  resetForm () {
    (this.$refs as any).form.reset()
    this.base64Url = ''
    this.height = 1250
  }

  /**
  * 画像選択時プレビュー
  */
  uploadImage ({ url, blob, canvas }: Image) {
    this.blob = blob
    this.base64Url = url
    this.canvas = canvas
    if (canvas && !this.$vuetify.breakpoint.xs) { this.height = 1250 + canvas.height } else { this.height = 1250 }
  }

  /**
   * favplaceフォーム新規登録処理
   */
  async register () {
    const formData = new FormData()
    const userId = this.$auth.currentUser.id
    if (userId) { this.favplace.userId = userId }
    const params = new Blob([JSON.stringify(this.favplace)], { type: 'application/json' })
    formData.append('image', this.blob)
    formData.append('params', params)
    const hedears = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    this.loading = true
    if (this.isValid) {
      await this.$axios.$post(
        '/api/v1/favplaces/create',
        formData,
        hedears
      )
        .then((response: FavplaceSaveResponse) => this.success(response))
        .catch((error: AxiosError<ErrorResponse>) => this.failure(error))
    }
    this.loading = false
  }

  success (response: FavplaceSaveResponse) {
    this.syncedDialog = false
    this.resetForm()
    GlobalStore.commitToast({ msg: response.message, color: 'info' })
  }

  failure (error: AxiosError<ErrorResponse>) {
    GlobalStore.commitToast({ msg: error.response?.data.message })
  }
}
</script>
