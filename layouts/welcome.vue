<template>
  <v-app>
    <wel-app-bar />
    <v-sheet>
      <v-container
        fluid
        :style="{ maxWidth: '1280px' }"
      >
        <v-row
          v-for="(menu, i) in menus"
          :key="`menu-${i}`"
        >
          <v-col cols="12">
            <div :is="`wel-${menu.title}`" />
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <bef-login-footer />
  </v-app>
</template>

<script lang = "ts">
import BefLoginFooter from '~/components/beforeLogin/befLoginFooter.vue'
import WelAbout from '~/components/welcome/welAbout.vue'
import WelAppBar from '~/components/welcome/welAppBar.vue'
import WelContact from '~/components/welcome/welContact.vue'

export default {
  components: {
    WelAppBar,
    BefLoginFooter,
    WelContact,
    WelAbout
  },
  data () {
    return {
      menus: [
        { title: 'about', subtitle: 'このサイトは行ってみたい場所やお気に入りの場所を管理、シェアできるアプリケーションです' },
        { title: 'contact', subtitle: 'お気軽にご連絡を' }
      ]
    }
  }
}
</script>