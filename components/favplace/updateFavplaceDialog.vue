<template>
  <v-dialog
    v-model="syncedDialog"
    :fullscreen="$vuetify.breakpoint.smAndDown ? true : false"
    scrollable
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark dense color="grey darken-3">
        <v-btn icon dark @click="syncedDialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Favplace更新フォーム</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="pt-10">
        <v-form ref="form" v-model="isValid">
          <v-row justify="center">
            <v-col cols="12" md="8" sm="8">
              <v-row>
                <v-col cols="12">
                  <favplace-form-name
                    :name.sync="favplaceParams.favplacename"
                  />
                </v-col>
                <v-col cols="12" md="6" sm="6">
                  <favplace-form-prefecture
                    :prefecture.sync="favplaceParams.prefecture"
                  />
                </v-col>
                <v-col cols="12" md="6" sm="6">
                  <favplace-form-municipality
                    :municipality.sync="favplaceParams.municipality"
                  />
                </v-col>
                <v-col cols="12">
                  <favplace-form-address
                    :address.sync="favplaceParams.address"
                  />
                </v-col>
                <v-col cols="12" md="6" sm="6">
                  <favplace-form-category
                    :category.sync="favplaceParams.categoryId"
                  />
                </v-col>
                <v-col cols="12">
                  <favplace-form-reference-url
                    :reference-url.sync="favplaceParams.referenceUrl"
                  />
                </v-col>
                <v-col cols="12">
                  <favplace-form-image @resized="uploadImage" />
                </v-col>
                <v-col
                  v-if="base64Url || favplace.imageUrl"
                  cols="12"
                  class="mb-5"
                >
                  <v-subheader v-if="base64Url">
                    プレビュー
                  </v-subheader>
                  <v-subheader v-if="!base64Url">
                    現在の画像
                  </v-subheader>
                  <v-layout wrap class="d-flex justify-center">
                    <v-col cols="12" xl="6" md="10">
                      <v-img
                        :src="base64Url || favplace.imageUrl"
                        :height="canvas ? canvas.height : 'auto'"
                        :width="canvas ? canvas.width : '100%'"
                      />
                    </v-col>
                  </v-layout>
                </v-col>
                <v-col cols="12">
                  <favplace-form-remarks
                    :remarks.sync="favplaceParams.remarks"
                  />
                </v-col>
                <v-col cols="12">
                  <schedule-form :schedule.sync="scheduleData" />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions class="pb-3 pt-3" style="background-color: #EEEEEE;">
        <v-btn dark color="black" outlined @click="syncedDialog = false">
          閉じる
        </v-btn>
        <v-spacer />
        <v-slide-x-reverse-transition>
          <v-tooltip left color="myblue">
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
          @click="updateFavplace()"
          @click.stop="lDialog = true"
        >
          <span style="color: white">更新する</span>
        </v-btn>
        <loading-dialog
          :dialog.sync="lDialog"
          :loading="loading"
          :error="errorFlg"
          :title="lDialogTitle"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'nuxt-property-decorator'
import { AxiosError } from 'axios'
import ScheduleForm from '../shedule/form/scheduleForm.vue'
import LoadingDialog from '../dialogs/loadingDialog.vue'
import { FavplaceParams, FavplaceSaveResponse, Favplace } from '@/types/Favplace'
import { ErrorResponse } from '~/types/ErrorResponse'
import { ScheduleData, ScheduleParams } from '~/types/schedule'

interface Image {
  url: string;
  blob: Blob;
  canvas: HTMLCanvasElement;
}

@Component({
  components: {
    ScheduleForm,
    LoadingDialog
  }
})
export default class UpdateFavplaceDialog extends Vue {
  isValid = false
  errorFlg = false
  loading = false
  lDialog = false
  lDialogTitle = ''
  base64Url: string = ''
  blob: Blob = new Blob()
  canvas = {} as HTMLCanvasElement
  favplaceParams = {} as FavplaceParams
  scheduleParams = {
    timed: false
  } as ScheduleParams

  scheduleData = {
    allDay: false
  } as ScheduleData

  @PropSync('dialog', { type: Boolean, default: false })
    syncedDialog!: boolean

  @Prop({ type: Object, default: () => {} })
    favplace!: Favplace

  /**
   * フォームの初期値設定処理
   *  */
  constructor () {
    super()
    this.favplaceParams.id = this.favplace.id
    this.favplaceParams.favplacename = this.favplace.favplacename
    this.favplaceParams.prefecture = this.favplace.prefecture
    this.favplaceParams.municipality = this.favplace.municipality
    this.favplaceParams.address = this.favplace.address
    this.favplaceParams.categoryId = this.favplace.category.id
    this.favplaceParams.referenceUrl = this.favplace.referenceUrl
    this.favplaceParams.remarks = this.favplace.remarks
    this.favplaceParams.userId = this.favplace.user.id
    const schedule = this.favplace.schedule
    if (schedule) {
      this.scheduleData.allDay = !schedule.timed
      this.scheduleData.startDay = schedule.scheduleData.startDay
      this.scheduleData.endDay = schedule.scheduleData.endDay
      if (schedule.timed) {
        this.scheduleData.startTime = schedule.scheduleData.startTime
        this.scheduleData.endTime = schedule.scheduleData.endTime
      }
      this.scheduleParams.id = schedule.id
    }
  }

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
  async updateFavplace () {
    this.loading = true
    const formData = new FormData()
    const hedears = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    const favplaceParams = new Blob([JSON.stringify(this.favplaceParams)], {
      type: 'application/json'
    })
    formData.append('image', this.blob)
    formData.append('favplaceParams', favplaceParams)
    // スケジュール登録がある場合
    if (this.scheduleData.startDay != null) {
      if (!this.scheduleData.allDay) {
        this.scheduleParams.start =
          this.scheduleData.startDay + ' ' + this.scheduleData.startTime
        this.scheduleParams.end =
          this.scheduleData.endDay + ' ' + this.scheduleData.endTime
        this.scheduleParams.timed = true
      } else {
        this.scheduleParams.start = this.scheduleData.startDay
        this.scheduleParams.end = this.scheduleData.endDay
      }
      const scheduleParams = new Blob([JSON.stringify(this.scheduleParams)], {
        type: 'application/json'
      })
      formData.append('scheduleParams', scheduleParams)
    }
    if (this.isValid) {
      await this.$axios
        .$post('/api/v1/favplaces/update', formData, hedears)
        .then((response: FavplaceSaveResponse) => this.success(response))
        .catch((error: AxiosError<ErrorResponse>) => this.failure(error))
    }
    this.loading = false
  }

  success (response: FavplaceSaveResponse) {
    this.lDialogTitle = response.message
  }

  failure (error: AxiosError<ErrorResponse>) {
    this.lDialogTitle = error.message
    this.errorFlg = true
  }
}
</script>
