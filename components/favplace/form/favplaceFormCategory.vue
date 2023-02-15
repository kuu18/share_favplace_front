<template>
  <v-select
    v-model="syncedCategory"
    :items="items"
    :rules="rules"
    item-text="categoryname"
    item-value="id"
    label="カテゴリー"
    outlined
  />
</template>
<script lang="ts">
import { Component, PropSync, Vue } from 'nuxt-property-decorator'
import { AxiosResponse } from 'axios'
import { Category } from '~/types/Category'

@Component
export default class FavplaceFormCategory extends Vue {
  items: Array<Category> = []
  categories = {}

  // バリデーション
  rules = [(v: number) => !!v || 'カテゴリーは必須入力です。']

  @PropSync('category', { type: Number })
    syncedCategory!: number

  /**
   * カテゴリー一覧取得処理
   */
  async created () {
    await this.$axios
      .get('/api/v1/categories')
      .then(response => this.success(response))
  }

  /**
   * カテゴリー一覧取得成功時
   */
  success (response: AxiosResponse<Array<Category>>) {
    this.items = response.data
  }
}
</script>
