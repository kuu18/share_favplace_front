<template>
  <v-app>
    <wel-app-bar
      :menus="menus"
      :img-height="imgHeight"
    />
    <v-img
      id="scroll-top"
      dark
      src="/images/heroimg.jpg"
      gradient="to top right, rgba(245,245,245,.3), rgba(69, 90, 100,.9)"
      :height="imgHeight"
    >
      <v-row
        align="center"
        justify="center"
        :style="{ height: `${imgHeight}px` }"
      >
        <v-col
          cols="12"
          class="text-center"
        >
          <h1 class="display-1 mb-4">
            もう迷わない。行きたい場所がすぐ見つかる。
          </h1>
          <h4
            class="subheading"
            :style="{ letterSpacing: '5px' }"
          >
            お気に入りの場所を管理、シェアしよう
          </h4>
        </v-col>
      </v-row>
    </v-img>
    <v-sheet>
      <v-container
        fluid
        :style="{ maxWidth: '1280px', height: '1500px' }"
      >
        <v-row
          v-for="(menu, i) in menus"
          :key="`menu-${i}`"
        >
          <v-col
            :id="menu.title"
            cols="12"
          >
            <v-card flat>
              <v-card-title class="justify-center display-1">
                {{ $t(`menus.${menu.title}`) }}
              </v-card-title>
              <v-card-text class="text-center">
                {{ menu.subtitle }}
              </v-card-text>
            </v-card>
          </v-col>
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
import { Component, Vue } from 'nuxt-property-decorator'
import BefLoginFooter from '~/components/beforeLogin/befLoginFooter.vue'
import WelAbout from '~/components/welcome/welAbout.vue'
import WelAppBar, { Menus } from '~/components/welcome/welAppBar.vue'
import WelContact from '~/components/welcome/welContact.vue'

@Component({
  components: {
    WelAppBar,
    BefLoginFooter,
    WelContact,
    WelAbout
  }
})
export default class Welcome extends Vue {
  imgHeight: number = window.innerHeight
  menus: Array<Menus> = [
    { title: 'about', subtitle: 'このサイトは行ってみたい場所やお気に入りの場所を管理、シェアできるアプリケーションです' },
    { title: 'contact', subtitle: 'お気軽にご連絡を' }
  ]
}
</script>
