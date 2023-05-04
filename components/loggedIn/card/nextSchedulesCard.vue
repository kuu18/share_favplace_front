<template>
  <v-carousel
    class="pa-2"
    height="100%"
    hide-delimiter-background
    show-arrows-on-hover
    hide-delimiters
  >
    <v-carousel-item v-for="(schedule, i) in getNextSchedules" :key="`schedule-key-${i}`">
      <v-card class="pa-2" flat>
        <v-img
          class="white--text align-end"
          height="200px"
          :src="schedule.favplace.imageUrl"
          gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
        >
          <v-card-title class="font-weight-black">{{ $my.omitString(schedule.name, 15) }}</v-card-title>
        </v-img>
      <v-row>
          <div
            class="mb-auto pa-2"
            :class="$vuetify.breakpoint.mdAndUp ? 'text-subtitle-1' : 'text-subtitle-3'"
          >
            <br />
            <span class="font-weight-bold">開始</span><br />
            <span class="grey--text ml-2">
              {{
                schedule.timed
                  ? $my.dateTimeFormat(new Date(schedule.start))
                  : $my.dateFormat(new Date(schedule.start))
              }}
            </span>
            <br />
            <span class="font-weight-bold">終了</span><br />
            <span class="grey--text ml-2">
              {{
                schedule.timed
                  ? $my.dateTimeFormat(new Date(schedule.end))
                  : $my.dateFormat(new Date(schedule.end))
              }}
            </span>
          </div>
      </v-row>
    </v-card>
    </v-carousel-item>
  </v-carousel>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import { SchedulesStore } from "@/store"

@Component({
})
export default class NextSchedulesCard extends Vue {
  get getNextSchedules() {
    return SchedulesStore.getNextSchedules
  }

  // インフォメーションカード取得
  get getInformationCard() {
    // 今後予定があるなら
    if (this.getNextSchedules.length !== 0) {
      const today = new Date().getDate()
      const todaySchedules = []
      this.getNextSchedules.forEach((schedule) => {
        const startDay = new Date(schedule.scheduleData.startDay).getDate()
        const endDay = new Date(schedule.scheduleData.endDay).getDate()
        if (startDay <= today && endDay >= today) {
          todaySchedules.push(schedule)
        }
      })
      // 当日の予定があるなら
      if (todaySchedules.length !== 0) {
        return "TodaySchedules"
      } else {
        return "NextSchedules"
      }
    } else {
      return "Information"
    }
  }
}
</script>
