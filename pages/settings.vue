<template>
  <v-container>
    <nuxt-child />
  </v-container>
</template>

<script lang = 'ts'>
import { Component, Vue } from 'nuxt-property-decorator'
@Component({
  layout: 'loggedIn',
  middleware ({ route, redirect }) {
    if (route.name === 'settings') { return redirect('/') }
  }
})
export default class Settings extends Vue {
}
</script>
