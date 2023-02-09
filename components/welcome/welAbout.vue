<template>
  <v-container class="text-center">
    <v-responsive
      class="mx-auto mb-12"
      width="56"
    >
      <v-divider class="mb-1" />

      <v-divider />
    </v-responsive>

    <v-row>
      <v-col
        v-for="({ icon, title, text }, i) in features"
        :key="i"
        cols="12"
        md="4"
      >
        <v-card
          class="py-12 px-4"
          color="grey lighten-5"
          flat
        >
          <v-theme-provider dark>
            <div>
              <v-avatar
                color="primary"
                size="88"
              >
                <v-icon
                  large
                  v-text="icon"
                />
              </v-avatar>
            </div>
          </v-theme-provider>

          <v-card-title
            class="justify-center font-weight-black text-uppercase"
            v-text="title"
          />

          <v-card-text
            class="subtitle-1"
            v-text="text"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
          class="mt-10"
          color="transparent"
          flat
        >
          <v-card-title
            class="justify-center font-weight-black"
          >
            今すぐ始める
          </v-card-title>
          <v-card-actions
            class="justify-center"
          >
            <signup-link 
              class="mr-5"
              :height="50"
              :width="150"
            />
            <login-link
              :height="50"
              :width="150"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang = 'ts'>
import { Component, Vue } from 'nuxt-property-decorator'
import signupLink from '../beforeLogin/signupLink.vue'
import loginLink from '../beforeLogin/loginLink.vue'

interface Features {
  icon: string
  title: string
  text: string
}

@Component({
  components: {
    signupLink,
    loginLink,
  }
})
export default class WelAbout extends Vue {
  features: Array<Features> = [
    {
      icon: 'mdi-account-group-outline',
      title: 'Vibrant Community',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam'
    },
    {
      icon: 'mdi-update',
      title: 'Frequent Updates',
      text: 'Sed ut elementum justo. Suspendisse non justo enim. Vestibulum cursus mauris dui, a luctus ex blandit. Lorem ipsum dolor sit amet consectetur adipisicing elit. qui ipsum eveniet facilis obcaecati corrupti consectetur adipisicing elit.'
    },
    {
      icon: 'mdi-shield-outline',
      title: 'Long-term Support',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam'
    }
  ]
}
</script>
