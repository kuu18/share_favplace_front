<template>
  <v-card min-height="600">
    <v-card-title class="align-start">
      <v-sheet
        :color="color"
        width="100%"
        class="overflow-hidden mt-n9"
        elevation="6"
        max-width="100%"
        rounded
        dark
      >
        <v-toolbar :color="color" flat>
          <v-toolbar-title>{{ cardTitle }}</v-toolbar-title>
          <v-spacer />
          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
        </v-toolbar>
        <v-tabs
          v-model="tabs"
          background-color="transparent"
          slider-color="white"
        >
          <v-tab href="#information" class="mr-3">
            <v-icon class="mr-2">
              mdi-information-outline
            </v-icon>
            information
          </v-tab>
          <v-tab href="#image" class="mr-3">
            <v-icon class="mr-2">
              mdi-camera-image
            </v-icon>
            image
          </v-tab>
          <v-tab href="#map">
            <v-icon class="mr-2">
              mdi-google-maps
            </v-icon>
            map
          </v-tab>
        </v-tabs>
      </v-sheet>
    </v-card-title>
    <v-tabs-items
      v-model="tabs"
    >
      <v-tab-item value="information">
        <favplace-information
          :favplace="favplace"
        />
      </v-tab-item>
      <v-tab-item value="image">
        <favplace-image
          :image-url="favplace.imageUrl"
          :height="height"
        />
      </v-tab-item>
      <v-tab-item value="map">
        <favplace-map />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import FavplaceImage from './favplaceImage.vue'
import FavplaceMap from './favplaceMap.vue'
import FavplaceInformation from './favplaceInformation.vue'
import { ResponseFavplace } from '~/types/Favplace'

@Component({
  components: {
    FavplaceInformation,
    FavplaceImage,
    FavplaceMap
  }
})
export default class FavplaceCard extends Vue {
  tabs = 'information'
  @Prop({ type: String, default: '' })
    cardTitle!: string

  @Prop({ type: String, default: '' })
    color!: string

  @Prop({ type: Number, default: 400 })
    height!: number

  @Prop({ type: Object, default: () => {}, required: true })
    favplace!: ResponseFavplace
}
</script>
