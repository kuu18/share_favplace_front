<template>
  <v-card-text>
    <v-sheet>
      <iframe
        :src="`https://maps.google.co.jp/maps?output=embed&t=m&hl=ja&z=18&q=${address}`"
        allowfullscreen
        frameborder="0"
        height="400"
        style="border:0"
        width="100%"
      />
    </v-sheet>
  </v-card-text>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class FavplaceMap extends Vue {
  @Prop({ type: String, default: '' })
    address!: string
}
</script>
