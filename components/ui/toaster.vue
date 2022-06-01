<template>
  <v-snackbar
    v-model="snackbar"
    top
    text
    :timeout="toast.timeout"
    :color="toast.color"
  >
    {{ toast.msg }}
    <template #action="{ attrs }">
      <v-btn
        text
        v-bind="attrs"
        @click="resetToast"
      >
        <v-icon :color="toast.color">mdi-close-circle-outline</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'nuxt-property-decorator'
import { GlobalStore } from '~/store'

@Component
export default class Toaster extends Vue {
  get toast() {
    return GlobalStore.getToast
  }

  @Emit()
  public input(value: boolean) { return value }

  get snackbar() {
    return !!this.toast.msg
  }

  set snackbar(value) {
    this.resetToast()
    this.input(value);
  }

  resetToast () {
    return GlobalStore.commitToast({ msg: null });
  }

  beforeDestroy () {
    this.resetToast()
  }
}
</script>
