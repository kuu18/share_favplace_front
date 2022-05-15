<template>
  <div />
</template>
<script lang = 'ts'>
import { Component, Vue } from 'vue-property-decorator';
import { GlobalStore } from '~/store';

@Component({
  async middleware ({ redirect }) {
    await GlobalStore.logout()
    return redirect('/login')
  }
})
export default class Logout extends Vue {
}
</script>