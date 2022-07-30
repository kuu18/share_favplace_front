<template>
  <v-container fluid>
    <slot name="my-content" />
  </v-container>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class LoggedInContainer extends Vue {
}
</script>
