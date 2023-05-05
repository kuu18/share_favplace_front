<template>
  <v-dialog v-model="syncedDialog" scrollable :max-width="getWidth">
    <v-card flat>
    <v-toolbar color="myblack" dark>
      <v-card-title>Favplace詳細</v-card-title>
      <v-spacer />
      <v-btn icon @click="syncedDialog = false"><v-icon>mdi-close</v-icon></v-btn>
    </v-toolbar>
      <v-card-text>
        <favplace-card :favplace="favplace" :color="'mygrey'" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Component, PropSync, Vue, Prop } from 'nuxt-property-decorator';
import { Favplace } from '@/types/Favplace';
import FavplaceCard from '@/components/favplace/card/favplaceCard.vue';

@Component({
  components: {
    FavplaceCard
  },
})
export default class ShowFavplaceDialog extends Vue {
  @PropSync("dialog", { type: Boolean, default: false })
  syncedDialog!: boolean

  @Prop({ type: Object, default: () => ({}), required: true })
  readonly favplace!: Favplace

  get getWidth(){
    return window.innerWidth - 500
  }
}
</script>
