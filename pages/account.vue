<template>
  <v-container>
    <nuxt-child />
  </v-container>
</template>

<script lang = 'ts'>
import { Component, Vue } from 'vue-property-decorator';
@Component({
  layout: 'loggedIn',
  validate ({ route }) {
    return route.name !== 'account'
  }
})
export default class Account extends Vue {
}
</script>
