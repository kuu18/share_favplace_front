<template>
  <v-app>
    <logged-in-app-bar />
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import LoggedInAppBar from '@/components/loggedIn/header/loggedInAppBar.vue';

@Component({
  components: {
    LoggedInAppBar
  },
  middleware: 'authenticator'
})
export default class LoggedIn extends Vue{
}
</script>