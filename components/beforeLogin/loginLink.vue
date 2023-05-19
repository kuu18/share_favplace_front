<template>
  <v-btn
    depressed
    color="white"
    class="ml-2 font-weight-bold myred--text"
    to="/login"
    :height="height"
    :width="width"
  >
    {{ $t('pages.login') }}
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class LoginLink extends Vue {
  @Prop({ type: Number, default: 38 })
    height!: number

  @Prop({ type: Number, default: 100 })
    width!: number
}
</script>
