<template>
  <div />
</template>
<script lang = 'ts'>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  layout: 'none',
  async beforeCreate () {
    await this.$auth.logout()
    this.$router.replace('/')
  }
})
export default class Logout extends Vue {
}
</script>
