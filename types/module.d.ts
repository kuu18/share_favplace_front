import { MyPluginInterface } from '@/plugins/myPlugin'
import { AuthenticationInterface } from '@/plugins/auth';

declare module 'vue/types/vue' {
  interface Vue {
    $my: MyPluginInterface
    $auth: AuthenticationInterface
  }
}

declare module '@nuxt/types' {
  interface Context {
    $my: MyPluginInterface
    $auth: AuthenticationInterface
  }
}