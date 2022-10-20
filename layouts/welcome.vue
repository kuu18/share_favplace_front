<template>
  <v-app>
    <wel-app-bar
      :menus="menus"
      :img-height="imgHeight"
    />
    <toaster />
    <v-img
      id="scroll-top"
      dark
      src="https://share-favplace-local.s3.ap-northeast-1.amazonaws.com/default/heroimg.jpg"
      :height="imgHeight"
      
    >
      <v-row
        align="center"
        justify="center"
        :style="{ height: `${imgHeight}px` }"
      >
        <v-col
          class="white--text text-center"
          cols="12"
          tag="h1"
        >
          <span
            :class="h3TextResponsive"
            class="font-weight-light"
          >
            WELCOME TO
          </span>

          <br>

          <span
            :class="[$vuetify.breakpoint.smAndDown ? 'text-h4': 'text-h1']"
            class="font-weight-black"
          >
            SHAREFAVPLACE
          </span>
          <br>
          <v-btn
            class="align-self-end"
            fab
            outlined
            @click="$vuetify.goTo('#about')"
          >
            <v-icon>mdi-chevron-double-down</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-img>
    <v-sheet
      v-for="(menu, i) in menus"
      :key="`menu-${i}`"
      :color="menu.color"
      menu.theme
    >
      <div class="py-12"></div>
      <v-container
        fluid
      >
          <v-col
            :id="menu.title"
            cols="12"
            :class="[menu.title === 'contact' ? 'white--text' : 'black--text']"
          >
            <v-card-title class="justify-center" :class="h3TextResponsive">
              {{ $t(`menus.${menu.title}`) }}
            </v-card-title>
            <v-card-text class="text-center">
              {{ menu.subtitle }}
            </v-card-text>
          </v-col>
          <v-col cols="12">
            <div :is="`wel-${menu.title}`" />
          </v-col>
      </v-container>
      <div class="py-12"></div>
    </v-sheet>
    <bef-login-footer />
  </v-app>
</template>

<script lang = "ts">
import { Component, Vue } from 'nuxt-property-decorator'
import BefLoginFooter from '@/components/beforeLogin/befLoginFooter.vue'
import WelAbout from '@/components/welcome/welAbout.vue'
import WelAppBar, { Menus } from '@/components/welcome/welAppBar.vue'
import WelContact from '@/components/welcome/welContact.vue'
import Toaster from '@/components/ui/toaster.vue'
import { GlobalStore } from '~/store'

@Component({
  components: {
    WelAppBar,
    BefLoginFooter,
    WelContact,
    WelAbout,
    Toaster
  }
})
export default class Welcome extends Vue {
  imgHeight: number = window.innerHeight
  h3TextResponsive = this.$vuetify.breakpoint.smAndDown ? 'text-h5' : 'text-h3'
  menus: Array<Menus> = [
    { title: 'about', subtitle: 'このサイトは行ってみたい場所やお気に入りの場所を管理、シェアできるアプリケーションです', color: 'grey lighten-3' },
    { title: 'contact', subtitle: 'お気軽にご連絡を', color: 'grey darken-3' }
  ]

  async created () {
    const message = await this.$route.query.message
    if (message) { 
      const color = await this.$route.query.color
      const timeout = await this.$route.query.timeout
      GlobalStore.commitToast({ msg: String(message), color: String(color), timeout: Number(timeout) })
    }
  }
}
</script>
