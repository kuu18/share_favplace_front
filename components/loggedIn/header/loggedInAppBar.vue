<template>
  <v-app-bar
    app
    dark
    dense
    elevation="1"
    clipped-left
    color="grey darken-3"
  >
    <slot name="nav-icon" />
    <nuxt-link
      to="/"
      class="text-decoration-none"
    >
      <app-logo />
    </nuxt-link>

    <app-title />

    <v-spacer />

    <v-menu
      app
      offset-x
      offset-y
      max-width="200"
    >
      <template #activator="{ on }">
        <v-btn
          icon
          v-on="on"
        >
          <v-icon>
            mdi-account-circle
          </v-icon>
        </v-btn>
      </template>
      <v-list dense>
        <v-subheader>
          ログイン中のユーザー
        </v-subheader>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>
              {{ $auth.currentUser.username }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-subheader>
          アカウント
        </v-subheader>

        <template v-for="(menu, i) in accountMenus">
          <v-divider
            v-if="menu.divider"
            :key="`menu-divider-${i}`"
          />

          <v-list-item
            :key="`menu-list-${i}`"
            :to="{ name: menu.name }"
          >
            <v-list-item-icon class="mr-2">
              <v-icon size="22" v-text="menu.icon" />
            </v-list-item-icon>
            <v-list-item-title>
              {{ $my.pageTitle(menu.name) }}
            </v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang = 'ts'>
import { Component, Vue } from 'nuxt-property-decorator'
import AppTitle from '@/components/ui/appTitle.vue'
import AppLogo from '@/components/ui/appLogo.vue'

interface AccountMenu {
  name: string
  icon: string
  divider?: boolean
}

@Component({
  components: {
    AppTitle,
    AppLogo
  }
})
export default class LoggedInAppBar extends Vue {
  accountMenus: Array<AccountMenu> = [
    { name: 'account-settings', icon: 'mdi-account-cog' },
    { name: 'account-email', icon: 'mdi-email-edit-outline' },
    { name: 'account-password', icon: 'mdi-lock-outline' },
    { name: 'logout', icon: 'mdi-logout-variant', divider: true }
  ]
}
</script>
