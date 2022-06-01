<template>
  <v-app-bar
    app
    dark
    :height="appBarHeight"
    color="grey darken-3"
  >
    <nuxt-link
      to="/"
      class="text-decoration-none"
    >
      <app-logo />
    </nuxt-link>

    <app-title
      class="hidden-mobile-and-down"
    />

    <v-spacer />

    <signup-link />
    <login-link />
  </v-app-bar>
</template>

<script lang = 'ts'>
import { Component, Vue } from 'nuxt-property-decorator';
import { GlobalStore } from '~/store';
import appLogo from '../ui/appLogo.vue'
import signupLink from '../beforeLogin/signupLink.vue';
import loginLink from '../beforeLogin/loginLink.vue';
import appTitle from '../ui/appTitle.vue';


@Component({
  components: {
    appLogo,
    signupLink,
    loginLink,
    appTitle
  }
})
export default class befLoginAppBar extends Vue {
  appBarHeight: number = GlobalStore.getAppBarHeight;
}
</script>