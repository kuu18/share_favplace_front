<template>
  <v-card-text>
    <v-sheet height="64">
      <v-toolbar
        flat
      >
        <v-btn
          outlined
          class="mr-4"
          color="grey darken-2"
          @click="setToday"
        >
          Today
        </v-btn>
        <v-btn
          fab
          text
          small
          color="grey darken-2"
          @click="prev"
        >
          <v-icon small>
            mdi-chevron-left
          </v-icon>
        </v-btn>
        <v-btn
          fab
          text
          small
          color="grey darken-2"
          @click="next"
        >
          <v-icon small>
            mdi-chevron-right
          </v-icon>
        </v-btn>
        <v-toolbar-title v-if="calendar">
          {{ calendar.title }}
        </v-toolbar-title>
        <v-toolbar-title v-if="!calendar">
          {{ getDateTitle }}
        </v-toolbar-title>
        <v-spacer />
        <v-menu
          bottom
          right
        >
          <template #activator="{ on, attrs }">
            <v-btn
              outlined
              color="grey darken-2"
              v-bind="attrs"
              v-on="on"
            >
              <span>{{ typeToLabel[type] }}</span>
              <v-icon right>
                mdi-menu-down
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="type = 'day'">
              <v-list-item-title>Day</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'week'">
              <v-list-item-title>Week</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'month'">
              <v-list-item-title>Month</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = '4day'">
              <v-list-item-title>4 days</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
    </v-sheet>
    <v-sheet min-height="400">
      <v-calendar
        ref="calendar"
        v-model="focus"
        color="primary"
        :events="getSchedules"
        :event-color="getEventColor"
        :type="type"
        @click:event="showSchedule"
        @click:more="viewDay"
        @click:date="viewDay"
      />
      <v-menu
        v-model="selectedOpen"
        :close-on-content-click="false"
        :activator="selectedElement"
        offset-x
      >
        <v-card
          color="grey lighten-4"
          min-width="350px"
          flat
        >
          <v-toolbar
            :color="selectedEvent.color"
            dark
          >
            <v-btn icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-toolbar-title v-html="selectedEvent.name" />
            <v-spacer />
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <span v-html="selectedEvent.details" />
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              color="secondary"
              @click="selectedOpen = false"
            >
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-sheet>
  </v-card-text>
</template>
<script lang='ts'>
import { Component, Ref, Vue } from 'nuxt-property-decorator'
import { SchedulesStore } from '~/store'
import { Schedule } from '~/types/schedule'

interface Event {
  name?: string
  start?: Date
  end?: Date
  color?: string
  timed?: boolean
  details?: string
}

interface Label {
  month: string
  week: string
  day: string
  '4day': string
}

@Component
export default class CalendarCard extends Vue {
  focus = ''
  type: keyof Label = 'month'
  typeToLabel = {
    month: 'Month',
    week: 'Week',
    day: 'Day',
    '4day': '4 Days'
  } as Label

  selectedEvent: Event = {}
  selectedElement = null
  selectedOpen = false
  events: Array<Event> = [{
    name: 'イベント名',
    start: new Date('2022-10-20T15:24:00'),
    end: new Date('2022-10-21T15:24:00'),
    color: 'indigo',
    timed: true,
    details: 'テストイベントテストイベントテストイベント'
  }]

  @Ref()
    calendar!: Vue & {
    title: string
    prev: () => void;
    next: () => void;
    checkChange: () => void;
  }

  mounted () {
    this.calendar.checkChange()
  }

  viewDay ({ date }: {date: string}) {
    this.focus = date
    this.type = 'day'
  }

  getEventColor (event: Schedule) {
    return event.color ? event.color : 'blue'
  }

  setToday () {
    this.focus = ''
    this.type = 'day'
  }

  prev () {
    this.calendar.prev()
  }

  next () {
    this.calendar.next()
  }

  showSchedule ({ event }: {event: Schedule}) {
    this.$router.push(`/favplace/${event.favplace.id}`)
  }

  get getSchedules () {
    return SchedulesStore.getSchedules
  }

  get getDateTitle () {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    return month + '月 ' + year
  }
}
</script>
