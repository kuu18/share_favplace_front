<template>
  <v-text-field
    v-model="syncedMunicipality"
    :rules="rules"
    label="市区町村"
    outlined
  />
</template>
<script lang="ts">
import { Component, PropSync, Vue } from 'nuxt-property-decorator'

@Component
export default class FavplaceFormMunicipality extends Vue {
  // バリデーション
  rules = [
    (v: string) => !!v || '市区町村は必須入力です。'
  ]

  @PropSync('municipality', { type: String, default: '' })
    syncedMunicipality!: string
}
</script>
