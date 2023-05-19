<template>
  <v-toolbar-title>
    {{ appName }}
  </v-toolbar-title>
</template>
<script lang = 'ts'>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class AppTitle extends Vue {
  appName: string = this.$config.appName
}
</script>
