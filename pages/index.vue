<template>
  <div>
    index.vue
  </div>
</template>

<script lang = "ts">
import { Component, Vue } from 'vue-property-decorator';
import { GlobalStore } from '~/store';

@Component({
  layout () {
    return GlobalStore.getLoggedIn ? 'default' : 'welcome'
  }
})
export default class Index extends Vue{
}
</script>