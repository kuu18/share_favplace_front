<template>
  <v-dialog
    v-model="syncedDialog"
    persistent
    max-width="400"
  >
    <v-card height="500" color="grey lighten-3">
      <v-app-bar dark flat color="grey darken-3">
        <v-spacer />
        <v-btn dark icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-app-bar>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-card-title v-if="!error" class="mb-5 mt-5 d-flex justify-center myblue--text">
              {{ title || 'loading.....' }}
            </v-card-title>
            <v-card-title v-if="error" class="mb-5 mt-5 d-flex justify-center myred--text">
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
