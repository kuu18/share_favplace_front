<template>
  <v-container>
    <nuxt-child />
  </v-container>
</template>

<script lang = 'ts'>
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'
@Component({
  layout ({ route }: Context) {
    if (route.name === 'account-activations') { return 'beforeLogin' } else { return 'loggedIn' }
  },
  middleware ({ route, redirect }) {
    if (route.name === 'account') { return redirect('/') }
  }
})
export default class Account extends Vue {
}
</script>
