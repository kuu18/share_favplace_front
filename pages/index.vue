<template>
  <div>
    index.vue
  </div>
</template>

<script lang = "ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  middleware: 'authenticator',
  layout ({ $auth }) {
    return $auth.loggedIn ? 'default' : 'welcome';
  }
})
export default class Index extends Vue{
}
</script>