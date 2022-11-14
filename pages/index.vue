<template>
  <logged-in-container>
    <template #my-content>
      <v-row class="mt-5">
        <v-col
          cols="12"
          md="6"
          :class="[$vuetify.breakpoint.smAndDown ? 'mb-5': '']"
        >
          <favplace-card
            v-if="getNextSchedule"
            card-title="NextFavplace"
            color="myred"
            :favplace="getNextSchedule.favplace"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <base-card
            card-title="Calendar"
            color="teal darken-1"
            :icons="['mdi-calendar']"
            :btn-icons="['mdi-pencil', 'mdi-dots-vertical']"
            view-component="calendar-card"
          />
        </v-col>
      </v-row>
      <v-row class="mt-10">
        <v-col>
          <base-card
            card-title="Favplaces"
            color="yellow darken-2"
            :icons="['mdi-map-marker-multiple-outline']"
            :btn-icons="['mdi-plus-circle']"
            view-component="data-iterator-card"
          />
        </v-col>
      </v-row>
      <v-row class="mt-10">
        <v-col>
          <base-card
            card-title="TimeLine"
            color="light-blue darken-2"
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

import FavplaceCard from '../components/cards/favplace/favplaceCard.vue'
import BaseCard from '../components/cards/baseCard.vue'
import { GlobalStore, SchedulesStore } from '~/store'

@Component({
  middleware: 'authenticator',
  layout ({ $auth }) {
    return $auth.loggedIn ? 'default' : 'welcome'
  },
  components: {
    FavplaceCard,
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

  get getNextSchedule () {
    return SchedulesStore.getNextSchedule
  }
}
</script>
