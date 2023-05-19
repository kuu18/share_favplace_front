<template>
  <v-sheet dark color="grey darken-3">
    <v-container>
      <v-responsive
        class="mx-auto mb-12"
        width="56"
      >
        <v-divider class="mb-1" />

        <v-divider />
      </v-responsive>

      <v-theme-provider light>
        <v-form
          ref="form"
        >
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="params.name"
                flat
                label="Name*"
                solo
                placeholder="your name"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="params.email"
                flat
                label="Email*"
                solo
                placeholder="your@email.com"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="params.subject"
                flat
                label="Subject*"
                solo
              />
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="params.message"
                flat
                label="Message*"
                solo
              />
            </v-col>

            <v-col
              class="mx-auto"
              cols="auto"
            >
              <v-btn
                color="myred"
                class="white--text"
                x-large
                @click="sendContact"
              >
                Submit
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-theme-provider>
    </v-container>
  </v-sheet>
</template>

<script lang = 'ts'>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
  params = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }

  sendContact () {
    // TODO
  }
}
</script>
