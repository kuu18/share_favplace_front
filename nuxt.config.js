
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'share_favplace',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  publicRuntimeConfig: {
    appName: process.env.APP_NAME,
    cryptoKey: process.env.CRYPTO_KEY,
    testuserPassword: process.env.TESTUSER_PASSWORD,
    resasApiKey: process.env.RESAS_API_KEY,
    heroImage: process.env.HERO_IMAGE
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/sass/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    'plugins/auth',
    'plugins/axios',
    'plugins/myPlugin',
    'plugins/nuxtClientInit',
    'plugins/axios-accessor'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://www.npmjs.com/package/@nuxtjs/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://www.npmjs.com/package/nuxt-i18n
    'nuxt-i18n'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    credentials: true
  },

  vuetify: {
    // https://vuetifyjs.com/ja/customization/a-la-carte/
    treeShake: true,
    customVariables: ['~/assets/sass/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: '4080BE',
          info: '4FC1E9',
          success: '44D69E',
          warning: 'FEB65E',
          error: 'FB8678',
          background: 'F8F8FF',
          myblue: '1867C0',
          myred: 'c86a71',
          mygrey: 'C7D5D6',
          myblack: '50554E'
        }
      }
    }
  },

  i18n: {
    locales: ['ja', 'en'],
    defaultLocale: 'ja',
    // https://kazupon.github.io/vue-i18n/api/#properties
    vueI18n: {
      fallbackLocale: 'ja',
      // silentTranslationWarn: true,
      silentFallbackWarn: true,
      messages: {
        ja: require('./locales/ja.json'),
        en: require('./locales/en.json')
      }
    },
    strategy: 'no_prefix',
    vuex: false
  },

  typescript: {
    // Doc: https://typescript.nuxtjs.org/guide/lint/
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}'
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loadingScreen: false
  }
}
