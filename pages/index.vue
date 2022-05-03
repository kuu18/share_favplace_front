<template>
  <div>
    index.vue
  </div>
</template>

<script lang = "ts">
import { Component, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators'
import DefaultModule from '@/store/index';

@Component({
  layout ({ store }) {
    return getModule(DefaultModule, store).getLoggedIn ? 'default' : 'welcome'
  }
})
export default class Index extends Vue{
}
</script>