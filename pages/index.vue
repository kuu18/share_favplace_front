<template>
  <logged-in-container>
    <template #my-content>
      <v-row :class="$vuetify.breakpoint.mdAndUp ? 'my-5 mx-5' : 'my-5'">
        <v-col
          cols="12"
          md="6"
          :class="[$vuetify.breakpoint.smAndDown ? 'mb-5': '']"
        >
          <base-card
            v-if="getNextSchedules.length !== 0"
            card-title="NextSchedules"
            view-component="next-schedules-card"
          />
          <base-card
            v-if="getNextSchedules.length === 0"
            card-title="Information"
            :icons="['mdi-information-outline']"
            view-component="information-card"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <base-card
            card-title="Calendar"
            :icons="['mdi-calendar']"
            :btn-icons="['mdi-pencil', 'mdi-dots-vertical']"
            view-component="calendar-card"
          />
        </v-col>
      </v-row>
      <v-row :class="$vuetify.breakpoint.mdAndUp ? 'my-5 mx-5' : 'my-5'">
        <v-col>
          <base-card
            card-title="Favplaces"
            :icons="['mdi-map-marker-multiple-outline']"
            :btn-icons="['mdi-plus-circle']"
            view-component="data-iterator-card"
          />
        </v-col>
      </v-row>
      <v-row :class="$vuetify.breakpoint.mdAndUp ? 'my-5 mx-5' : 'my-5'">
        <v-col>
          <base-card
            card-title="TimeLine"
            :icons="['mdi-timeline']"
            :btn-icons="['mdi-plus-circle']"
            view-component="time-line-card"
          />
        </v-col>
      </v-row>
    </template>
  </logged-in-container>
</template>

<script lang = "ts">
import { Component, Vue } from 'nuxt-property-decorator'

import BaseCard from '@/components/loggedIn/card/baseCard.vue'
import { GlobalStore, SchedulesStore } from '~/store'

@Component({
  middleware: 'authenticator',
  layout ({ $auth }) {
    return $auth.loggedIn ? 'default' : 'welcome'
  },
  components: {
    BaseCard
  }
})
export default class Index extends Vue {
  async created () {
    const message = await this.$route.query.message
    const color = await this.$route.query.color
    const timeout = await this.$route.query.timeout
    if (message) { GlobalStore.commitToast({ msg: String(message), color: String(color), timeout: Number(timeout) }) }
  }

  get getNextSchedules () {
    return SchedulesStore.getNextSchedules
  }
}
</script>
