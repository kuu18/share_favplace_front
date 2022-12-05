<template>
  <v-file-input
    name="image"
    :rules="rules"
    accept="image/png, image/jpeg, image/jpg"
    prepend-icon="mdi-camera"
    label="参考画像"
    hint="任意入力"
    persistent-hint
    outlined
    @change="resize"
    @click:clear="clear"
  />
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class FavplaceFormImage extends Vue {
  // バリデーション
  rules = [
    (v: File) => !v || v.size < 2000000 || '画像サイズは2MB以内にしてください。'
  ]

  /**
   * 画像選択時プレビュー
   */
  resize (e: Blob) {
    const file = e
    if (!file) {
      this.clear()
      return
    }
    const reader = new FileReader()
    reader.onload = (event) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const image = new Image()
      image.crossOrigin = 'Anonymous'
      image.onload = () => {
        if (image.height > image.width) {
          const width = 500
          const height = 700
          canvas.width = width
          canvas.height = height
          ctx?.drawImage(image, 0, 0, width, height)
          const base64 = canvas.toDataURL()
          this.$emit('resized', { url: base64, blob: e, canvas })
        } else {
          const width = 700
          const height = 500
          canvas.width = width
          canvas.height = height
          ctx?.drawImage(image, 0, 0, width, height)
          const base64 = canvas.toDataURL()
          this.$emit('resized', { url: base64, blob: e, canvas })
        }
      }
      if (event.target?.result) {
        image.src = String(event.target.result)
      }
    }
    reader.readAsDataURL(file)
  }

  /**
   * 画像選択クリア処理
   */
  clear () {
    this.$emit('resized', { url: null, blob: null })
  }
}
</script>
