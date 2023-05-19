<template>
  <v-autocomplete
    v-model="syncedPrefecture"
    :rules="rules"
    :items="items"
    label="都道府県"
    placeholder="選択してください"
    outlined
  />
</template>
<script lang="ts">
import { Component, PropSync, Vue } from 'nuxt-property-decorator'
import { AxiosResponse } from 'axios'

interface Prefecture {
  prefCode: number
  prefName: string
}

interface PrefectreResponse {
  message: string
  result: Array<Prefecture>
}

@Component
export default class FavplaceFormName extends Vue {
  items: Array<string> = []
  // バリデーション
  rules = [
    (v: string) => !!v || '都道府県は必須選択です。'
  ]

  @PropSync('prefecture', { type: String, default: '' })
    syncedPrefecture!: string

  /**
   * 都道府県一覧取得処理
   * request: RESAS_API
   */
  async created () {
    await this.$axios.get(
      'https://opendata.resas-portal.go.jp/api/v1/prefectures',
      { headers: { 'X-API-KEY': this.$config.resasApiKey } }
    )
      .then(response => this.success(response))
  }

  /**
   * 都道府県一覧取得成功時
   */
  success (response: AxiosResponse<PrefectreResponse>) {
    const prefectures = response.data.result
    for (let i = 0; i < prefectures.length; i++) {
      this.items.push(prefectures[i].prefName)
    }
  }
}
</script>
