import BefLoginFooter from '~/components/beforeLogin/befLoginFooter.vue';
<template>
  <div :style="{ marginTop: `${height}px`}">
    <v-footer
      absolute
      dark
      color="grey darken-3"
      :height="height"
    >
      <v-col
        cols="12"
        class="py-0"
      >
        <div class="text-center text-body-2">
          &copy;{{ copyRightYear }}
          <strong>{{ appName }}</strong>
        </div>
      </v-col>
    </v-footer>
  </div>
</template>

<script lang = 'ts'>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class BefLoginFooter extends Vue {
  appName: string = this.$config.appName
  height = 32

  get copyRightYear () {
    const beginningYear = 2022
    const thisYear: number = new Date().getFullYear()
    return (beginningYear < thisYear)
      ? `${beginningYear} - ${thisYear}`
      : beginningYear
  }
}
</script>
