<template>
  <v-app>
    <logged-in-app-bar />
    <v-main>
      <toaster />
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import LoggedInAppBar from '@/components/loggedIn/header/loggedInAppBar.vue'
import Toaster from '@/components/ui/toaster.vue'

@Component({
  components: {
    LoggedInAppBar,
    Toaster
  },
  middleware: 'authenticator'
})
export default class LoggedIn extends Vue {
}
</script>
