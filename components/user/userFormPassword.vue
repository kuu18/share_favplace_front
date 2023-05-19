<template>
  <v-text-field
    v-model="syncedPassword"
    :label="label"
    outlined
    :rules="form.rules"
    :counter="!noValidation"
    :hint="form.hint"
    :placeholder="form.placeholder"
    :append-icon="toggle.icon"
    :type="toggle.type"
    autocomplete="on"
    @click:append="show = !show"
  />
</template>

<script lang = 'ts'>
import { Component, Vue, Prop, PropSync } from 'nuxt-property-decorator'
import { Validation } from '@/types/validation'

@Component
export default class UserFormPassword extends Vue {
  show = false
  @Prop({ type: Boolean, default: false })
    noValidation!: boolean

  @Prop({ type: String, default: 'パスワードを入力' })
    label!: string

  @PropSync('password', { type: String, default: '' })
    syncedPassword!: string

  // バリデーション
  get form () {
    const min = '8文字以上'
    const msg = `${min}。半角英数字•ﾊｲﾌﾝ•ｱﾝﾀﾞｰﾊﾞｰが使えます`
    const required: Validation = v => !!v || ''
    const format: Validation = v => /^[\w-]{8,72}$/.test(v) || msg
    const rules: Array<Validation> = this.noValidation ? [required] : [format]
    const hint: string | undefined = this.noValidation ? undefined : msg
    const placeholder: string | undefined = this.noValidation ? undefined : min
    return { rules, hint, placeholder }
  }

  // パスワード表示
  get toggle () {
    const icon: string = this.show ? 'mdi-eye' : 'mdi-eye-off'
    const type: string = this.show ? 'text' : 'password'
    return { icon, type }
  }
}
</script>
