<template>
  <v-card min-height="600">
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
    />
  </v-card>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import CalendarCard from './calendarCard.vue'
import DataIteratorCard from './dataIteratorCard.vue'
import TimeLineCard from './timeLineCard.vue'
import FavplaceInformation from './favplace/favplaceInformation.vue'
import FavplaceImage from './favplace/favplaceImage.vue'
import FavplaceMap from './favplace/favplaceMap.vue'

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
    FavplaceInformation,
    FavplaceImage,
    FavplaceMap
  }
})
export default class BaseCard extends Vue {
  @Prop({ type: String, default: '' })
    cardTitle!: string

  @Prop({ type: String, default: '' })
    color!: string

  @Prop({ type: Array, default: () => [] })
    icons!: Array<string>

  @Prop({ type: Array, default: () => [] })
    btnIcons!: Array<string>

  @Prop({ type: String, default: '' })
    viewComponent!: string
}
</script>
