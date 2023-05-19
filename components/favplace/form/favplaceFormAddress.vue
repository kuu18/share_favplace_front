<template>
  <v-text-field
    v-model="syncedAddress"
    :rules="rules"
    label="住所"
    :counter="max"
    outlined
  />
</template>
<script lang="ts">
import { Component, PropSync, Vue } from 'nuxt-property-decorator'

@Component
export default class FavplaceFormAddress extends Vue {
  max = 50
  // バリデーション
  rules = [
    (v: string) => !!v || '住所は必須入力です。',
    (v: string) => (!!v && this.max >= v.length) || `${this.max}文字以内で入力してください`
  ]

  @PropSync('address', { type: String, default: '' })
    syncedAddress!: string
}
</script>
