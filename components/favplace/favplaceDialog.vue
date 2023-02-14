<template>
  <v-dialog
    v-model="syncedDialog"
    transition="dialog-bottom-transition"
  >
    <v-card>
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
                    :name.sync="favplaceParams.favplacename"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  sm="6"
                >
                  <favplace-form-prefecture
                    :prefecture.sync="favplaceParams.prefecture"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  sm="6"
                >
                  <favplace-form-municipality
                    :municipality.sync="favplaceParams.municipality"
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <favplace-form-address
                    :address.sync="favplaceParams.address"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  sm="6"
                >
                  <favplace-form-category
                    :category.sync="favplaceParams.categoryId"
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <favplace-form-reference-url
                    :reference-url.sync="favplaceParams.referenceUrl"
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
                  <favplace-form-remarks :remarks.sync="favplaceParams.remarks" />
                </v-col>
                <v-col
                  cols="12"
                >
                  <schedule-form
                    :schedule.sync="scheduleData"
                  />
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
                @click.stop="lDialog = true"
              >
                <span style="color: white;">登録する</span>
              </v-btn>
              <loading-dialog
                :dialog.sync="lDialog"
                :loading="loading"
                :error="errorFlg"
                :title="lDialogTitle"
              />
            </v-card-actions>
            {{ favplaceParams }}
          </v-form>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script lang='ts'>
import { Component, PropSync, Vue } from 'nuxt-property-decorator'
import { AxiosError } from 'axios'
import ScheduleForm from '../shedule/form/scheduleForm.vue'
import LoadingDialog from '../dialogs/loadingDialog.vue'
import { FavplaceParams, FavplaceSaveResponse } from '@/types/Favplace'
import { ErrorResponse } from '~/types/ErrorResponse'
import { ScheduleData, ScheduleParams } from '~/types/schedule'

interface Image {
  url: string
  blob: Blob
  canvas: HTMLCanvasElement
}

@Component({
  components: {
    ScheduleForm,
    LoadingDialog
  }
})
export default class FavPlaceDialog extends Vue {
  errorFlg: boolean = false
  isValid: boolean = false
  loading: boolean = false
  lDialog = false
  lDialogTitle = ''
  base64Url: string = ''
  blob: Blob = new Blob()
  canvas!: HTMLCanvasElement
  favplaceParams = {} as FavplaceParams
  scheduleParams = {
    timed: false
  } as ScheduleParams

  scheduleData = {
    allDay: false
  } as ScheduleData

  @PropSync('dialog', { type: Boolean, default: false })
    syncedDialog!: boolean

  /**
   * formリセット処理
   */
  resetForm () {
    (this.$refs as any).form.reset()
    this.base64Url = ''
  }

  /**
  * 画像選択時プレビュー
  */
  uploadImage ({ url, blob, canvas }: Image) {
    this.blob = blob
    this.base64Url = url
    this.canvas = canvas
  }

  /**
   * favplaceフォーム新規登録処理
   */
  async register () {
    this.loading = true
    const formData = new FormData()
    const hedears = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    const userId = this.$auth.currentUser.id
    if (userId) { this.favplaceParams.userId = userId }
    const favplaceParams = new Blob([JSON.stringify(this.favplaceParams)], { type: 'application/json' })
    formData.append('image', this.blob)
    formData.append('favplaceParams', favplaceParams)
    // スケジュール登録がある場合
    if (this.scheduleData.startDay != null) {
      if (!this.scheduleData.allDay) {
        this.scheduleParams.start = this.scheduleData.startDay + ' ' + this.scheduleData.startTime
        this.scheduleParams.end = this.scheduleData.endDay + ' ' + this.scheduleData.endTime
        this.scheduleParams.timed = true
      } else {
        this.scheduleParams.start = this.scheduleData.startDay
        this.scheduleParams.end = this.scheduleData.endDay
      }
      const scheduleParams = new Blob([JSON.stringify(this.scheduleParams)], { type: 'application/json' })
      formData.append('scheduleParams', scheduleParams)
    }
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
    this.lDialogTitle = response.message
    this.resetForm()
  }

  failure (error: AxiosError<ErrorResponse>) {
    this.lDialogTitle = error.message
    this.errorFlg = true
  }
}
</script>
