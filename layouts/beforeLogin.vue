<template>
  <v-app>
    <bef-login-app-bar />
    <v-main style="background-color: aliceblue;">
      <nuxt />
    </v-main>
    <bef-login-footer />
  </v-app>
</template>

<script lang = 'ts'>
import { Component, Vue } from 'nuxt-property-decorator'
import befLoginAppBar from '../components/beforeLogin/befLoginAppBar.vue'
import BefLoginFooter from '../components/beforeLogin/befLoginFooter.vue'

@Component({
  components: {
    befLoginAppBar,
    BefLoginFooter
  },
  middleware: 'loggedInIsRedirects'
})
export default class befLogin extends Vue {
}
</script>
