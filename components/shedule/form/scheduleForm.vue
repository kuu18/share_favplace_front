<template>
  <v-row>
    <v-col
      cols="12"
    >
      <v-row>
        <v-subheader class="pt-4">
          スケジュール登録
        </v-subheader>
        <v-switch
          v-model="scheduleData.allDay"
          label="終日"
          class="ml-5"
        />
      </v-row>
    </v-col>
    <v-col
      v-if="scheduleData.allDay"
      cols="12"
      md="7"
    >
      <v-row>
        <schedule-form-date-picker
          :date.sync="scheduleData.startDate"
          :label="'開始日'"
        />
        <p class="mr-5 ml-5 pt-5">
          ＞
        </p>
        <schedule-form-date-picker
          :date.sync="scheduleData.endDate"
          :label="'終了日'"
        />
      </v-row>
    </v-col>
    <v-col
      v-if="!scheduleData.allDay"
      cols="12"
    >
      <v-row>
        <schedule-form-date-picker
          :date.sync="scheduleData.startDate"
          :label="'開始日'"
        />
        <schedule-form-time-picker
          :time.sync="scheduleData.startTime"
          :label="'開始時間'"
        />
        <p class="mr-5 ml-5 pt-5">
          ＞
        </p>
        <schedule-form-date-picker
          :date.sync="scheduleData.endDate"
          :label="'終了日'"
        />
        <schedule-form-time-picker
          :time.sync="scheduleData.endTime"
          :label="'終了時間'"
        />
      </v-row>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Component, PropSync, Vue } from 'nuxt-property-decorator'
import ScheduleFormDatePicker from './scheduleFormDatePicker.vue'
import ScheduleFormTimePicker from './scheduleFormTimePicker.vue'

export interface ScheduleData {
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  allDay: boolean
}

@Component({
  components: {
    ScheduleFormDatePicker,
    ScheduleFormTimePicker
  }
})
export default class ScheduleForm extends Vue {
  @PropSync('schedule', { type: Object })
    scheduleData!: ScheduleData
}
</script>
