<template>
  <v-text-field
    v-model="syncedEmail"
    label="メールアドレスを入力"
    :placeholder="form.placeholder"
    outlined
    :rules="rules"
  />
</template>

<script lang = 'ts'>
import { Component, Vue, Prop, PropSync } from 'nuxt-property-decorator'
import { Validation } from '@/types/validation'

@Component
export default class UserFormEmail extends Vue {
  rules: Array<Validation> = [
    v => !!v || '',
    v => /.+@.+\..+/.test(v) || ''
  ]

  @Prop({ type: Boolean, default: false })
    noValidation!: boolean

  @PropSync('email', { type: String, default: '' })
    syncedEmail!: string

  // バリデーション
  get form () {
    const placeholder = this.noValidation ? undefined : 'your@email.com'
    return { placeholder }
  }
}
</script>
