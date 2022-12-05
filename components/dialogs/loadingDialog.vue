<template>
  <v-dialog
    v-model="syncedDialog"
    persistent
    max-width="400"
  >
    <v-card height="500">
      <v-app-bar flat color="white">
        <v-spacer />
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-app-bar>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-card-title class="mb-5 d-flex justify-center">
              {{ title || 'loading.....' }}
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
              <v-icon
                v-if="!loading && error"
                size="100"
                color="myred"
              >
                mdi-close-circle-outline
              </v-icon>
              <v-icon
                v-if="!loading && !error"
                size="100"
                color="myblue"
              >
                mdi-check-circle-outline
              </v-icon>
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script lang='ts'>
import { Component, Prop, PropSync, Vue } from 'nuxt-property-decorator'

@Component
export default class LoadingDialog extends Vue {
  @Prop({ type: Boolean, default: false })
  readonly loading!: Boolean

  @Prop({ type: Boolean, default: false })
  readonly error!: Boolean

  @Prop({ type: String, required: true })
  readonly title!: string

  @PropSync('dialog', { type: Boolean, default: false })
    syncedDialog!: boolean

  closeDialog () {
    if (this.error) {
      this.syncedDialog = false
    } else {
      this.$router.go(0)
    }
  }
}
</script>
