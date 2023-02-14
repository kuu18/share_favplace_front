<template>
  <v-dialog v-model="syncedDialog" persistent max-width="400">
    <v-card height="500" color="grey lighten-3">
      <v-app-bar dark flat color="grey darken-3">
        <v-spacer />
        <v-btn dark icon @click="closeDialog()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-app-bar>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-card-title
              v-if="!syncedError"
              class="mb-5 mt-5 d-flex justify-center myblue--text"
            >
              {{ syncedTitle || "loading....." }}
            </v-card-title>
            <v-card-title
              v-if="syncedError"
              class="mb-5 mt-5 d-flex justify-center myred--text"
            >
              {{ syncedTitle || "loading....." }}
            </v-card-title>
          </v-col>
          <v-col cols="12">
            <v-card-text class="d-flex justify-center">
              <v-progress-circular
                v-if="loading"
                size="100"
                width="7"
                color="myblue"
                indeterminate
              />
              <v-icon v-if="!loading && syncedError" size="100" color="myred">
                mdi-close-circle-outline
              </v-icon>
              <v-icon v-if="!loading && !syncedError" size="100" color="myblue">
                mdi-check-circle-outline
              </v-icon>
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'nuxt-property-decorator'

@Component
export default class LoadingDialog extends Vue {
  @Prop({ type: Boolean, required: true, default: false })
  readonly loading!: boolean

  @PropSync('title', { type: String, default: '' })
    syncedTitle!: string

  @PropSync('error', { type: Boolean, default: false })
    syncedError!: boolean

  @PropSync('dialog', { type: Boolean, default: false })
    syncedDialog!: boolean

  async closeDialog () {
    if (this.syncedError) {
      this.syncedDialog = false
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.syncedError = false
      this.syncedTitle = ''
    } else {
      this.$router.go(0)
    }
  }
}
</script>
