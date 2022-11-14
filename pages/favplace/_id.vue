<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <favplace-image
            :image-url="getImageUrl"
          />
          <favplace-information
            :favplace="getFavplace"
            :show-btn="false"
          />
          <favplace-map
            :address="getAddress"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang = 'ts'>
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import FavplaceInformation from '../../components/cards/favplace/favplaceInformation.vue'
import FavplaceImage from '../../components/cards/favplace/favplaceImage.vue'
import FavplaceMap from '../../components/cards/favplace/favplaceMap.vue'
import { FavplacesStore } from '~/store'

@Component({
  components: {
    FavplaceInformation,
    FavplaceImage,
    FavplaceMap
  },
  async asyncData (route: Context) {
    const id = await Number(route.params.id)
    await FavplacesStore.fetchFavplaceById(id)
  }
})
export default class FavplaceShow extends Vue {
  get getFavplace () {
    return FavplacesStore.getFavplace
  }

  get getImageUrl () {
    return this.getFavplace?.imageUrl
  }

  get getAddress () {
    if (this.getFavplace) { return FavplacesStore.getAddress(this.getFavplace) }
  }
}
</script>
