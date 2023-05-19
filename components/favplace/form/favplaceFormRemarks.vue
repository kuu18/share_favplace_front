<template>
  <v-textarea
    v-model="syncedRemarks"
    label="備考"
    hint="任意入力"
    persistent-hint
    counter="50"
    outlined
  />
</template>
<script lang="ts">
import { Component, PropSync, Vue } from 'nuxt-property-decorator'

@Component
export default class FavplaceFormRemarks extends Vue {
  max = 100
  // バリデーション
  rules = [
    (v: string) => !!v || '場所名は必須入力です。',
    (v: string) => (!!v && this.max >= v.length) || `${this.max}文字以内で入力してください`
  ]

  @PropSync('remarks', { type: String, default: '' })
    syncedRemarks!: string
}
</script>
