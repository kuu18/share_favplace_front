<template>
  <v-dialog v-model="syncedDialog" scrollable persistent max-width="1000px">
    <v-card>
      <v-toolbar dark dense color="grey darken-3">
        <v-btn icon dark @click="closeDialog()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>スケジュール登録フォーム</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="pt-10">
        <v-form ref="form" v-model="syncedIsValid">
          <v-row class="d-flex justify-center">
            <v-col cols="12" xl="8" lg="8" md="8">
              <v-row>
                <v-switch v-model="syncedSchedule.allDay" class="ml-2" label="終日" />
              </v-row>
            </v-col>
            <v-col v-if="syncedSchedule.allDay" cols="12" xl="8" lg="8" md="8">
              <v-row class="my-5">
                <schedule-form-date-picker
                  :date.sync="syncedSchedule.startDay"
                  :max="syncedSchedule.endDay"
                  :validation.sync="startDayRules"
                  :label="'開始日'"
                />
              </v-row>
              <v-row class="my-5">
                <schedule-form-date-picker
                  :date.sync="syncedSchedule.endDay"
                  :min="syncedSchedule.startDay"
                  :validation.sync="endDayRules"
                  :label="'終了日'"
                />
              </v-row>
            </v-col>
            <v-col v-if="!syncedSchedule.allDay" cols="12" xl="8" lg="8" md="8">
              <v-row class="my-5">
                <schedule-form-date-picker
                  :date.sync="syncedSchedule.startDay"
                  :max="syncedSchedule.endDay"
                  :label="'開始日'"
                  :validation.sync="startDayRules"
                />
                <schedule-form-time-picker
                  :time.sync="syncedSchedule.startTime"
                  :max="
                    syncedSchedule.startDay === syncedSchedule.endDay ? syncedSchedule.endTime : ''
                  "
                  :label="'開始時間'"
                  :validation.sync="startTimeRules"
                />
              </v-row>
              <v-row class="my-5">
                <schedule-form-date-picker
                  :date.sync="syncedSchedule.endDay"
                  :min="syncedSchedule.startDay"
                  :label="'終了日'"
                  :validation.sync="endDayRules"
                />
                <schedule-form-time-picker
                  :time.sync="syncedSchedule.endTime"
                  :min="
                    syncedSchedule.startDay === syncedSchedule.endDay
                      ? syncedSchedule.startTime
                      : ''
                  "
                  :label="'終了時間'"
                  :validation.sync="endTimeRules"
                />
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions class="pb-3 pt-3" style="background-color: #f5f5f4">
        <v-btn dark color="black" outlined @click="closeDialog()"> 閉じる </v-btn>
        <v-spacer />
        <v-slide-x-reverse-transition>
          <v-tooltip left color="myblue">
            <template #activator="{ on, attrs }">
              <v-btn icon class="my-0" color="myblue" v-bind="attrs" @click="resetForm" v-on="on">
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <span>フォームリセット</span>
          </v-tooltip>
        </v-slide-x-reverse-transition>
        <v-btn
          color="myblack"
          :disabled="loading"
          :loading="loading"
          @click.stop="checkScheduleData()"
        >
          <span style="color: white">登録する</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Component, PropSync, Vue, Ref } from 'nuxt-property-decorator';
import ScheduleFormDatePicker from "@/components/shedule/form/scheduleFormDatePicker.vue"
import ScheduleFormTimePicker from "@/components/shedule/form/scheduleFormTimePicker.vue"
import { ScheduleData } from "@/types/schedule"
import { Validation } from "@/types/validation"

@Component({
  components: {
    ScheduleFormDatePicker,
    ScheduleFormTimePicker,
  },
})
export default class RegisterScheduleDialog extends Vue {
  initialSchedule = {} as ScheduleData
  loading = false
  startDayRules: Array<Validation> = []
  endDayRules: Array<Validation> = []
  startTimeRules: Array<Validation> = []
  endTimeRules: Array<Validation> = []

  @PropSync("dialog", { type: Boolean, default: false })
  syncedDialog!: boolean

  @PropSync("schedule", { type: Object, default: () => ({}) })
  syncedSchedule!: ScheduleData

  @PropSync("isValid", { type: Boolean, default: false })
  syncedIsValid!: boolean

  @Ref()
  form!: HTMLFormElement

  // スケジュールの初期値をコピーする
  created() {
    this.initialSchedule = Object.assign({}, this.syncedSchedule);
  }

  /**
   * スケジュールバリデーションチェック
   */
  async checkScheduleData() {
    this.resetRules()
    // 開始日が入力されていないかつ終了日が入力されている場合バリデーションエラー
    if (!this.syncedSchedule.startDay && this.syncedSchedule.endDay) {
      this.startDayRules.push("開始日を入力してください。")
    }
    // 開始日が入力されているかつ終了日が入力されていない場合バリデーションエラー
    else if (this.syncedSchedule.startDay && !this.syncedSchedule.endDay) {
      this.endDayRules.push("終了日を入力してください。")
    }
    // 時間指定の場合
    if (!this.syncedSchedule.allDay) {
      // 開始日が入力されていないかつ開始時間が入力されている場合バリデーションエラー
      if (!this.syncedSchedule.startDay && this.syncedSchedule.startTime) {
        this.startDayRules.push("開始日を入力してください。")
      }
      // 開始日が入力されているかつ開始時間が入力されていない場合バリデーションエラー
      else if (this.syncedSchedule.startDay && !this.syncedSchedule.startTime) {
        this.startTimeRules.push("開始時間を入力してください。")
      }
      // 終了日が入力されていないかつ終了時間が入力されている場合バリデーションエラー
      if (!this.syncedSchedule.endDay && this.syncedSchedule.endTime) {
        this.endDayRules.push("終了日を入力してください。")
      }
      // 終了日が入力されているかつ終了時間が入力されていない場合バリデーションエラー
      else if (this.syncedSchedule.endDay && !this.syncedSchedule.endTime) {
        this.endTimeRules.push("終了時間を入力してください。")
      }
    }
    await this.form.validate()
    if (this.syncedIsValid) {
      this.initialSchedule = Object.assign({}, this.syncedSchedule)
      this.syncedDialog = false
    }
  }

  /**
   * バリデーションリセット
   */
  resetRules() {
    this.startDayRules = []
    this.startTimeRules = []
    this.endDayRules = []
    this.endTimeRules = []
  }

  /**
   * ダイアログ閉じる処理
   */
  closeDialog() {
    this.syncedSchedule = Object.assign({}, this.initialSchedule)
    this.syncedDialog = false
  }

  /**
   * formリセット処理
   */
  resetForm() {
    this.form.reset()
  }
}
</script>
