<template>
  <v-card :elevation="elevation" class="mb-5">
    <v-toolbar flat>
      <v-tabs
        v-model="tabs"
        background-color="transparent"
        :right="$vuetify.breakpoint.smAndDown ? true : false"
        :slider-color="color"
        :color="color"
      >
        <v-tab href="#information">
          <v-icon class="mr-2">
            mdi-information-outline
          </v-icon>
          information
        </v-tab>
        <v-tab href="#image">
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
      <v-spacer />
      <v-btn icon @click.stop="sDialog = true">
        <v-icon>mdi-dots-horizontal</v-icon>
      </v-btn>
      <setting-dialog :dialog.sync="sDialog" :favplace="favplace" />
    </v-toolbar>
    <v-divider />
    <v-card-actions>
      <v-btn icon>
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-comment-outline</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bookmark-outline</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn icon nuxt :to="`/favplace/${favplace.id}`">
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-card-actions>
    <v-tabs-items v-model="tabs">
      <v-tab-item value="information">
        <favplace-information-card :favplace="favplace" :color="color" />
      </v-tab-item>
      <v-tab-item value="image">
        <favplace-image-card :image-url="favplace.imageUrl" :height="height" />
      </v-tab-item>
      <v-tab-item value="map">
        <favplace-map-card :address="getAddress" />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import SettingDialog from '../dialog/settingDialog.vue'
import favplaceInformationCard from './favplaceInformationCard.vue'
import favplaceImageCard from './favplaceImageCard.vue'
import favplaceMapCard from './favplaceMapCard.vue'
import { FavplacesStore } from '~/store'
import { Favplace } from '~/types/Favplace'

@Component({
  components: {
    favplaceInformationCard,
    favplaceImageCard,
    favplaceMapCard,
    SettingDialog
  }
})
export default class FavplaceCard extends Vue {
  tabs = 'information'
  sDialog = false
  @Prop({ type: String, default: '' })
    cardTitle!: string

  @Prop({ type: String, default: '' })
    color!: string

  @Prop({ type: Number, default: 400 })
    height!: number

  @Prop({ type: Number, default: 0 })
    elevation!: number

  @Prop({ type: Object, default: () => ({}), required: true })
    favplace!: Favplace

  get getAddress () {
    return FavplacesStore.getAddress(this.favplace)
  }
}
</script>
