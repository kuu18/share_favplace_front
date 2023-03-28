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
                  <favplace-form-name :name.sync="favplaceParams.favplacename" />
                </v-col>
                <v-col cols="12" md="6" sm="6">
                  <favplace-form-prefecture :prefecture.sync="favplaceParams.prefecture" />
                </v-col>
                <v-col cols="12" md="6" sm="6">
                  <favplace-form-municipality :municipality.sync="favplaceParams.municipality" />
                </v-col>
                <v-col cols="12">
                  <favplace-form-address :address.sync="favplaceParams.address" />
                </v-col>
                <v-col cols="12" md="6" sm="6">
                  <favplace-form-category :category.sync="favplaceParams.categoryId" />
                </v-col>
                <v-col cols="12">
                  <favplace-form-reference-url :reference-url.sync="favplaceParams.referenceUrl" />
                </v-col>
                <v-col cols="12">
                  <favplace-form-image @resized="uploadImage" />
                </v-col>
                <v-col v-if="base64Url || favplace.imageUrl" cols="12" class="mb-5">
                  <v-subheader v-if="base64Url"> プレビュー </v-subheader>
                  <v-subheader v-if="!base64Url"> 現在の画像 </v-subheader>
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
                  <favplace-form-remarks :remarks.sync="favplaceParams.remarks" />
                </v-col>
                <v-col cols="12">
                  <v-btn fab small depressed color="primary" @click.stop="scheduleDialog = true">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <span class="ml-2"> スケジュールを登録する </span>
                  <register-schedule-dialog
                    :dialog.sync="scheduleDialog"
                    :schedule.sync="scheduleData"
                    :is-valid.sync="scheduleIsValid"
                  />
                </v-col>
                <v-col cols="12">
                  <div
                    v-if="!scheduleDialog"
                    :class="
                      $vuetify.breakpoint.mdAndUp
                        ? 'font-weight-bold text-h7'
                        : 'font-weight-bold text-subtitle2'
                    "
                  >
                    {{ previewScheduleData() }}
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions class="pb-3 pt-3" style="background-color: #eeeeee">
        <v-btn dark color="black" outlined @click="syncedDialog = false"> 閉じる </v-btn>
        <v-spacer />
        <v-slide-x-reverse-transition>
          <v-tooltip left color="myblue">
            <template #activator="{ on, attrs }">
              <v-btn icon class="my-0" color="myblue" v-bind="attrs" @click="resetForm()" v-on="on">
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <span>フォームリセット</span>
          </v-tooltip>
        </v-slide-x-reverse-transition>
        <v-btn
          color="myred"
          :disabled="!isValid || loading || !scheduleIsValid"
          :loading="loading"
          @click="updateFavplace()"
        >
          <span style="color: white">更新する</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Component, Prop, PropSync, Ref, Vue } from "nuxt-property-decorator"
import { AxiosError } from "axios"
import RegisterScheduleDialog from '@/components/favplace/dialog/registerScheduleDialog.vue';
import { FavplaceParam, FavplaceResponse, Favplace } from "@/types/Favplace"
import { ErrorResponse } from "@/types/ErrorResponse"
import { ScheduleData, ScheduleParam } from "@/types/schedule"
import { FavplacesStore, SchedulesStore, GlobalStore } from "~/store"

interface Image {
  url: string
  blob: Blob
  canvas: HTMLCanvasElement
}

@Component({
  components: {
    RegisterScheduleDialog
  },
})
export default class UpdateFavplaceDialog extends Vue {
  scheduleDialog = false
  isValid = false
  scheduleIsValid = true
  loading = false
  base64Url = ""
  blob: Blob = new Blob()
  canvas = {} as HTMLCanvasElement
  favplaceParams = {} as FavplaceParam
  scheduleParams = {
    timed: false,
  } as ScheduleParam

  scheduleData = {
    allDay: false,
  } as ScheduleData

  @Ref()
  form!: HTMLFormElement

  @PropSync("dialog", { type: Boolean, default: false })
  syncedDialog!: boolean

  @Prop({ type: Object, default: () => ({}) })
  favplace!: Favplace

  /**
   * フォームの初期値設定処理
   *  */
  constructor() {
    super()
    this.favplaceParams.id = this.favplace.id
    this.favplaceParams.favplacename = this.favplace.favplacename
    this.favplaceParams.prefecture = this.favplace.prefecture
    this.favplaceParams.municipality = this.favplace.municipality
    this.favplaceParams.address = this.favplace.address
    this.favplaceParams.categoryId = this.favplace.category.id
    this.favplaceParams.referenceUrl = this.favplace.referenceUrl
    this.favplaceParams.remarks = this.favplace.remarks
    if (this.favplace.user.id) {
      this.favplaceParams.userId = this.favplace.user.id
    }
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
  resetForm() {
    this.form.reset()
    this.base64Url = ""
  }

  /**
   * 画像選択時プレビュー
   */
  uploadImage({ url, blob, canvas }: Image) {
    this.blob = blob
    this.base64Url = url
    this.canvas = canvas
  }

  /**
   * favplaceフォーム新規登録処理
   */
  async updateFavplace() {
    this.loading = true
    const formData = new FormData()
    const hedears = {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
    const favplaceParams = new Blob([JSON.stringify(this.favplaceParams)], {
      type: "application/json",
    })
    formData.append("image", this.blob)
    formData.append("favplaceParams", favplaceParams)
    // スケジュール登録がある場合
    if (this.scheduleData.startDay != null) {
      if (!this.scheduleData.allDay) {
        this.scheduleParams.start = this.scheduleData.startDay + " " + this.scheduleData.startTime
        this.scheduleParams.end = this.scheduleData.endDay + " " + this.scheduleData.endTime
        this.scheduleParams.timed = true
      } else {
        this.scheduleParams.start = this.scheduleData.startDay
        this.scheduleParams.end = this.scheduleData.endDay
      }
      const scheduleParams = new Blob([JSON.stringify(this.scheduleParams)], {
        type: "application/json",
      })
      formData.append("scheduleParams", scheduleParams)
    }
    if (this.isValid && this.scheduleIsValid) {
      await this.$axios
        .$post("/api/v1/favplaces/update", formData, hedears)
        .then((response: FavplaceResponse) => this.success(response))
        .catch((error: AxiosError<ErrorResponse>) => this.failure(error))
    }
    this.loading = false
  }

  success(response: FavplaceResponse) {
    FavplacesStore.commitCurrentUserFavplace(response.favplace)
    const schedule = response.favplace.schedule
    if (schedule) {
      SchedulesStore.commitSchedule(schedule)
      SchedulesStore.commitNextSchedules()
    }
    GlobalStore.commitToast({ msg: response.message, color: "success" })
  }

  failure(error: AxiosError<ErrorResponse>) {
    GlobalStore.commitToast({ msg: error.message })
  }

  closeDialog() {
    this.syncedDialog = false
  }

  /**
   * スケジュール登録プレビュー
   */
  previewScheduleData() {
    if (this.scheduleData.startDay && this.scheduleData.endDay) {
      if (this.scheduleData.allDay) {
        return this.scheduleData.startDay + " 〜 " + this.scheduleData.endDay
      } else if (!this.scheduleData.allDay && this.scheduleData.startTime && this.scheduleData.endTime) {
        return (
          this.scheduleData.startDay +
          " " +
          this.scheduleData.startTime +
          " 〜 " +
          this.scheduleData.endDay +
          " " +
          this.scheduleData.endTime
        )
      }
    } else {
      return "未設定"
    }
  }
}
</script>
