<template>
  <v-btn
    depressed
    dark
    color="myred"
    class="ml-2 font-weight-bold white--text"
    to="/signup"
    :height="height"
    :width="width"
  >
    {{ $t('pages.signup') }}
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class SignupLink extends Vue {
  @Prop({ type: Number, default: 38})
    height!: number

  @Prop({ type: Number, default: 100 })
    width!: number
}
</script>
