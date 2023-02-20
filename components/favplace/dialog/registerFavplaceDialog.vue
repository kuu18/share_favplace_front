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
        <v-toolbar-title>Favplace登録フォーム</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="pt-10">
        <v-form ref="form" v-model="isValid">
          <v-row justify="center">
            <v-col cols="12" md="8" sm="8">
              <v-subheader class="mb-5" style="font-weight: bold">
                行きたい場所やお気に入りの場所を登録しよう
              </v-subheader>
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
                <v-col v-if="base64Url" cols="12" class="mb-5">
                  <v-subheader> プレビュー </v-subheader>
                  <v-layout wrap class="d-flex justify-center">
                    <v-col cols="12" xl="6" md="10">
                      <v-img
                        :src="base64Url"
                        :height="canvas.height"
                        :width="canvas.width"
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
      <v-card-actions class="pb-3 pt-3" style="background-color: #eeeeee">
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
          @click="registerFavplace()"
          @click.stop="lDialog = true"
        >
          <span style="color: white">登録する</span>
        </v-btn>
        <loading-dialog
          :dialog.sync="lDialog"
          :loading="loading"
          :error.sync="errorFlg"
          :title.sync="lDialogTitle"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Component, PropSync, Ref, Vue } from 'nuxt-property-decorator'
import { AxiosError } from 'axios'
import ScheduleForm from '@/components/shedule/form/scheduleForm.vue'
import LoadingDialog from '@/components/dialogs/loadingDialog.vue'
import { FavplaceParam, FavplaceResponse } from '@/types/Favplace'
import { ErrorResponse } from '@/types/ErrorResponse'
import { ScheduleData, ScheduleParam } from '@/types/schedule'

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
export default class RegisterFavplaceDialog extends Vue {
  errorFlg = false
  isValid = false
  loading = false
  lDialog = false
  lDialogTitle = ''
  base64Url = ''
  blob: Blob = new Blob()
  canvas!: HTMLCanvasElement
  favplaceParams = {} as FavplaceParam
  scheduleParams = {
    timed: false
  } as ScheduleParam

  scheduleData = {
    allDay: false
  } as ScheduleData

  @Ref()
    form!: HTMLFormElement
  
  @PropSync('dialog', { type: Boolean, default: false })
    syncedDialog!: boolean

  /**
   * formリセット処理
   */
  resetForm () {
    this.form.reset()
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
  async registerFavplace () {
    this.loading = true
    const formData = new FormData()
    const hedears = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    const userId = this.$auth.currentUser.id
    if (userId) {
      this.favplaceParams.userId = userId
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
        .$post('/api/v1/favplaces/create', formData, hedears)
        .then((response: FavplaceResponse) => this.success(response))
        .catch((error: AxiosError<ErrorResponse>) => this.failure(error))
    }
    this.loading = false
  }

  success (response: FavplaceResponse) {
    this.lDialogTitle = response.message
    this.resetForm()
  }

  failure (error: AxiosError<ErrorResponse>) {
    this.lDialogTitle = error.message
    this.errorFlg = true
  }
}
</script>
