<template>
  <v-text-field
    v-model="syncedReferenceUrl"
    label="参照URL"
    placeholder="ホームページのURL等を入力してください"
    hint="任意入力"
    persistent-hint
    outlined
  />
</template>
<script lang="ts">
import { Component, PropSync, Vue } from 'nuxt-property-decorator'

@Component
export default class FavplaceFormReferenceUrl extends Vue {
  @PropSync('referenceUrl', { type: String, default: '' })
    syncedReferenceUrl!: string
}
</script>
