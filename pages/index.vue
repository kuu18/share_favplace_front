<template>
  <div>
    index.vue
  </div>
</template>

<script lang = "ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { GlobalStore } from '~/store'

@Component({
  middleware: 'authenticator',
  layout ({ $auth }) {
    return $auth.loggedIn ? 'default' : 'welcome'
  }
})
export default class Index extends Vue {
  async created () {
    const message = await this.$route.query.message
    if (message) { GlobalStore.commitToast({ msg: String(message), color: 'success' }) }
  }
}
</script>
