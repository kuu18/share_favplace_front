<template>
  <logged-in-container>
    <template #my-content>
      {{ $route.fullPath }}
    </template>
  </logged-in-container>
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
    const color = await this.$route.query.color
    const timeout = await this.$route.query.timeout
    if (message) { GlobalStore.commitToast({ msg: String(message), color: String(color), timeout: Number(timeout) }) }
  }
}
</script>
