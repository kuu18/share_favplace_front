<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <favplace-image-card
            :image-url="getImageUrl"
          />
          <favplace-information-card
            :favplace="getFavplace"
          />
          <favplace-map-card
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
import favplaceInformationCard from '../../components/favplace/card/favplaceInformationCard.vue'
import favplaceImageCard from '../../components/favplace/card/favplaceImageCard.vue'
import favplaceMapCard from '../../components/favplace/card/favplaceMapCard.vue'
import { FavplacesStore } from '~/store'

@Component({
  components: {
    favplaceInformationCard,
    favplaceImageCard,
    favplaceMapCard
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
    return FavplacesStore.getAddress(this.getFavplace)
  }
}
</script>
