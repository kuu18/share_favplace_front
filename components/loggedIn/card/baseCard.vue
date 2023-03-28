<template>
  <v-card class="my-3 pa-3" color="#F5F5F4" elevation="10" :min-height="$vuetify.breakpoint.lgAndDown ? '700px' : '900px'">
    <v-sheet
      width="100%"
      class="overflow-hidden mt-n9 transition-swing"
      elevation="6"
      rounded
      dark
    >
      <v-toolbar color="#50554E" flat>
        <v-toolbar-title class="font-weight-bold">{{ cardTitle }}</v-toolbar-title>
        <v-spacer />
        <v-icon v-for="(icon, i) in icons" :key="`icon-${i}`">
          {{ icon }}
        </v-icon>
        <v-btn v-for="(btnIcon, i) in btnIcons" :key="`btnIcon-${i}`" icon>
          <v-icon>{{ btnIcon }}</v-icon>
        </v-btn>
      </v-toolbar>
    </v-sheet>
    <component :is="viewComponent" :favplace="favplace" />
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator"
import InformationCard from "./informationCard.vue"
import FavplaceCard from "@/components/favplace/card/favplaceCard.vue"
import CalendarCard from "@/components/shedule/cards/calendarCard.vue"
import DataIteratorCard from "@/components/loggedIn/card/dataIteratorCard.vue"
import TimeLineCard from "@/components/loggedIn/card/timeLineCard.vue"
import NextSchedulesCard from "@/components/loggedIn/card/nextSchedulesCard.vue"
import { Favplace } from "@/types/Favplace"

export interface Tab {
  name: string
  icon: string
  component: string
}

@Component({
  components: {
    CalendarCard,
    DataIteratorCard,
    TimeLineCard,
    FavplaceCard,
    InformationCard,
    NextSchedulesCard,
  },
})
export default class BaseCard extends Vue {
  @Prop({ type: String, default: "" })
  readonly cardTitle!: string

  @Prop({ type: Array, default: () => [] })
  readonly icons!: Array<string>

  @Prop({ type: Array, default: () => [] })
  readonly btnIcons!: Array<string>

  @Prop({ type: String, default: "" })
  readonly viewComponent!: string

  @Prop({ type: Object, default: () => ({}) })
  readonly favplace!: Favplace
}
</script>
