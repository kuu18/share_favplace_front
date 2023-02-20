<template>
  <v-card-text>
    <v-card-subtitle class="font-weight-bold">
      {{ favplace.favplacename }}
    </v-card-subtitle>
    <v-list class="transparent" min-height="200">
      <v-list-item>
        <v-list-item-icon>
          <v-icon :color="color">
            mdi-map-marker
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Address</v-list-item-title>
          <v-list-item-subtitle>{{ getAddress }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset />

      <v-list-item>
        <v-list-item-icon>
          <v-icon :color="color">
            mdi-phone
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Phone</v-list-item-title>
          <v-list-item-subtitle>999-9999-9999</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset />

      <v-list-item>
        <v-list-item-icon>
          <v-icon :color="color">
            mdi-tag
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Category</v-list-item-title>
          <v-list-item-subtitle>{{ getCategoryName }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset />

      <v-list-item>
        <v-list-item-icon>
          <v-icon :color="color">
            mdi-web
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>URL</v-list-item-title>
          <v-list-item-subtitle>
            <a :href="favplace.referenceUrl" target="_blank">{{
              favplace.referenceUrl
            }}</a>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset />

      <v-list-item>
        <v-list-item-icon>
          <v-icon :color="color">
            mdi-calendar
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Schedule</v-list-item-title>
          <v-list-item-subtitle>{{ getScheduleById }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset />

      <v-expansion-panels accordion flat>
        <v-expansion-panel>
          <v-expansion-panel-header>More</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card-subtitle>
              <v-icon :color="color">
                mdi-tooltip-plus-outline
              </v-icon>
              Remarks
            </v-card-subtitle>
            <v-card-text>{{ favplace.remarks }}</v-card-text>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-list>
  </v-card-text>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { FavplacesStore, SchedulesStore } from '~/store'
import { Favplace } from '~/types/Favplace'

@Component
export default class favplaceInformationCard extends Vue {
  @Prop({ type: Object, default: () => ({}), required: true })
    favplace!: Favplace

  @Prop({ type: String, default: '' })
  readonly color!: string

  get getCategoryName () {
    return this.favplace.categoryName ? this.favplace.categoryName : '未設定'
  }

  get getAddress () {
    return FavplacesStore.getAddress(this.favplace)
  }

  get getScheduleById () {
    const schedule = this.favplace.schedule ? SchedulesStore.getScheduleById(this.favplace.schedule.id) : null
    if (schedule) {
      const start = new Date(schedule.start)
      const end = new Date(schedule.end)
      let format = ''
      if (schedule.timed) {
        format = 'YYYY年MM月DD日HH時mm分'
        return (
          this.dateTimeFormat(start, format) +
          ' 〜 ' +
          this.dateTimeFormat(end, format)
        )
      } else {
        format = 'YYYY年MM月DD日'
        return (
          this.dateFormat(start, format) + ' 〜 ' + this.dateFormat(end, format)
        )
      }
    }
    return '未設定'
  }

  dateTimeFormat (date: Date, format: string) {
    format = format.replace(/YYYY/, String(date.getFullYear()))
    format = format.replace(/MM/, String(date.getMonth() + 1))
    format = format.replace(/DD/, String(date.getDate()))
    format = format.replace(/HH/, String(date.getHours()))
    format =
      date.getMinutes() !== 0
        ? format.replace(/mm/, String(date.getMinutes()))
        : format.substring(0, format.length - 3)
    return format
  }

  dateFormat (date: Date, format: string) {
    format = format.replace(/YYYY/, String(date.getFullYear()))
    format = format.replace(/MM/, String(date.getMonth() + 1))
    format = format.replace(/DD/, String(date.getDate()))
    return format
  }
}
</script>
