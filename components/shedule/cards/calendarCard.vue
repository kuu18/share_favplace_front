<template>
  <v-card class="ma-2 mt-10" flat>
    <v-toolbar flat color="transparent">
      <v-btn fab text small color="grey darken-2" @click="prev">
        <v-icon small> mdi-chevron-left </v-icon>
      </v-btn>
      <v-spacer />
      <v-toolbar-title v-if="calendar">
        <v-btn text xl @click="type = 'month'">{{ calendar.title }}</v-btn>
      </v-toolbar-title>
      <v-toolbar-title v-if="!calendar">
        <v-btn text xl @click="type = 'month'">{{ getDateTitle }}</v-btn>
      </v-toolbar-title>
      <v-spacer />
      <v-btn fab text small color="grey darken-2" @click="next">
        <v-icon small> mdi-chevron-right </v-icon>
      </v-btn>
    </v-toolbar>
    <v-sheet :height="$vuetify.breakpoint.xlOnly ? '700px' : '500px'">
      <v-calendar
        ref="calendar"
        v-model="focus"
        :events="getSchedules"
        :event-color="getEventColor"
        event-text-color="myblack"
        :type="type"
        @click:event="showSchedule"
        @click:more="viewDay"
        @click:date="viewDay"
      />
    </v-sheet>
  </v-card>
</template>
<script lang="ts">
import { Component, Ref, Vue } from "nuxt-property-decorator"
import { SchedulesStore } from "@/store"
import { Schedule } from "@/types/schedule"

interface Event {
  name: string
  start: Date
  end: Date
  color: string
  timed: boolean
  details: string
}

interface Label {
  month: string
  day: string
}

@Component
export default class CalendarCard extends Vue {
  focus = ""
  type: keyof Label = "month"
  typeToLabel: Label = {
    month: "Month",
    day: "Day",
  }

  events: Array<Event> = []

  @Ref()
  calendar!: Vue & {
    title: string
    prev: () => void
    next: () => void
    checkChange: () => void
  }

  mounted() {
    this.calendar.checkChange()
  }

  viewDay({ date }: { date: string }) {
    this.focus = date
    this.type = "day"
  }

  getEventColor(event: Schedule) {
    return event.color ? event.color : "blue"
  }

  setToday() {
    this.focus = ""
    this.type = "day"
  }

  prev() {
    this.calendar.prev()
  }

  next() {
    this.calendar.next()
  }

  showSchedule({ event }: { event: Schedule }) {
    this.$router.push(`/favplace/${event.favplace.id}`)
  }

  get getSchedules() {
    return SchedulesStore.getSchedules
  }

  get getDateTitle() {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    return month + "月 " + year + "年"
  }
}
</script>
