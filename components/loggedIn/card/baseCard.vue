<template>
  <v-card min-height="650">
    <v-card-title class="align-start">
      <v-sheet
        :color="color"
        width="100%"
        class="overflow-hidden mt-n9 transition-swing"
        elevation="6"
        max-width="100%"
        rounded
        dark
      >
        <v-toolbar :color="color" flat>
          <v-toolbar-title>{{ cardTitle }}</v-toolbar-title>
          <v-spacer />
          <v-icon
            v-for="(icon, i) in icons"
            :key="`icon-${i}`"
          >
            {{ icon }}
          </v-icon>
          <v-btn
            v-for="(btnIcon, i) in btnIcons"
            :key="`btnIcon-${i}`"
            icon
          >
            <v-icon>{{ btnIcon }}</v-icon>
          </v-btn>
        </v-toolbar>
      </v-sheet>
    </v-card-title>
    <component
      :is="viewComponent"
      :color="color"
      :favplace="favplace"
    />
  </v-card>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import FavplaceCard from '@/components/favplace/card/favplaceCard.vue'
import CalendarCard from '@/components/shedule/cards/calendarCard.vue'
import DataIteratorCard from '@/components/loggedIn/card/dataIteratorCard.vue'
import TimeLineCard from '@/components/loggedIn/card/timeLineCard.vue'
import { Favplace } from '@/types/Favplace'

export interface Tab {
  name: string,
  icon: string,
  component: string
}

@Component({
  components: {
    CalendarCard,
    DataIteratorCard,
    TimeLineCard,
    FavplaceCard
  }
})
export default class BaseCard extends Vue {
  @Prop({ type: String, default: '' })
    readonly cardTitle!: string

  @Prop({ type: String, default: '' })
    readonly color!: string

  @Prop({ type: Array, default: () => [] })
    readonly icons!: Array<string>

  @Prop({ type: Array, default: () => [] })
    readonly btnIcons!: Array<string>

  @Prop({ type: String, default: '' })
    readonly viewComponent!: string

  @Prop({ type: Object, default: () => ({}) })
    readonly favplace!: Favplace
}
</script>
