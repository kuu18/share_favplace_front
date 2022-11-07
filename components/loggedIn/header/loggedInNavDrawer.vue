<template>
  <v-navigation-drawer
    v-model="syncedDrawer"
    app
    clipped
    mobile-breakpoint="960"
    dark
    color="grey darken-3"
  >
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar size="64">
          <v-img
            alt="Avatar"
            :src="$auth.currentUser.avatarUrl"
          />
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ $auth.currentUser.username }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ $auth.currentUser.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider />

    <v-list color="grey darken-3">
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
