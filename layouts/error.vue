<template>
  <v-container fill-height>
    <v-row>
      <v-col cols="12">
        <v-card-title class="justify-center">
          {{ status }}
        </v-card-title>
        <v-card-text class="text-center">
          {{ message }}
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-icon>
            mdi-emoticon-sick-outline
          </v-icon>
        </v-card-actions>
        <v-card-actions class="justify-center">
          <v-btn
            icon
            x-large
            color="myred"
            @click="redirect"
          >
            <v-icon>
              mdi-home
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { NuxtError } from "@nuxt/types";
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component({ layout: 'none' })
export default class Error extends Vue{

  @Prop({ type: Object, default: null })
  error!: NuxtError;

  get status() {
    return this.error.statusCode
  }

  get  message() {
    const msg = this.error.message
    const path = `error.${msg}`
    return this.$te(path) ? this.$t(path) : msg
  }

  redirect () {
    return this.$route.name === 'index'
        ? this.$router.go(0) : this.$router.push('/')
  }

  async created () {
    if (this.status === 401) {
      await this.$auth.logout()
    }
  }
}
</script>