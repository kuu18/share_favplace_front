<template>
  <v-navigation-drawer
    v-model="syncedDrawer"
    app
    clipped
    mobile-breakpoint="960"
  >
    <v-sheet
      color="grey lighten-4"
      class="pa-4"
    >
      <v-avatar
        class="mb-4"
        color="grey darken-1"
        size="64"
      >
        <img
          alt="Avatar"
          :src="$auth.currentUser.avatarUrl"
        >
      </v-avatar>

      <div>{{ $auth.currentUser.username }}</div>
    </v-sheet>

    <v-divider />

    <v-list>
      <v-list-item
        v-for="[icon, text] in links"
        :key="icon"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template #append>
      <div class="pa-2 mb-10">
        <v-btn
          dark
          block
          color="myred"
          @click.stop="dialog = true"
        >
          登録する
        </v-btn>
        <favplace-dialog :dialog.sync="dialog" />
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script lang='ts'>
import { Vue, Component, PropSync } from 'nuxt-property-decorator'

@Component
export default class LoggedInNavDrawer extends Vue {
  dialog = false
  links = [
    ['mdi-inbox-arrow-down', 'Inbox'],
    ['mdi-send', 'Send'],
    ['mdi-delete', 'Trash'],
    ['mdi-alert-octagon', 'Spam']
  ]

  @PropSync('drawer', { type: Boolean, default: null })
    syncedDrawer!: boolean
}
</script>
