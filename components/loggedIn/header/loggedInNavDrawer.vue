<template>
  <v-navigation-drawer
    v-model="syncedDrawer"
    app
    clipped
    mobile-breakpoint="960"
    light
    color="mygrey"
  >
    <v-list color="mygrey">
      <v-list-item v-for="link in links" :key="link.icon" link :to="link.to">
        <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template #append>
      <div class="pa-2 mb-10 ml-5">
        <v-btn large fab dark depressed color="#50554E" @click.stop="dialog = true">
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
        <register-favplace-dialog :dialog.sync="dialog" />
        <span class="pt-1 ml-5 text-h6 font-weight-bold" style="color: #50554E;">
          登録する
        </span>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'nuxt-property-decorator'
import RegisterFavplaceDialog from '@/components/favplace/dialog/registerFavplaceDialog.vue'

@Component({
  components: {
    RegisterFavplaceDialog
  }
})
export default class LoggedInNavDrawer extends Vue {
  dialog = false
  mini = true
  links = [
    {icon: 'mdi-home', text: 'Home', to: '/'},
    {icon: 'mdi-account', text: 'MyAccount', to: `/user/${this.$auth.currentUser.id}`},
    {icon: 'mdi-inbox-arrow-down', text: 'Inbox', to: '#'},
    {icon: 'mdi-send', text: 'Send', to: '#'},
    {icon: 'mdi-delete', text: 'Trash', to: '#'},
    {icon: 'mdi-alert-octagon', text: 'Spam', to: '#'}
  ]

  @PropSync('drawer', { type: Boolean, default: null })
    syncedDrawer!: boolean
}
</script>
