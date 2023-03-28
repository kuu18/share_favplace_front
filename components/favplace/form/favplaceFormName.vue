<template>
  <v-text-field
    v-model="syncedName"
    :counter="max"
    :rules="rules"
    label="場所名"
    outlined
  />
</template>
<script lang="ts">
import { Component, PropSync, Vue } from 'nuxt-property-decorator'

@Component
export default class FavplaceFormName extends Vue {
  max = 50
  // バリデーション
  rules = [
    (v: string) => !!v || '場所名は必須入力です。',
    (v: string) => (!!v && this.max >= v.length) || `${this.max}文字以内で入力してください`
  ]

  @PropSync('name', { type: String, default: '' })
    syncedName!: string
}
</script>
