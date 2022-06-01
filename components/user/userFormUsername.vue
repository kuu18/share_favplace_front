<template>
  <v-text-field
    v-model="syncedUsername"
    label="ユーザー名を入力"
    placeholder="あなたの表示名"
    outlined
    :rules="rules"
    :counter="max"
  />
</template>

<script lang = 'ts'>
import { Component, Vue, PropSync } from 'nuxt-property-decorator'
import { Validation } from '@/types/validation'

@Component
export default class UserFormUserName extends Vue {
  max:number = 50
  // バリデーション
  rules: Array<Validation> = [
    v => !!v || '',
    v => (!!v && this.max >= v.length) || `${this.max}文字以内で入力してください`
  ]

  @PropSync('username', { type: String, default: '' })
    syncedUsername!: string
}
</script>
