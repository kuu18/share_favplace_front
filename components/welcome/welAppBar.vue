<template>
  <v-app-bar
    app
    dark
    :height="appBarHeight"
    :color="toolbarStyle.color"
    :elevation="toolbarStyle.elevation"
  >
    <app-logo
      @click.native="goTo('scroll-top')"
    />
    <app-title
      class="hidden-mobile-and-down"
    />
    <v-spacer />

    <v-toolbar-items class="ml-2 hidden-ipad-and-down">
      <v-btn
        v-for="(menu, i) in menus"
        :key="`menu-btn-${i}`"
        text
        :class="{ 'hidden-sm-and-down': (menu.title === 'about') }"
        @click="goTo(menu.title)"
      >
        {{ $t(`menus.${menu.title}`) }}
      </v-btn>
    </v-toolbar-items>
    <signup-link />
    <login-link />
    <v-menu
      bottom
      nudge-left="110"
      nudge-width="100"
    >
      <template #activator="{ on }">
        <v-app-bar-nav-icon
          class="hidden-ipad-and-up"
          v-on="on"
        />
      </template>
      <v-list
        dense
        class="hidden-ipad-and-up"
      >
        <v-list-item
          v-for="(menu, i) in menus"
          :key="`menu-list-${i}`"
          exact
          @click="goTo(menu.title)"
        >
          <v-list-item-title>
            {{ $t(`menus.${menu.title}`) }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang = 'ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import appLogo from '../ui/appLogo.vue'
import signupLink from '../beforeLogin/signupLink.vue'
import loginLink from '../beforeLogin/loginLink.vue'
import appTitle from '../ui/appTitle.vue'
import { GlobalStore } from '~/store'

export interface Menus {
  title: string
  subtitle: string
  color?: string
}

@Component({
  components: {
    appLogo,
    signupLink,
    loginLink,
    appTitle
  }
})
export default class welAppBar extends Vue {
  scrollY = 0
  appBarHeight: number = GlobalStore.getAppBarHeight

  @Prop({ default: [] })
    menus!: Array<Menus>

  @Prop({ default: 0 })
    imgHeight!: number

  mounted () {
    window.addEventListener('scroll', this.onScroll)
  }

  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  }

  onScroll () {
    this.scrollY = window.scrollY
  }

  goTo (id: string) {
    this.$vuetify.goTo(`#${id}`)
  }

  get isScrollPoint () {
    return this.scrollY > (this.imgHeight - this.appBarHeight)
  }

  get toolbarStyle () {
    const color = this.isScrollPoint ? 'grey darken-3' : 'transparent'
    const elevation = this.isScrollPoint ? 4 : 0
    return { color, elevation }
  }
}
</script>
