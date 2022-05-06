<template>
  <v-container fluid>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        class="my-8 text-center"
      >
        <h1 class="text-h5 font-weight-bold">
          {{ appName }}に{{ pageTitle }}
        </h1>
      </v-col>

      <v-card
        flat
        width="80%"
        max-width="320"
        color="transparent"
      >
        <slot name="form-card-content" />
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang = 'ts'>
import { Component, Vue } from 'vue-property-decorator';
import { TranslateResult } from 'vue-i18n'

@Component
export default class befLoginFormCard extends Vue {
  appName: string = this.$config.appName
  pageTitle: TranslateResult = this.$t(`pages.${this.$route.name}`)
}
</script>