<template>
  <v-carousel
    class="pa-2 align-self-stretch"
    height="100%"
    hide-delimiter-background
    show-arrows-on-hover
    hide-delimiters
  >
    <v-carousel-item v-for="(schedule, i) in getNextSchedules" :key="i">
      <v-row>
        <v-col cols="12" :class="$vuetify.breakpoint.mdAndUp && 'ml-5 mt-3'">
          <div
            class="font-weight-black"
            :class="
              $vuetify.breakpoint.lgAndUp
                ? 'text-h5'
                : 'text-h6'
            "
          >
            {{ $my.omitString(schedule.name, 15) }}
          </div>
        </v-col>
        <v-col cols="12" lg="6" xl="6" :class="$vuetify.breakpoint.mdAndUp && 'ml-3'">
          <v-img
            :class="$vuetify.breakpoint.smAndDown && 'ma-1'"
            :src="schedule.favplace.imageUrl"
            style="border-radius: 10%"
          />
        </v-col>
        <v-col cols="12" lg="5" xl="5" class="d-flex align-start flex-column mb-6">
          <div class="pa-2">
            <v-btn
              class="mr-2"
              dark
              fab
              depressed
              color="#50554E"
              nuxt
              :to="`/favplace/${schedule.favplace.id}`"
            >
              <v-icon dark>mdi-open-in-new</v-icon>
            </v-btn>
            <span class="grey--text ml-2">詳細を表示する</span>
          </div>
        </v-col>
      </v-row>
      <v-row class="">
        <v-col cols="12" :class="$vuetify.breakpoint.mdAndUp && 'ml-5 mt-3'">
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
        </v-col>
      </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import { SchedulesStore } from "@/store"

@Component
export default class NextSchedulesCard extends Vue {
  defaultImgUrl = "https://share-favplace-local.s3.ap-northeast-1.amazonaws.com/default"
  colors = ["indigo", "warning", "pink darken-2", "red lighten-1", "deep-purple accent-4"]

  slides = ["First", "Second", "Third", "Fourth", "Fifth"]

  get getNextSchedules() {
    return SchedulesStore.getNextSchedules
  }

  omitString(str: string, maxLength: number) {
    const MAX_LENGTH = maxLength
    if (str.length > MAX_LENGTH) {
      if (this.$vuetify.breakpoint.xl) {
        return str.slice(0, MAX_LENGTH * 1.5) + "..."
      }
      return str.slice(0, MAX_LENGTH) + "..."
    }
    return str
  }
}
</script>
