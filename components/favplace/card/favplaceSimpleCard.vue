<template>
  <v-card style="cursor: pointer;" @click.stop="dialog = true">
    <favplace-image-card :image-url="favplace.imageUrl"/>
    <v-divider />
    <v-card-subtitle class="font-weight-black text-no-wrap text-truncate">
      {{ favplace.favplacename }}
    </v-card-subtitle>
    <show-favplace-dialog :dialog.sync="dialog" :favplace="favplace" />
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import FavplaceImageCard from '@/components/favplace/card/favplaceImageCard.vue';
import { Favplace } from '@/types/Favplace'
import ShowFavplaceDialog from '@/components/favplace/dialog/showFavplaceDialog.vue';

@Component({
  components: {
    FavplaceImageCard,
    ShowFavplaceDialog
  }
})
export default class FavplaceSimpleCard extends Vue {
  dialog = false

  @Prop({ type: Object, default: () => ({}), required: true })
    favplace!: Favplace

}
</script>
