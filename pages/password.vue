<template>
  <v-container>
    <nuxt-child />
  </v-container>
</template>

<script lang = 'ts'>
import { Component, Vue } from 'nuxt-property-decorator'
@Component({
  layout: 'beforeLogin',
  middleware ({ route, redirect }) {
    if (route.name === 'password') { return redirect('/') }
  }
})
export default class Password extends Vue {
}
</script>
