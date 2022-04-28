<template>
  <div>
    index.vue
  </div>
</template>

<script lang = "ts">
import { getModule } from 'vuex-module-decorators'
import DefaultModule from '../store/index';

export default {
  layout ({ store }) {
    const defaultModule = getModule(DefaultModule, store)
    return defaultModule.getLoggedIn ? 'default' : 'welcome'
  }
}
</script>