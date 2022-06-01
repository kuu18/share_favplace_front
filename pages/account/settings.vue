<template>
  <div>
    {{ $route.fullPath }}
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class AccountSettings extends Vue {
}
</script>
