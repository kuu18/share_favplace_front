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
    <v-toolbar-title>
      {{ appName }}
    </v-toolbar-title>
    <v-spacer />

    <v-toolbar-items class="ml-2">
      <v-btn
        v-for="(menu, i) in menus"
        :key="`menu-btn-${i}`"
        text
        @click="goTo(menu.title)"
      >
        {{ $t(`menus.${menu.title}`) }}
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script lang = 'ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators'
import DefaultModule from '@/store/index';
import appLogo from '../ui/appLogo.vue'

export interface Menus {
  title: string;
  subtitle: string;
}

@Component({
  components: { appLogo }
})
export default class WelAppBar extends Vue{
  appName: string = this.$config.appName;
  scrollY: number = 0;
  appBarHeight: number = getModule(DefaultModule, this.$store).getAppBarHeight

  @Prop({ default: [] })
  menus!: Array<Menus>;

  @Prop({ default: 0 })
  imgHeight!: number; 

  mounted() {
    window.addEventListener('scroll', this.onScroll)
  }

  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  }

  onScroll () {
    this.scrollY = window.scrollY
  }

  goTo (id: any) {
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