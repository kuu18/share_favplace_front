<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card
          class="mx-auto"
          flat
        >
          <v-app-bar
            dark
            dense
            flat
            :color="$route.name != 'account-delete' ? 'grey darken-3' : 'myred'"
          >
            <v-spacer />
            <v-toolbar-title>{{ $my.pageTitle(getRouteName) }}</v-toolbar-title>
            <v-spacer />
          </v-app-bar>
          <toaster />
          <v-tabs 
            vertical
            class="hidden-mobile-and-down"
            :color="$route.name === 'account-delete' ? 'myred' : ''"
          >
            <v-tab
              v-for="(item, i) in items"
              :key="`item-tab-${i}`"
              nuxt
              :to="{name: item.title}"
            >
              <v-icon left>
                {{ item.icon }}
              </v-icon>
              {{ $my.pageTitle(item.title) }}
            </v-tab>
            <v-tabs-items
              vertical
            >
              <v-card flat>
                <slot name="account-settings-card-content" />
              </v-card>
            </v-tabs-items>
          </v-tabs>
          <v-tabs
            show-arrows
            class="hidden-mobile-and-up"
          >
            <v-tabs-slider />

            <v-tab
              v-for="(item, i) in items"
              :key="`item-tab-${i}`"
              nuxt
              :to="{name: item.title}"
            >
              <v-icon left>
                {{ item.icon }}
              </v-icon>
              {{ $my.pageTitle(item.title) }}
            </v-tab>
            <v-tabs-items>
              <v-card flat>
                <slot name="account-settings-card-content" />
              </v-card>
            </v-tabs-items>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang = 'ts'>
import { Component, Vue } from 'nuxt-property-decorator'
import Toaster from '@/components/ui/toaster.vue'

@Component({
  layout: 'loggedIn',
  components: {
    Toaster
  }
})
export default class AccountSettingsCard extends Vue {
  items = [
    { title: 'account-settings', icon: 'mdi-account-cog' },
    { title: 'account-email', icon: 'mdi-email' },
    { title: 'account-password', icon: 'mdi-lock' },
    { title: 'account-delete', icon: 'mdi-account-off' }
  ]

  get getRouteName() {
    return this.$route.name ? this.$route.name :''
  }
}
</script>
