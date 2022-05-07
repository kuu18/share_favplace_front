<template>
  <v-app>
    <bef-login-app-bar />
    <v-main>
      <nuxt />
    </v-main>
    <bef-login-footer />
  </v-app>
</template>

<script lang = 'ts'>
import { Component, Vue } from 'vue-property-decorator';
import befLoginAppBar from '../components/beforeLogin/befLoginAppBar.vue';
import BefLoginFooter from '../components/beforeLogin/befLoginFooter.vue';

@Component({
  components: { 
    befLoginAppBar,
    BefLoginFooter
  }
})
export default class befLogin extends Vue {
}
</script>