<template>
  <v-card-text>
    <v-img
      class="white--text align-end"
      :src="imageUrl"
      max-height="500"
      contain
    />
  </v-card-text>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class favplaceImageCard extends Vue {
  @Prop({ type: Number, default: 400 })
    height!: number

  @Prop({ type: String, default: '' })
    imageUrl!: string
}
</script>
