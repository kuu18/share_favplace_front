<template>
  <v-container fluid>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        v-if="title != ''"
        cols="12"
        class="my-8 text-center"
      >
        <h1 class="text-h5 font-weight-bold">
          {{ title }}
        </h1>
      </v-col>

      <v-card
        flat
        width="80%"
        max-width="320"
        color="transparent mt-10 mb-10"
      >
        <slot name="form-card-content" />
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang = 'ts'>
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class LoggedinFormCard extends Vue {
  @Prop({ type: String, default: '' })
    title!: string
}
</script>
